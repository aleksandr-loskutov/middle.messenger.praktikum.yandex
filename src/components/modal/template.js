import "./modal.scss";
export default `
<div id="{{id}}" class="modal">
  <div class="modal__wrapper">
    <div class="modal-content">
      <h2 class="modal-content__title">{{title}}</h2>
      <form class="modal-content__form">
        <div class="modal-form__fields-block">
          <label class="modal-form__label" for="{{inputId}}">
            Логин
          </label>
          <input
            class="modal-form__input form-input"
            type="{{type}}"
            id="{{inputId}}"
            name="{{inputId}}"
            placeholder="{{placeholder}}"
            value="{{value}}"
            
          />
          <button class="modal-form__button button" type="submit">
            {{buttonText}}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>`;
