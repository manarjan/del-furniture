import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductFilter } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(@Query() filter: ProductFilter) {
    return this.productsService.getProducts(filter);
  }

  @Get(':id')
  getProductById(@Param('id') id: number) {
    return this.productsService.getProductById(id);
  }
}
