import { Route } from './route';
import { Router } from './router';
import { Landing } from './components/landing.component';
import { Product } from './components/product-page.component';
import productService from './services/product.service';

document.addEventListener('DOMContentLoaded', function() {
  const sidenav = document.querySelectorAll('.sidenav');
  const sideNavInstances = M.Sidenav.init(sidenav, { draggable: false });

  const router = new Router([
    new Route('home', 'landing', Landing, true),
    new Route('product', 'product', Product)
  ]);

  const search = document.querySelector('#search');

  search.addEventListener('keyup', event => {
    productService.productQuery$.next(event.target.value);
  });
});
