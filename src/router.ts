import { Router } from "core";
import { getPageComponent, Pages } from "pages";

const routes = [
  {
    path: "/",
    component: Pages.Login,
    shouldAuthorized: false
  },
  {
    path: "/sign-up",
    component: Pages.Register,
    shouldAuthorized: false
  },
  {
    path: "/messenger/:id",
    component: Pages.Messenger,
    shouldAuthorized: true
  },
  {
    path: "/password",
    component: Pages.Password,
    shouldAuthorized: true
  },
  {
    path: "/settings",
    component: Pages.Profile,
    shouldAuthorized: true
  },
  {
    path: "*",
    component: Pages.Error,
    shouldAuthorized: false
  }
];

export function initRouter(router: Router) {
  routes.forEach((route) => {
    router.use(route.path, getPageComponent(route.component));
  });
}
