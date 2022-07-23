export default `
<main class="main-chat">
  <div class="sidebar-with-back-btn">
    <a class="sidebar-with-back-btn__button" href="/chat">
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="14"
          cy="14"
          r="14"
          transform="rotate(-180 14 14)"
          fill="#3369F3"
        />
        <rect
          x="20"
          y="14.8"
          width="11"
          height="1.6"
          transform="rotate(-180 20 14.8)"
          fill="white"
        />
        <path d="M13 19L9 14L13 9" stroke="white" stroke-width="1.6" />
      </svg>
    </a>
  </div>
  <div class="chat-container">
    <div class="profile-data">
      <form class="profile-data__form">
        <div class="profile-data__avatar-container">
          <div class="personal-image">
          {{> input name="avatar" type="file" id="avatar" class=" "}}
            <figure class="personal-figure">
              <img
                src="https://avatars1.githubusercontent.com/u/11435231?s=460&v=4"
                class="personal-avatar"
                alt="avatar."
              />
              <figcaption class="personal-figcaption" id="user-avatar">
                <img
                  alt="avatar placeholder."
                  id="avatar-placeholder"
                  src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png"
                />
              </figcaption>
            </figure>
          </div>

          <span class="personal-image__error-text hidden" id="avatar-error">
            Нужно выбрать файл</span
          >
          <h1 class="profile-data__user-title">Александр</h1>
          <button class="profile-data__exit-button">[ Выйти ]</button>
        </div>
        <div class="profile-data__info-container">
         {{> profileInput name="email" type="email" id="email" label="Почта" placeholder="test@test.ru"}}
         {{> profileInput name="login" type="text" id="login" label="Логин" placeholder="mylogin"}}
         {{> profileInput name="first_name" type="text" id="first_name" label="Имя" placeholder="Aleksandr"}}
         {{> profileInput name="second_name" type="text" id="second_name" label="Фамилия" placeholder="Lastname"}}
         {{> profileInput name="display_name" id="display_name" label="Имя в чате" placeholder="Icanhazchatname"}}
         {{> profileInput name="phone" id="phone" label="Телефон" placeholder="+799999999"}}
          <div class="profile-data__divider">
            <h2 class="profile-data__title">Смена пароля</h2>
          </div>
            {{> profileInput name="oldPassword" id="oldPassword" label="Текущий пароль" placeholder="****" error="Неверный пароль" errorId="error-wrong-password"}}
            {{> profileInput name="newPassword" id="newPassword" label="Новый пароль" placeholder="****" }}
            {{> profileInput name="newPassword2" id="newPassword2" label="Новый пароль повторно" placeholder="****" }}
          <div class="profile-data__row">
          {{> button text="Сохранить" id="update-user-data"}}
          </div>
        </div>
      </form>
    </div>
  </div>
</main>`;
