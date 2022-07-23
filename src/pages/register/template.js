export default `
    <main class="main-auth">
      <div class="login-box">
        <h1 class="login-box__title">Регистрация</h1>
        <form method="post" class="login-form">
          <div class="register-form__fields-block">
            {{> input name="email" type="email" id="email" label="Почта"}}
            <span class="login-form__input-error email-err hidden"
              >Неверный email</span
            >
            {{> input  type="text" name="login" id="login" label="Логин"}}
            <span class="login-form__input-error login-err hidden"
              >Логин уже занят</span
            >
            {{> input  type="text" name="first_name" id="first_name" label="Имя"}}
            {{> input  type="text" name="second_name" id="second_name" label="Фамилия"}}
            {{> input  type="tel" name="phone" id="phone" label="Телефон"}}
            <span class="login-form__input-error phone-err hidden"
              >Введите корректный номер</span
            >
             {{> input  type="password" name="password" id="password" label="Пароль"}}
            {{> input  type="password" name="password2" id="password2" label="Пароль (еще раз)"}}
            <span class="login-form__input-error password-err hidden"
              >Пароли не совпадают</span
            >
          </div>
          <div class="login-form__buttons-block">
            {{> button type="submit" text="Зарегистрироваться" id="register-button" class="button"}}
          </div>
        </form>
      </div>
    </main>`;
