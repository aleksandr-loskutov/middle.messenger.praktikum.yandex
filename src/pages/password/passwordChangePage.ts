import { Component } from "core";
import { ValidationField, validateData } from "utils/validator";
import { getValuesFromElements } from "utils/dom";
import { User } from "types/user";
import { withRouter, withStore } from "components/hoc";
import { updateUserPassword } from "services";
import { logger, transformPasswords } from "utils";
import { RESOURCES_URL } from "utils/consts";

export class PasswordChangePage extends Component {
  static componentName = "PasswordChangePage";

  constructor(props: { user: User }) {
    super({
      ...props,
      onChangePassword: (e: PointerEvent) => {
        e.preventDefault();
        const userPasswords = getValuesFromElements.bind(this)(
          "password",
          "new_password",
          "new_password_confirm"
        );
        if (validateData.bind(this)(userPasswords)) {
          logger("Пароли пользователя:", userPasswords);
          this.props.store.dispatch(
            updateUserPassword,
            transformPasswords(userPasswords)
          );
        }
      },
      onBackButtonClick: () => {
        this.props.router.back();
      }
    });
    this.setProps({
      formError: () => this.props.store.getState().formError,
      formSuccess: () => this.props.store.getState().formSuccess,
      isLoading: () => this.props.store.getState().isLoading,
      avatar: () => this.props.store.getState().user?.avatar
    });
  }

  render(): string {
    const { user } = this.props.store.getState();
    const avatar = RESOURCES_URL + user?.avatar;
    // language=hbs
    return `
        <main class="main-chat">
                {{{Button class="sidebar-with-back-btn__button" wrapperClass="sidebar-with-back-btn" icon="back-arrow" onClick=onBackButtonClick}}}
            <div class="chat-container">
                <div class="profile-data">
                    <form class="profile-data__form">
                        <div class="profile-data__avatar-container">
                            <div class="personal-image">
                                <figure class="personal-figure">
                                    {{#if avatar}}{{{Image type="img" class="personal-avatar no-pointer" src="${avatar}"}}}{{/if}}
                                </figure>
                            </div>
                            <h1 class="profile-data__user-title">{{user.name}}</h1>
                        </div>
                        <div class="profile-data__info-container">
                            {{{ControlledInput layout="profile" type="password" name="password" ref="password" id="password" label="Текущий пароль" placeholder="****"  validationField = "${ValidationField.Password}"}}}
                            {{{ControlledInput layout="profile" type="password" name="new_password" ref="new_password" id="new_password" label="Новый пароль" placeholder="****" validationField = "${ValidationField.NewPassword}"}}}
                            {{{ControlledInput layout="profile" type="password" name="new_password_confirm" ref="new_password_confirm" id="new_password_confirm" label="Новый пароль повторно" placeholder="****" validationField = "${ValidationField.NewPasswordConfirm}"}}}
                            {{{Error errorText=formError successText=formSuccess}}}
                            <div class="profile-data__row">
                                {{{Button type="submit" text="Сохранить" id="update-user-password" onClick=onChangePassword disabled=isLoading}}}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>`;
  }
}
export default withRouter(withStore(PasswordChangePage));
