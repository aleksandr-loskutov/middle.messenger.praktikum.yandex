import { Component } from "core";
import { ValidationField, validateData } from "utils/validator";
import { getValuesFromElements } from "utils/dom";
import { ChatProps } from "components/chat/chat";
import { MessageProps } from "components/message/message";
import { User } from "types/user";
import { withRouter, withStore } from "components/hoc";
import {
  toggleOptionsWindow,
  toggleAttachWindow,
  addUserModal,
  deleteUserModal
} from "utils/dom";

export interface CurrentChatProps {
  chatName: string;
  chatAvatar?: string;
  messages?: MessageProps[];
}

interface ChatPageProps {
  chats: ChatProps[];
  currentChat?: CurrentChatProps;
  user: User;
}

export class ChatPage extends Component {
  static componentName = "ChatPage";
  constructor({ chats, currentChat, user, ...rest }: ChatPageProps) {
    super({
      ...rest,
      chats,
      currentChat,
      user,
      toggleOptionsWindow,
      toggleAttachWindow,
      addUserModal,
      deleteUserModal,
      onSendMessage: (e: PointerEvent) => {
        e.preventDefault();
        const messageData = getValuesFromElements.bind(this)("message");
        if (validateData.bind(this)(messageData)) {
          console.log("Сообщение:", messageData);
        }
      },
      onAddUser: (e: PointerEvent) => {
        e.preventDefault();
        const userToAdd = getValuesFromElements.bind(this)("#add-user-name");
        if (validateData.bind(this)(userToAdd)) {
          console.log("Добавлен пользователь:", userToAdd);
        }
      },
      onDeleteUser: (e: PointerEvent) => {
        e.preventDefault();
        const userToDelete =
          getValuesFromElements.bind(this)("#delete-user-name");
        if (validateData.bind(this)(userToDelete)) {
          console.log("Удален пользователь:", userToDelete);
        }
      },
      onProfileLinkClick: () => {
        this.props.router.go("/settings");
      }
    });
  }

  render(): string {
    // language=hbs
    return `
        <main class="main-chat">
            <div class="sidebar">
                {{{Link text="Профиль >" class="sidebar__profile-link" onClick=onProfileLinkClick}}}
                {{{ControlledInput name="search" placeholder="Поиск" type="text" id="search" class="sidebar__search-input"}}}
                <ul class="sidebar__chat-list">
                     {{#each chats}}
                     {{{Chat chat=@this}}}
                     {{/each}}
                </ul>
            </div>
            <div class="chat-container">
                {{#if currentChat}}
                    <div class="chat-window">
                        <div class="chat-userbar">
                            <div class="chat-userbar__wrapper">
                                {{#if currentChat.chatAvatar}}
                                    {{{Image type="img" class="chat-userbar__avatar avatar avatar-min" src=currentChat.chatAvatar}}}
                                {{else}}
                                    {{{Image type="icon" icon="avatar-placeholder-small" }}}
                                {{/if}}
                                <span class="chat-userbar__text">{{currentChat.chatName}}</span>
                            </div>
                            <div class="chat-userbar__info relative">
                                {{{Button id="chat-options-button" class="chat-userbar__options-button" icon="options" onClick=toggleOptionsWindow}}}
                                <div class="chat-options hidden" id="chat-options">
                                    <ul class="chat-options__list">
                                        <li class="chat-options__item">
                                            {{{Button type="submit" id="chat-options-add-user" class="chat-options__button" icon="addUser" onClick=addUserModal span="Добавить пользователя" spanClass="chat-options__row-text"}}}
                                        </li>
                                        <li class="chat-options__item">
                                            {{{Button type="submit" id="chat-options-add-user" class="chat-options__button" icon="deleteUser" onClick=deleteUserModal span="Удалить пользователя" spanClass="chat-options__row-text"}}}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="chat-messages">
                            <div class="chat-messages__wrapper">
                                {{#each currentChat.messages}}
                                    {{{Message message=@this}}}
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
                      validationField = "${ValidationField.Message}"
              }}}
                                </div>
                                <div class="action-bar__send">
                                    {{{Button type="submit" id="send-button" class="action-bar__send-button" icon="send" onClick=onSendMessage}}}
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
            {{{Modal id="modal-add-user"  inputName="user_to_add" title="Добавить пользователя" label="Логин" inputId="add-user-name" type="text" placeholder="ivan" buttonText="Добавить" onSubmit=onAddUser validationField="${ValidationField.UserToAdd}"}}}
            {{{Modal id="modal-delete-user"  inputName="user_to_delete" title="Удалить пользователя"  label="Логин" inputId="delete-user-name" type="text" placeholder="ivan" buttonText="Удалить"  onSubmit=onDeleteUser validationField="${ValidationField.UserToDelete}"}}}
        </main>

    `;
  }
}
export default withRouter(withStore(ChatPage));
