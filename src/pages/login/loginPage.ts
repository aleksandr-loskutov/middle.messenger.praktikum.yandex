import Component from "core/component";
import { validateData, ValidationField } from "utils/validator";
import { getValuesFromElements } from "utils/dom";

export class LoginPage extends Component {
  static componentName = "LoginPage";

  constructor(props) {
    super({
      ...props,
      onLogin: (e) => {
        e.preventDefault();
        const loginData = getValuesFromElements.bind(this)("login", "password");
        if (validateData.bind(this)(loginData)) {
          console.log("Данные входа:", loginData);
        }
      }
    });
  }

  render() {
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
                {{{Button type="submit" text="Вход" id="login-button" onClick=onLogin}}}
                <a href="/register" class="login-form__link">Нет аккаунта?</a>
              </div>
            </form>
          </div>
        </main>`;
  }
}
