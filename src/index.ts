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
import registerComponent from "core/registerComponent";
import mockData from "utils/mock";
import components from "components";
import { Router } from "core";

Handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

for (const [, component] of Object.entries(components)) {
  registerComponent(component);
}

const router = new Router();

router.use("/", LoginPage);
router.use("/sign-up", RegisterPage);
router.use("/messenger", ChatPage, mockData);
router.use("/settings", ProfilePage, { user: { ...mockData.user } });
router.use("/password", PasswordChangePage);
router.use("*", ErrorPage);
router.start();
