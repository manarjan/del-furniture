export class Route {
  constructor(name, htmlName, klass, defaultRoute) {
    this.name = name;
    this.htmlName = htmlName;
    this.default = defaultRoute;
    this.klass = klass;

    this.isActiveRoute = hashedPath => {
      return hashedPath.split('/')[0] === this.name;
    };
  }
}
