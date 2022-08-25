import { Component } from "core";
import { ValidationField, validateData } from "utils/validator";
import { getValuesFromElements } from "utils/dom";
import { User } from "types/user";
import { withRouter, withStore } from "../../components/hoc";

export class ProfilePage extends Component {
  static componentName = "ProfilePage";
  constructor(props: { user: User }) {
    super({
      ...props,
      onUpdateUserData: (e: PointerEvent) => {
        e.preventDefault();
        const userData = getValuesFromElements.bind(this)(
          "email",
          "login",
          "first_name",
          "second_name",
          "display_name",
          "phone"
        );
        if (validateData.bind(this)(userData)) {
          console.log("Данные пользователя:", userData);
        }
      },
      onBackButtonClick: () => {
        this.props.router.back();
      },
      onChangePasswordLinkClick: () => {
        this.props.router.go("/password");
      }
    });
  }

  render(): string {
    // language=hbs
    return `
        <main class="main-chat">
            {{{Button class="sidebar-with-back-btn__button" wrapperClass="sidebar-with-back-btn" icon="back-arrow" onClick=onBackButtonClick}}}
            <div class="chat-container">
                <div class="profile-data">
                    <form class="profile-data__form">
                        <div class="profile-data__avatar-container">
                            <div class="personal-image">
                                {{{Input name="avatar" type="file" id="avatar" }}}
                                <figure class="personal-figure">
                                    {{#if user.avatar}}
                                        {{{Image type="img" class="personal-avatar" src=user.avatar}}}
                                    {{/if}}
                                    <figcaption class="personal-figcaption" id="user-avatar">
                                        {{{Image type="img" id="avatar-placeholder" src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png" alt="установить avatar."}}}
                                    </figcaption>
                                </figure>
                            </div>
                            <span class="personal-image__error-text hidden" id="avatar-error">Нужно выбрать файл</span>
                            <h1 class="profile-data__user-title">{{user.name}}</h1>
                        </div>
                        <div class="profile-data__info-container">
                            {{{ControlledInput layout="profile" name="email" ref="email" type="email" id="email" label="Почта" placeholder="test@test.ru" validationField = "${ValidationField.Email}"}}}
                            {{{ControlledInput layout="profile" name="login" ref="login" type="text" id="login" label="Логин" placeholder="mylogin" validationField = "${ValidationField.Login}"}}}
                            {{{ControlledInput layout="profile" name="first_name" ref="first_name" type="text" id="first_name" label="Имя" placeholder="Aleksandr" validationField = "${ValidationField.FirstName}"}}}
                            {{{ControlledInput layout="profile" name="second_name" ref="second_name" type="text" id="second_name" label="Фамилия" placeholder="Lastname" validationField = "${ValidationField.SecondName}"}}}
                            {{{ControlledInput layout="profile" name="display_name" ref="display_name" id="display_name" label="Имя в чате" placeholder="Icanhazchatname" validationField = "${ValidationField.DisplayName}"}}}
                            {{{ControlledInput layout="profile" name="phone" id="phone" ref="phone" label="Телефон" placeholder="+799999999" validationField = "${ValidationField.Phone}"}}}
                            <div class="profile-data__divider"></div>
                                {{{Link text="[ Изменить пароль ]" class="login-form__link" wrapperClass="profile-data__row no-border" onClick=onChangePasswordLinkClick}}}
                            <div class="profile-data__row no-border">
                                {{{Button class="profile-data__exit-button" type="button" text="[ Выйти ]"}}}
                            </div>
                            <div class="profile-data__row no-border">
                                {{{Button type="submit" text="Сохранить" id="update-user-data" onClick=onUpdateUserData}}}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>`;
  }
}
export default withRouter(withStore(ProfilePage));
