import { isEqual } from "../utils/isEqual";
import render from "../core/render";

class Route {
  constructor(pathname, view, props) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._props);
      render(this._block);
      return;
    }

    this._block.show();
  }
}

export class Router {
  constructor(rootQuery = "#root") {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname, block, props = {}) {
    const route = new Route(pathname, block, {
      ...props,
      rootQuery: this._rootQuery,
      router: this
    });
    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = function (event) {
      this._onRoute(event.currentTarget.location.pathname);
    }.bind(this);

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render(route, pathname);
  }

  go(pathname) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname) {
    const route = this.routes.find((route) => route.match(pathname));
    const errorRoute = this.routes.find((route) => route.match("*"));
    return route || errorRoute;
  }
}
