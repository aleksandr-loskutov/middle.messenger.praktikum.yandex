import { Component } from "core";
import "./spinner.scss";
import spinner from "./spinner.gif";

export type SpinnerProps = {
  type: "css" | "image";
};
export class Spinner extends Component {
  static componentName = "Spinner";

  constructor(props: SpinnerProps) {
    super(props);
  }

  render(): string {
    // language=hbs
    return `
        {{#if type}}
      <div class="spinner">
              {{#ifEquals type "image"}}<img alt="spinner." class="spinner__image" src="${spinner}"/>{{else ifEquals type "css"}}<div class="spinner__css"></div>{{/ifEquals}}
      </div>
        {{/if}}`;
  }
}
