import { BehaviorSubject } from 'rxjs';

export class PaginationService {
  constructor() {
    this.pages;

    this.placeholders;
    this.active = 0;
    this.pageEvent$ = new BehaviorSubject(0);
  }

  setPlaceholders(placeholders) {
    this.placeholders = placeholders;
  }

  setPages(pages) {
    this.pages = [];
    for (let i = 0; i < pages; i++) {
      this.pages.push(i);
    }
  }

  render() {
    this.placeholders.forEach(placeholder => {
      placeholder.innerHTML = ` <ul class="pagination">
        <li class="page-back ${this.active == 0 ? 'disabled' : ''}">
          <a ><i class="material-icons">chevron_left</i></a>
        </li>
        ${this.pages
          .map(page => {
            return `<li data-page="${page}" class="page ${
              this.active == page ? 'active black' : ''
            }"><a >${page + 1}</a></li>`;
          })
          .join(' ')}
        <li class="page-next ${
          this.active == this.pages.length - 1 ? 'disabled' : ''
        }">
          <a ><i class="material-icons">chevron_right</i></a>
        </li>
      </ul>`;
    });
    const backBtns = document.querySelectorAll('.page-back');
    const nextBtns = document.querySelectorAll('.page-next');

    const pages = document.querySelectorAll('.page');

    backBtns.forEach(back => {
      back.addEventListener('click', () => {
        if (this.active != 0) {
          this.active -= 1;
          this.pageEvent$.next(this.active);
          this.render();
        }
      });
    });
    nextBtns.forEach(next => {
      next.addEventListener('click', () => {
        if (this.active != this.pages.length - 1) {
          this.active += 1;
          this.pageEvent$.next(this.active);
          this.render();
        }
      });
    });

    pages.forEach(page => {
      const pageNumber = page.getAttribute('data-page');
      page.addEventListener('click', () => {
        this.active = pageNumber;
        this.pageEvent$.next(this.active);
        this.render();
      });
    });
  }
}

const paginationService = new PaginationService();

export default paginationService;
