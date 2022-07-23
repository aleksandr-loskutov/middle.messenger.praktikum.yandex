import Handlebars from "handlebars";
import InputTemplate from "../../components/input/input.template";
import LoginPageTemplate from "./template";
import ButtonTemplate from "../../components/button/button.template";
//partials для страницы
Handlebars.registerPartial("button", ButtonTemplate);
Handlebars.registerPartial("input", InputTemplate);

const LoginPage = Handlebars.compile(LoginPageTemplate);
export default LoginPage({});
