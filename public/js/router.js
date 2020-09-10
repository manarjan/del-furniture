import { ajax } from 'rxjs/ajax';
import { finalize, map, tap } from 'rxjs/operators';
import { Spinner } from './components/spinner.component';

export class Router {
  constructor(routes) {
    this.routes = routes;
    this.rootElem = document.getElementById('app');
    this.currentRoute;

    this.spinner = new Spinner();
    this.init = () => {
      window.addEventListener('hashchange', () => {
        this.hasChanged();
      });
      this.hasChanged();
    };

    this.hasChanged = () => {
      const location = window.location.hash.substr(2);
      if (location.length > 0) {
        const route = routes.filter(route => {
          return route.name === location.split('/')[0];
        })[0];
        if (route) {
          this.goToRoute(route.htmlName, route.klass);
        }
      } else {
        const defaultRoute = routes.filter(route => route.default)[0];
        this.goToRoute(defaultRoute.htmlName, defaultRoute.klass);
      }
    };
    this.goToRoute = (htmlName, klass) => {
      const url = 'public/views/' + htmlName + '.html';
      this.spinner.show();
      ajax({ url, responseType: 'document' })
        .pipe(
          tap(() => {
            // Unsubscribe to or Remove event handlers
            if (this.currentRoute && this.currentRoute.onDestroy) {
              this.currentRoute.onDestroy();
            }
          }),
          map(resp => resp.response.body.firstChild),
          finalize(() => {
            this.spinner.hide();
          })
        )
        .subscribe(html => {
          this.rootElem.replaceChild(html, this.rootElem.firstChild);
          this.currentRoute = new klass();
        });
    };

    this.init();
  }
}
