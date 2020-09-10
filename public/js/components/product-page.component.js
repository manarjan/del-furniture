import { finalize } from 'rxjs/operators';
import productService from '../services/product.service';
import { ColorDots } from './color-dots.component';
import { Spinner } from './spinner.component';

export class Product {
  constructor() {
    this.productService = productService;
    this.prodId = window.location.hash.split('/')[2];
    this.product = document.querySelector('.product');

    this.spinner = new Spinner();

    this.init();
  }

  init() {
    this.spinner.show();
    this.productService
      .getProductById(this.prodId)
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe(prod => {
        this.product.innerHTML = this.render(prod);
        this.renderColorDots(prod.colors, prod.colors[0]);
      });
  }

  render(product) {
    return `
  <div class="row">
    <div class="col s12 m6">
      <div class="image">
        <img
          src="${product.imageUrl}"
          alt="${product.name}"
        />
      </div>
    </div>
    <div class="col s12 m6">
      <br class="hide-on-med-and-up" />
      <div class="row">
        <div class="col">
          <strong class="sub-text">${product.name}</strong>
          <h5>${product.collection}</h5>
          <p>
          ${product.description}
          </p>
          <strong class="sub-text">Color</strong>
          <div class="color"></div>
          <br />
          <div class="cta">
            <div class="price">
              <strong class="sub-text">Price per unit</strong>
              <div class="amt">$${product.price}</div>
            </div>
            <button class="btn btn-primary z-depth-0 black">Buy Now</button>
            <i class="material-icons"> add_shopping_cart</i>
          </div>
        </div>
      </div>
    </div>
  </div>

    `;
  }

  renderColorDots(colors, active) {
    const color = document.querySelector('.color');
    new ColorDots(color, colors, active);
  }

  onDestory() {}
}
