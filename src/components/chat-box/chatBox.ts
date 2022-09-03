import { Component } from "core";
import { ChatDTO } from "types/api";
import { ValidationField } from "utils/validator";
import { withRouter, withStore } from "components/hoc";
import { connectChats } from "services/message.service";

class ChatBox extends Component {
  static componentName = "ChatBox";

  constructor(props: { chat: ChatDTO }) {
    super(props);
    this.setProps({
      currentChat: this.props.store
        .getState()
        .chats.find((chat) => chat.id === this.props.idParam),
      messages: () => {
        const chatId = this.props.idParam;
        const messages = this.props.store.getState().chatMessages;
        return chatId > 0 && messages[chatId]?.length > 0
          ? messages[chatId]
              .map((message) => {
                return {
                  ...message,
                  isMine:
                    message.user_id === this.props.store.getState().user.id
                };
              })
              .reverse()
          : [];
      }
    });
  }
  componentDidMount() {
    this.props.store.dispatch(connectChats.bind(this));
  }
  render(): string {
    //language=hbs
    return `
    <div class="chat-container">
        {{#if currentChat}}
            <div class="chat-window">
                <div class="chat-userbar">
                    <div class="chat-userbar__wrapper">
                            {{{Image type="img" class="chat-userbar__avatar avatar avatar-min" src=currentChat.avatar}}}
                        <span class="chat-userbar__text">{{currentChat.title}}</span>
                    </div>
                    <div class="chat-userbar__info relative">
                        {{{Button id="chat-options-button" class="chat-userbar__options-button" icon="options" onClick=toggleOptionsWindow}}}
                        <div class="chat-options hidden" id="chat-options">
                            <ul class="chat-options__list">
                                <li class="chat-options__item">
                                    {{{Button type="submit" id="chat-options-add-user" class="chat-options__button" icon="addUser" onClick=toggleAddUserModal span="Добавить пользователя" spanClass="chat-options__row-text"}}}
                                </li>
                                <li class="chat-options__item">
                                    {{{Button type="submit" id="chat-options-add-user" class="chat-options__button" icon="deleteUser" onClick=toggleDeleteUserModal span="Удалить пользователя" spanClass="chat-options__row-text"}}}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="chat-messages">
                    <div class="chat-messages__wrapper">
                        {{#each messages}}
                            {{{Message message=this}}}
                        {{/each}}
                    </div>
                </div>
                <div class="action-bar">
                    <div class="action-bar__file relative">
                        {{{Button type="button" id="chat-attach-button" class="action-bar__file-button" icon="attach" onClick=toggleAttachWindow }}}
                        <div class="attach-options hidden" id="attach-options">
                            <ul class="chat-options__list">
                                <li class="chat-options__item">
                                    {{{Button type="button" class="chat-options__button" icon="media" span="Фото или Видео" spanClass="chat-options__row-text"}}}
                                </li>
                                <li class="chat-options__item">
                                    {{{Button type="button" class="chat-options__button" icon="file" span="Файл" spanClass="chat-options__row-text"}}}
                                </li>
                                <li class="chat-options__item">
                                    {{{Button type="button" class="chat-options__button" icon="location" span="Локация" spanClass="chat-options__row-text"}}}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <form class="action-bar__form">
                        <div class="action-bar__textarea">
                            {{{ControlledInput
                                    name="message"
                                    id="message"
                                    ref="message"
                                    class="action-bar__textarea-input"
                                    placeholder="Сообщение..."
                                    errorClass="hidden"
                                    autofocus=true
                                    validationField = "${ValidationField.Message}"
                            }}}
                        </div>
                        <div class="action-bar__send">
                            {{{Button type="submit" id="send-button" class="action-bar__send-button" icon="send" onClick=onSubmit}}}
                        </div>
                    </form>
                </div>
            </div>
        {{else}}
            <span class="chat-container__placeholder"
            >Выберите чат чтобы отправить сообщение</span
            >
        {{/if}}
    </div>
`;
  }
}

export default withRouter(withStore(ChatBox));
