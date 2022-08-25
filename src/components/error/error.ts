import { Component } from "core";

export class Error extends Component {
  static componentName = "Error";
  constructor(props) {
    super(props);
  }
  protected render(): string {
    return `
            <span class="{{#if errorText}}error{{/if}} {{#if successText}}success{{/if}}">{{#if errorText}}{{errorText}}{{/if}}{{#if successText}}{{successText}}{{/if}}</span>
         `;
  }
}
