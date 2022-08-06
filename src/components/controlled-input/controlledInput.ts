import { validator } from "utils/validator";
import Component from "core/component";

export class ControlledInput extends Component {
  static componentName = "ControlledInput";
  constructor({
    layout = "default",
    type = "text",
    label,
    value,
    validationField,
    ...props
  }) {
    super({
      ...props,
      layout,
      type,
      label,
      value,
      validationField,
      onFocus: (e) => {
        const input = e.target;
        this.refs.error.setProps({ errorText: "" });
      },
      onChange: (e) => {
        const input = e.target;
        const value = input.value;
      },
      onEnter: (e) => {
        const input = e.target;
        const value = input.value;
        if (e.key === "Enter" && value) {
          e.preventDefault();
          input.value = "";
        }
      },
      onBlur: (e) => {
        const input = e.target;
        const value = input.value;
        if (validationField) {
          const error = validator({ [validationField]: value });
          const errorText =
            Object.keys(error).length === 0 ? "" : error[validationField];
          this.refs.error.setProps({ errorText });
        }
      }
    });
  }

  protected render() {
    // language=hbs
    return `
        {{#ifEquals layout "default"}}
            <div class="input-wrapper">
          {{#if label}}<label for="{{id}}" class="form__label">{{label}}</label>{{/if}}
          {{{Input
                  id=id
                  layout=layout
                  type=type
                  ref="input"
                  name=name
                  placeholder=placeholder
                  value=value
                  class=class
                  onChange=onChange
                  onFocus=onFocus
                  onBlur=onBlur
                  onEnter=onEnter
                  disabled=disabled}}}
                <span class="{{#if errorClass}}{{errorClass}}{{else}}login-form__input-error{{/if}}">{{{Error ref="error"}}}</span>
      </div>
      {{/ifEquals}}
        {{#ifEquals layout "profile"}}
            <div class="profile-data__row">
                {{#if label}}<label class="profile-data__label" for="{{id}}">{{label}}</label>{{/if}}
                {{{Input
                        id=id
                        layout=layout
                        type=type
                        ref="input"
                        name=name
                        placeholder=placeholder
                        value=value
                        class=class
                        onChange=onChange
                        onFocus=onFocus
                        onBlur=onBlur
                        onEnter=onEnter
                        disabled=disabled}}}
                <span class="{{#if errorClass}}{{errorClass}}{{else}}profile-data__input-error{{/if}}">{{{Error ref="error"}}}</span>
            </div>
        {{/ifEquals}}
`;
  }
}
