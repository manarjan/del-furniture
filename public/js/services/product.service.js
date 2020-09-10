import { BehaviorSubject } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, take } from 'rxjs/operators';

class ProductService {
  constructor() {
    this.productQuery$ = new BehaviorSubject('');
  }

  getProducts(filter) {
    return ajax({
      url: `/products?min=${filter.min}&max=${filter.max}&query=${filter.query}&page=${filter.page}&per_page=${filter.per_page}`
    }).pipe(
      take(1),
      map(resp => {
        return resp.response;
      })
    );
  }

  getProductById(id) {
    return ajax({
      url: `/products/${id}`
    }).pipe(
      take(1),
      map(resp => {
        return resp.response;
      })
    );
  }
}

const productService = new ProductService();

Object.freeze(productService);

export default productService;
