import Component from "core/component";

export class Error extends Component {
  static componentName = "Error";

  protected render(): string {
    return `
            <span>{{errorText}}</span>
         `;
  }
}
