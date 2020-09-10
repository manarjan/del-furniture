import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';
import productService from '../services/product.service';
import paginationService from './pagination.component';
import { ProductListing } from './product-listing.component';
import { Spinner } from './spinner.component';

export class Landing {
  constructor() {
    this.productService = productService;

    this.collapsible = document.querySelectorAll('.collapsible');
    this.collapsibleInstances = M.Collapsible.init(this.collapsible, {
      accordion: false
    });

    this.sidenav = document.querySelector('#filter');
    this.sideNavInstances = M.Sidenav.init(this.sidenav, {
      edge: 'right',
      draggable: false
    });

    this.rangeMin = document.querySelectorAll('.range-values .min');
    this.rangeMax = document.querySelectorAll('.range-values .max');

    this.spinner = new Spinner();
    this.pagination;

    this.paginationService = paginationService;

    this.slider = document.getElementById('slider');
    this.side_slider = document.getElementById('side-slider');

    noUiSlider.create(this.slider, {
      start: [0, 10000],
      connect: true,
      step: 100,
      tooltips: false,
      orientation: 'horizontal',
      range: {
        min: 0,
        max: 10000
      },
      format: wNumb({
        decimals: 0
      })
    });
    noUiSlider.create(this.side_slider, {
      start: [0, 10000],
      connect: true,
      step: 100,
      tooltips: false,
      orientation: 'horizontal',
      range: {
        min: 0,
        max: 10000
      },
      format: wNumb({
        decimals: 0
      })
    });

    this.sliderRange$ = new BehaviorSubject([0, 10000]);
    this.onDestroy$ = new Subject();

    this.init();
  }

  init() {
    const handleSlide = values => {
      const [min, max] = values;

      this.rangeMin.forEach(minField => {
        minField.textContent = `\$${min}`;
      });

      this.rangeMax.forEach(maxField => {
        maxField.textContent = `\$${max}`;
      });
    };

    this.slider.noUiSlider.on('update', handleSlide);
    this.side_slider.noUiSlider.on('update', handleSlide);

    this.slider.noUiSlider.on('end', event => {
      this.side_slider.noUiSlider.set(event);
      this.sliderRange$.next(event);
    });
    this.side_slider.noUiSlider.on('end', event => {
      this.slider.noUiSlider.set(event);
      this.sliderRange$.next(event);
    });

    const items = document.querySelector('.items');
    combineLatest([
      this.productService.productQuery$.pipe(
        debounceTime(500),
        distinctUntilChanged()
      ),
      this.sliderRange$,
      this.paginationService.pageEvent$
    ])
      .pipe(
        takeUntil(this.onDestroy$),
        tap(() => {
          this.spinner.show();
        }),
        switchMap(([query, range, page]) => {
          return this.productService
            .getProducts({
              min: range[0],
              max: range[1],
              query,
              page,
              per_page: 6
            })
            .pipe(
              catchError(err => {
                console.error(err);
              }),
              finalize(() => {
                this.spinner.hide();
              })
            );
        })
      )
      .subscribe(response => {
        items.innerHTML = ProductListing(response.data);
        this.pagination = document.querySelectorAll('.pagination');
        this.paginationService.setPages(response.total / 6);
        this.paginationService.setPlaceholders(this.pagination);
        this.paginationService.render();
      });
  }

  onDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.slider.noUiSlider.off();
  }
}
