import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { StockModule } from 'src/stock/stock.module';
import { TypeOrmModule } from '@nestjs/typeorm';


// entidad
import { Product } from './entities/product.entity';

@Module({
  imports: [forwardRef(() => StockModule), TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
