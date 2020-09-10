import { Injectable, NotFoundException } from '@nestjs/common';
import { products } from '../products.data';
import { Product, ProductFilter, Products } from '../models/product.model';

@Injectable()
export class ProductsService {
  getProducts(filter: ProductFilter): Products {
    const filtered = products.filter(product => {
      return (
        product.name.toLowerCase().includes(filter.query.toLowerCase()) &&
        product.price >= +filter.min &&
        product.price <= +filter.max
      );
    });

    return {
      total: filtered.length,
      data: filtered.slice(
        +filter.page * +filter.per_page,
        +filter.per_page * (1 + +filter.page)
      )
    };
  }

  getProductById(id: number): Product {
    const product = products.find(product => product.id === +id);
    if (product) {
      return product;
    } else {
      throw new NotFoundException();
    }
  }
}
