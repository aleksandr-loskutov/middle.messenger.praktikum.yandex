import { Component } from "core";
import { validateData, ValidationField } from "utils/validator";
import { getValuesFromElements } from "utils/dom";
import { logger } from "utils";
import { withRouter, withStore } from "components/hoc";
import { login } from "services";

class LoginPage extends Component {
  static componentName = "LoginPage";

  constructor(props: PropsAny) {
    super({
      ...props,
      onLogin: (e: PointerEvent) => {
        e.preventDefault();
        const loginData = getValuesFromElements.bind(this)("login", "password");
        if (validateData.bind(this)(loginData)) {
          logger("Данные пользователя:", loginData);
          this.props.store.dispatch(login, loginData);
        }
      },
      onRegisterLinkClick: () => {
        this.props.router.go("/sign-up");
      }
    });
    this.setProps({
      formError: () => this.props.store.getState().formError,
      isLoading: () => this.props.store.getState().isLoading
    });
  }

  render(): string {
    // language=hbs
    return `
        <main class="main-auth">
          <div class="login-box">
            <h1 class="login-box__title">Вход</h1>
            <form method="post" class="login-form">
              <div class="login-form__fields-block">
                {{{ControlledInput  name="login" placeholder="Логин"  id="login" label="Логин" ref="login"  validationField = "${ValidationField.Login}"}}}
                {{{ControlledInput  name="password" placeholder="Пароль"  id="password" label="Пароль" type="password" ref="password" validationField = "${ValidationField.Password}"}}}
              </div>
              <div class="login-form__buttons-block">
                {{{Error errorText=formError}}}
                {{{Button type="submit" text="Вход" id="login-button" onClick=onLogin disabled=isLoading}}}
                {{{Link text="Нет аккаунта?" class="login-form__link" onClick=onRegisterLinkClick}}}
              </div>
            </form>
          </div>
        </main>`;
  }
}

export default withRouter(withStore(LoginPage));
