import { Component, ComponentClass } from "core/component";
import render from "core/render";
import { isEqual } from "utils/helpers";
type props = Record<string, any>;

class Route<P = any> {
  #pathname: string;
  #componentClass: ComponentClass<P>;
  #component: Component | null = null;
  #props: props;
  #isPostfixId: boolean | undefined;

  constructor(pathname: string, view: ComponentClass<P>, props: props) {
    this.#isPostfixId = pathname.includes(":id");
    this.#pathname = pathname.replace("/:id", "");
    this.#componentClass = view;
    this.#props = props;
  }
  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.render();
    }
  }
  get pathname(): string {
    return this.#pathname;
  }
  leave() {
    if (this.#component) {
      this.#component.hide();
    }
  }
  match(pathname: string) {
    if (this.#isPostfixId) {
      pathname = pathname.replace(/\/\d+/, "").replace(/\/$/, "");
    }
    return isEqual(pathname, this.#pathname);
  }
  #prefixHandler() {
    return Number(window.location.pathname.replace(/[a-zA-Z/]+/, ""));
  }
  render() {
    const id = this.#prefixHandler();
    if (!this.#component) {
      this.#component = new this.#componentClass({
        ...this.#props,
        idParam: id
      } as P & { idParam: number });
      render(this.#component);
      return;
    }
    this.#component.setProps({ idParam: id });
    this.#component.show();
  }
}

export class Router {
  static __instance: Router;
  #routes: Array<Route> = [];
  #history: History = window.history;
  #currentRoute: Route | null = null;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    Router.__instance = this;
  }
  use<P>(pathname: string, block: ComponentClass<P> | any, props: props = {}) {
    const route = new Route(pathname, block, props);

    this.#routes.push(route);

    return this;
  }
  start() {
    window.onpopstate = (event: PopStateEvent) => {
      this._onRoute(event.currentTarget?.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this.#currentRoute && this.#currentRoute !== route) {
      this.#currentRoute.leave();
    }

    this.#currentRoute = route;
    route.render();
  }
  go(pathname: string) {
    this.#history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }
  back() {
    this.#history.back();
  }

  forward() {
    this.#history.forward();
  }
  get currentRoute(): Route | null {
    return this.#currentRoute;
  }

  get searchParams(): URLSearchParams {
    return new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop)
    });
  }

  getRoute(pathname: string): Route | undefined {
    const route = this.#routes.find((route) => route.match(pathname));
    const errorRoute = this.#routes.find((route) => route.match("*"));
    return route || errorRoute;
  }
}
