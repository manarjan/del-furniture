export class ColorDots {
  constructor(colorPlaceholder, colors, active) {
    this.colorPlaceholder = colorPlaceholder;
    this.colors = colors;
    this.active = active;
    this.render();
  }
  setActive(active) {
    this.active = active;
    this.render();
  }
  render() {
    this.colorPlaceholder.innerHTML = `
        ${this.colors
          .map(color => {
            return `
                <div data-color="${color}" style="background-color:${color}" class="color-dot ${
              color === this.active ? 'active' : ''
            }"></div>
                
                `;
          })
          .join(' ')}
     `;

    document.querySelectorAll('.color-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        this.setActive(dot.getAttribute('data-color'));
      });
    });
  }
}
