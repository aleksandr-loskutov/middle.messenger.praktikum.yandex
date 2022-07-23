import Handlebars from "handlebars";
import registerPageTemplate from "./template";
import inputTemplate from "../../components/input/input.template";
import buttonTemplate from "../../components/button/button.template";
//partials для страницы
Handlebars.registerPartial("button", buttonTemplate);
Handlebars.registerPartial("input", inputTemplate);

const RegisterPage = Handlebars.compile(registerPageTemplate);
export default RegisterPage({});
