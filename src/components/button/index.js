import Handlebars from "handlebars";
import "./button.scss";
import ButtonTemplate from "button.template";

export default (id, text, type, buttonClass) => {
  return Handlebars.compile(ButtonTemplate)({ id, text, type, buttonClass });
};
