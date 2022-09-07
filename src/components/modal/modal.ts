import { ControlledInputProps } from "components/controlled-input/controlledInput";
import { Component } from "core";
import "./modal.scss";
import { withRouter, withStore } from "../hoc";

interface ModalProps extends ControlledInputProps {
  id: string;
  title: string;
  inputName: string;
  inputId: string;
  buttonText: string;
  toggler?: () => void;
}

class Modal extends Component {
  static componentName = "Modal";

  constructor({ toggler, ...rest }: ModalProps) {
    super({ events: { click: toggler }, ...rest });
    this.setProps({
      formError: () => this.props.store.getState().formError,
      formSuccess: () => this.props.store.getState().formSuccess,
      isLoading: () => this.props.store.getState().isLoading
    });
  }

  render(): string {
    // language=hbs
    return `
      <div id="{{id}}" class="modal hidden">
        <div class="modal__wrapper">
          <div class="modal-content">
            <h2 class="modal-content__title">{{title}}</h2>
            <form class="modal-content__form">
              <div class="modal-form__fields-block">
                  {{#if label}}
                <label class="modal-form__label" for="{{inputId}}">
                    {{label}}
                </label>
                  {{/if}}
                  {{{ControlledInput name=inputName class="modal-form__input form-input" placeholder=placeholder id=inputId ref=inputName validationField=validationField}}}
                  {{{Error errorText=formError successText=formSuccess}}}
                  {{{Button type="submit" class="modal-form__button button" text=buttonText icon="send" disabled=isLoading onClick=onSubmit}}}
              </div>
            </form>
          </div>
        </div>
      </div>`;
  }
}

export default withRouter(withStore(Modal));
