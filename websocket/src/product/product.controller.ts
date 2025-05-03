import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
/* import { UpdateProductDto } from './dto/update-product.dto'; */
import { GetProductDTO } from './dto/get-products.dto';
//
import { Product } from './entities/product.entity';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard)
  public async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productService.create(createProductDto);
  }

  @Get()
  public findAll(@Query() query: GetProductDTO, @Req() req: Request) {
    console.log(req.url);
    return this.productService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() nuevoStock: UpdateProductDto) {
    return this.productService.updateStock(id, nuevoStock);
  }
}
