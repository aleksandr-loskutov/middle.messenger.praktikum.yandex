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
  confirmMode?: boolean | undefined;
}

class Modal extends Component {
  static componentName = "Modal";

  constructor({ toggler, ...rest }: ModalProps) {
    super({ events: { click: toggler }, ...rest });
    this.setProps({
      formError: () => this.props.store.getState().formError,
      formSuccess: () => this.props.store.getState().formSuccess,
      isLoading: () => this.props.store.getState().isLoading,
      isActive: (): boolean => {
        const searchParams = this.props.router.searchParams;
        const modalParam = searchParams.modal;
        if (modalParam) {
          return this.props.id.includes(modalParam);
        }
        return false;
      }
    });
  }

  render(): string {
    // language=hbs
    return `
        <div id="{{id}}" class="modal {{#if isActive}}{{else}}hidden{{/if}}">
        <div class="modal__wrapper">
          <div class="modal-content">
            <h2 class="modal-content__title">{{title}}</h2>
            <form class="modal-content__form">
              <div class="modal-form__fields-block">
              {{#if confirmMode}}
              {{else}}
                {{#if label}}
                <label class="modal-form__label" for="{{inputId}}">
                {{label}}
                </label>
                {{/if}}
                {{{ControlledInput name=inputName class="modal-form__input form-input" placeholder=placeholder id=inputId ref=inputName validationField=validationField}}}
              {{/if}}
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
