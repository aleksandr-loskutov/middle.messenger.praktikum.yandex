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
import mockData from "utils/mock";
import components from "components";
import { addListeners } from "utils/dom";

Handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

for (let componentKey in components) {
  registerComponent(components[componentKey]);
}

window.onload = function (): void {
  let page;
  switch (window.location.pathname) {
    case "/":
      page = new LoginPage({});
      break;
    case "/login":
      page = new LoginPage({});
      break;
    case "/register":
      page = new RegisterPage({});
      break;
    case "/password":
      page = new PasswordChangePage({
        user: { name: "Александр", avatar: "https://i.pravatar.cc/150?img=6" }
      });
      break;
    case "/chat":
      page = new ChatPage({ ...mockData });
      break;
    case "/profile":
      page = new ProfilePage({
        user: { name: "Александр", avatar: "https://i.pravatar.cc/150?img=6" }
      });
      break;
    default:
      page = new ErrorPage({ errorText: "Не туда попали", errorCode: "404" });
      break;
  }
  render(page);
  addListeners();
};
