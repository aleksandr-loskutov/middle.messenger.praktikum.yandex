import Handlebars from "handlebars";
export function Templator(template: string, props?: {}) {
  return props
    ? Handlebars.compile(template)(props)
    : Handlebars.compile(template);
}
