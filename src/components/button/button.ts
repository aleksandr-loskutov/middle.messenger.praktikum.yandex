import { Component } from "core";
import "./button.scss";

interface ButtonProps {
  id?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  text?: string;
  span?: string;
  spanClass?: string;
  wrapperClass?: string;
  icon?: string;
}
export class Button extends Component {
  static componentName = "Button";
  constructor({ text, onClick, ...rest }: ButtonProps) {
    super({ text, events: { click: onClick }, ...rest });
  }

  render(): string {
    // language=hbs
    return `
        <div class="{{#if wrapperClass}}{{wrapperClass}}{{else}}button-wrapper{{/if}}">
          <button {{#if id}}id="{{id}}"{{/if}} type="{{#if type}}{{type}}{{else}}button{{/if}}" class="{{#if class}}{{class}}{{else}}button{{/if}}" {{#if disabled}}disabled="disabled"{{/if}}>
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
