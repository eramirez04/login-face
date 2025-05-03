import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { RedisService } from 'src/redis/redis.service';
import Redis from 'ioredis';
import { GetProductDTO } from './dto/get-products.dto';

@Injectable()
export class ProductService {
  private redisClient: Redis;

  public constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private redisService: RedisService,
  ) {
    this.redisClient = this.redisService.getClient();
  }

  public async create(product: CreateProductDto): Promise<Product> {
    // creamos el json para enviar al producto
    const productSave: Product = this.productRepository.create(product);
    return await this.productRepository.save(productSave);
  }

  public async findOne(id: string): Promise<Product> {
    const productKey: string = `producto:id_${id}`;

    const productCache: string | null = await this.redisClient.get(productKey);

    if (productCache) {
      return JSON.parse(productCache);
    }

    // Si no está en caché, consulta la base de datos
    const producto = await this.productRepository.findOne({
      where: { id: Number(id) },
    });

    //  Si el producto existe, almacénalo en caché con expiración de 1 hora (3600 segundos)
    if (producto) {
      await this.redisClient.setex(productKey, 400, JSON.stringify(producto));
    }

    if (!producto) {
      throw new NotFoundException('Producto no encotrado');
    }

    return producto;
  }

  public async findAll(query: GetProductDTO) {
    const { page, limit, ...filters } = query;

    return await this.applyFilters(filters, Number(page), limit);
  }

  private async applyFilters(
    filters: Partial<GetProductDTO>,
    page: number,
    limit: number,
  ) {
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    if (filters.search)
      queryBuilder.andWhere('product.nombre ILIKE :search', {
        search: `%${filters.search}%`,
      });
    if (filters.category)
      queryBuilder.andWhere('product.category = :category', {
        category: filters.category,
      });
    if (filters.brand)
      queryBuilder.andWhere('product.brand = :brand', { brand: filters.brand });

    const [data, total] = await queryBuilder
      .take(limit)
      .skip((page - 1) * limit)
      .orderBy('product.created_at', 'DESC')
      .getManyAndCount();
    return { data, total, page, totalPages: Math.ceil(total / limit) };
  }

  public async updateStock(
    productId: string,
    productoDto: UpdateProductDto,
  ): Promise<Product | { mensaje: string }> {
    const productKey: string = `producto:id_${productId}`;

    // desestructuramos el objeto
    const { stock } = productoDto;

    // obtenemos el registro del producto
    const producto = await this.findOne(productId);

    // Verifica y elimina caché si existe
    if (await this.redisClient.get(productKey)) {
      await this.redisClient.del(productKey);
    }

    const productoUpdate = await this.productRepository.preload({
      id: Number(productId),
      stock: producto.stock - stock,
    });

    if (!productoUpdate) {
      return {
        mensaje: 'No se pudo actualizar el producto',
      };
    }

    return await this.productRepository.save(productoUpdate);
  }
}
