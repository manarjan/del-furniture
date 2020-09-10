export class Spinner {
  constructor() {
    this.spinner = document.createElement('div');
    this.spinner.classList.add('spinner');
    this.spinner.innerHTML = `
        <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-yellow-only">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div><div class="gap-patch">
                    <div class="circle"></div>
                </div><div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>
        </div>
    `;
  }

  show() {
    document.body.appendChild(this.spinner);
  }

  hide() {
    document.body.removeChild(this.spinner);
  }
}
