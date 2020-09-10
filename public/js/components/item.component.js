import { Rating } from './rating.component';

export function Item(id, imageUrl, name, collection, price, rating) {
  return `<div class="item col s12 m6 l4">
        <div class="image">
          <a href="#/product/${id}"><img
            loading="lazy"
            width="300"
            height="300"
            src="${imageUrl}"
          /></a>
        </div>
        <div class="details">
          <div class="heading">
            <div class="title">
              <strong title="${name}">${
    name.length > 15 ? name.slice(0, 15) + '...' : name
  }</strong>
            </div>
            <div class="sub-title">
              <sub>${collection}</sub>
            </div>
          </div>
          <div class="price">
            $${price}
          </div>
        </div>
        <div class="actions">
          <div class="rating">
            ${Rating(rating)}
          </div>
          <div class="add-to-cart">
            <i class="material-icons"> add_shopping_cart</i>
          </div>
        </div>
      </div>`;
}
