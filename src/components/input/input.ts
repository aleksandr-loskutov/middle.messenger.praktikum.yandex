import Component from "core/component";
import "./input.scss";

export class Input extends Component {
  static componentName = "Input";
  constructor({ onChange, onEnter, onFocus, onBlur, ...rest }) {
    super({
      events: {
        click: onChange,
        keyup: onEnter,
        focus: onFocus,
        blur: onBlur
      },
      ...rest
    });
  }
  render() {
    // language=hbs
    return `
        <input 
                name="{{name}}"
                type="{{type}}"
                class="{{#if class}}{{class}}{{else}}{{#ifEquals layout 'default'}}form-input {{/ifEquals}}{{#ifEquals layout 'profile'}}profile-data__input {{/ifEquals}}{{/if}}"
                value="{{value}}" 
                id="{{id}}"
                placeholder="{{placeholder}}"
                {{#if disabled}}disabled{{/if}}/>
`;
  }
}
