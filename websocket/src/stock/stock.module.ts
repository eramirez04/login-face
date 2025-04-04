import { forwardRef, Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockGateway } from './stock.gateway';

import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [forwardRef(() => ProductModule)],
  providers: [StockGateway, StockService],
  exports: [StockService],
})
export class StockModule {}
