import Component from "core/component";
import { ValidationField, validateData } from "utils/validator";
import { getValuesFromElements } from "utils/dom";

export class RegisterPage extends Component {
  static componentName = "RegisterPage";

  constructor(props) {
    super({
      ...props,
      onRegister: (e: PointerEvent) => {
        e.preventDefault();
        const registrationData = getValuesFromElements.bind(this)(
          "login",
          "password",
          "password_confirm",
          "email",
          "first_name",
          "second_name",
          "phone"
        );
        if (validateData.bind(this)(registrationData)) {
          console.log("Данные регистрации:", registrationData);
        }
      },
      onRegisterLinkClick: () => {
        this.props.router.go("/");
      }
    });
  }
  render(): string {
    // language=hbs
    return `
        <main class="main-auth">
            <div class="login-box">
                <h1 class="login-box__title">Регистрация</h1>
                <form method="post" class="login-form">
                    <div class="register-form__fields-block">
                        {{{ControlledInput name="email" type="email" id="email" label="Почта" ref="email" validationField = "${ValidationField.Email}"}}}
                        {{{ControlledInput type="text" name="login" id="login" label="Логин"  ref="login" validationField = "${ValidationField.Login}"}}}
                        {{{ControlledInput type="text" name="first_name" id="first_name" label="Имя" ref="first_name" validationField = "${ValidationField.FirstName}"}}}
                        {{{ControlledInput type="text" name="second_name" id="second_name" label="Фамилия" ref="second_name" validationField = "${ValidationField.SecondName}"}}}
                        {{{ControlledInput type="tel" name="phone" id="phone" label="Телефон" error="Неверный номер телефона" ref="phone" validationField = "${ValidationField.Phone}"}}}
                        {{{ControlledInput type="password" name="password" id="password" label="Пароль" error="Пароль должен быть не менее 6 символов" ref="password" validationField = "${ValidationField.Password}"}}}
                        {{{ControlledInput type="password" name="password_confirm" id="password_confirm" label="Пароль (еще раз)" ref="password_confirm" validationField = "${ValidationField.PasswordConfirm}"}}}
                    </div>
                    <div class="login-form__buttons-block">
                        {{{Button type="submit" text="Зарегистрироваться" id="register-button" onClick=onRegister}}}
                        {{{Link text="Уже есть аккаунт? Войти" class="login-form__link" onClick=onRegisterLinkClick}}}
                    </div>
                </form>
            </div>
        </main>`;
  }
}
