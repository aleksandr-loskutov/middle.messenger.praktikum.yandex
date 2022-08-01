import Handlebars from "handlebars";
export default function Templator(template, data) {
  return data
    ? Handlebars.compile(template)(data)
    : Handlebars.compile(template);
}
