import Handlebars from "handlebars";
import {
  ChatPage,
  LoginPage,
  ErrorPage,
  RegisterPage,
  ProfilePage,
  PasswordChangePage
} from "pages";
import "css/style.scss";
import render from "core/render";
import registerComponent from "core/registerComponent";
import { addListeners } from "utils/dom";
import mockData from "utils/mock";
import components from "components";

Handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

for (const [, component] of Object.entries(components)) {
  registerComponent(component);
}

window.onload = function (): void {
  let page;
  switch (window.location.pathname) {
    case "/":
      page = new LoginPage();
      break;
    case "/login":
      page = new LoginPage();
      break;
    case "/register":
      page = new RegisterPage();
      break;
    case "/password":
      page = new PasswordChangePage({
        user: { ...mockData.user }
      });
      break;
    case "/chat":
      page = new ChatPage(mockData);
      break;
    case "/profile":
      page = new ProfilePage({
        user: { ...mockData.user }
      });
      break;
    default:
      page = new ErrorPage({});
      break;
  }
  render(page);
  addListeners();
};
