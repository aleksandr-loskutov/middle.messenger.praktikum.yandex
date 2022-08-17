import Component from "core/component";
import "./input.scss";

export interface InputProps {
  id?: string;
  layout?: "default" | "profile";
  type?: "text" | "password" | "email" | "number" | "tel" | "date";
  class?: string;
  placeholder?: string;
  ref?: string;
  value?: string;
  disabled?: string;
  name?: string;
  onChange?: () => void;
  onEnter?: (e: KeyboardEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
}
export class Input extends Component {
  static componentName = "Input";
  constructor({ onChange, onEnter, onFocus, onBlur, ...rest }: InputProps) {
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
  render(): string {
    // language=hbs
    return `
        <input 
                name="{{name}}"
                type="{{type}}"
                class="{{#if class}}{{class}}
                {{else}}
                  {{#if layout}}
                      {{#ifEquals layout 'default'}}form-input {{/ifEquals}}{{#ifEquals layout 'profile'}}profile-data__input {{/ifEquals}}
                  {{else}}form-input 
                  {{/if}}
                {{/if}}"
                value="{{value}}" 
                id="{{id}}"
                placeholder="{{placeholder}}"
                {{#if disabled}}disabled{{/if}}/>
`;
  }
}
