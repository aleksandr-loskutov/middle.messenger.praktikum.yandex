import Component from "core/component";
import "./button.scss";

export class Button extends Component {
  static componentName = "Button";
  constructor({ text, onClick, ...rest }) {
    super({ text, events: { click: onClick }, ...rest });
  }

  render() {
    // language=hbs
    return `
        <div class="button-wrapper">
          <button  id="{{id}}" type="{{#if type}}{{type}}{{else}}button{{/if}}" class="{{#if class}}{{class}}{{else}}button{{/if}}">
          {{#if text}}
              {{text}}
          {{else}}
              {{#if icon}}
                  {{{Image type="icon" icon="{{icon}}"}}}
              {{/if}}
              {{#if span}}
                  <span class="{{spanClass}}">{{span}}</span>
              {{/if}}
          {{/if}}
          </button>
        </div>`;
  }
}
