import { Component } from "core";
import "./link.scss";

interface LinkProps {
  text?: string;
  href?: string;
  className?: string;
  onClick?: () => void;
  span?: string;
  spanClass?: string;
  wrapperClass?: string;
  icon?: string;
}
export class Link extends Component {
  static componentName = "Link";
  constructor({ text, onClick, ...rest }: LinkProps) {
    super({ text, events: { click: onClick }, ...rest });
  }

  render(): string {
    // language=hbs
    return `
        <div class="{{#if wrapperClass}}{{wrapperClass}}{{else}}link-wrapper{{/if}}">
          <a class="{{#if class}}{{class}}{{else}}link{{/if}}">
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
          </a>
        </div>`;
  }
}
