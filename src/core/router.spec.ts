import { expect } from "chai";
import { Router } from "core/router";
import { jsDOMInit } from "utils/dom/jsdom";
import { initRouter } from "../router";

describe("Router", () => {
  const { window } = jsDOMInit();
  const router = new Router();
  initRouter(router);
  router.start();

  it("Router should change location.pathname", () => {
    expect(window.location.pathname).to.equal("/");
    router.go("/sign-up");
    expect(window.location.pathname).to.equal("/sign-up");
  });
  it("Router should change history", () => {
    router.go("/404");
    expect(window.history.length).to.eq(3);
  });
  it("Router should render page properly", () => {
    router.go("/sign-up");
    expect(window.location.pathname).to.equal("/sign-up");
    expect(document.querySelector("h1")?.textContent).to.equal("Регистрация");
  });
});
