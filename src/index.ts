import Handlebars from "handlebars";
import "css/style.scss";
import registerComponent from "core/registerComponent";
import components from "components";
import { Router, Store } from "core";
import { defaultState } from "./store";
import { initApp } from "services";
import { initRouter } from "./router";
import { DEBUG } from "utils/consts";

Handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

for (const [, component] of Object.entries(components)) {
  registerComponent(component);
}
document.addEventListener("DOMContentLoaded", () => {
  const store = new Store<AppState>(defaultState);
  const router = new Router();

  window.router = router;
  window.store = store;

  /**
   * Инициализируем роутер
   */
  initRouter(router);

  store.on("changed", (_prevState, nextState) => {
    router.start();
    if (DEBUG) {
      console.log(
        "%cstore updated",
        "background: #222; color: #bada55",
        nextState
      );
    }
  });

  /**
   * Загружаем данные для приложения
   */
  store.dispatch(initApp);
});
