import { Item } from './item.component';

export function ProductListing(items) {
  if (items.length === 0) {
    return `<div class='error'>Sorry, no items found 🙁 </div>`;
  }
  return items
    .map(item =>
      Item(
        item.id,
        item.imageUrl,
        item.name,
        item.collection,
        item.price,
        item.rating
      )
    )
    .join(' ');
}
