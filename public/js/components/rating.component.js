export function Rating(stars) {
  return `
    ${[1, 2, 3, 4, 5]
      .map(index => {
        return `<i class="material-icons"> ${
          index <= stars ? 'star' : 'star_border'
        }</i>`;
      })
      .join(' ')}
    `;
}
