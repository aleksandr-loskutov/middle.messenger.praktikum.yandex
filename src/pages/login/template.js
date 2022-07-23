export default `<main class="main-auth">
  <div class="login-box">
    <h1 class="login-box__title">Вход</h1>
    <form method="post" class="login-form">
      <div class="login-form__fields-block">
        {{> input name="login" placeholder="Логин" type="text" id="login" label="Логин" }}
        <span class="login-form__input-error hidden">Неверный логин</span>
        {{> input name="password" placeholder="Пароль" type="text" id="password" label="Пароль" }}
        <span class="login-form__input-error hidden">Неверный пароль</span>
      </div>
      <div class="login-form__buttons-block">
        {{> button type="submit" text="Вход" id="login-button" class="button"}}
        <a href="#" class="login-form__link">Нет аккаунта?</a>
      </div>
    </form>
  </div>
</main>`;
