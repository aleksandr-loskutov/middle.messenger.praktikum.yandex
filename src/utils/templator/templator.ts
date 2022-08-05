import Handlebars from "handlebars";
export function Templator(template, data: {} | undefined) {
  return data
    ? Handlebars.compile(template)(data)
    : Handlebars.compile(template);
}
