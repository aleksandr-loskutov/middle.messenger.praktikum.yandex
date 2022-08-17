import { ControlledInputProps } from "components/controlled-input/controlledInput";
import Component from "core/component";
import "./modal.scss";

interface ModalProps extends ControlledInputProps {
  id: string;
  title: string;
  inputName: string;
  inputId: string;
  buttonText: string;
}

export class Modal extends Component {
  static componentName = "Modal";
  constructor(props: ModalProps) {
    super(props);
  }

  // language=hbs
  render(): string {
    return `
      <div id="{{id}}" class="modal">
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
                  {{{Button type="submit" class="modal-form__button button" text=buttonText icon="send" onClick=onSubmit}}}
              </div>
            </form>
          </div>
        </div>
      </div>`;
  }
}
