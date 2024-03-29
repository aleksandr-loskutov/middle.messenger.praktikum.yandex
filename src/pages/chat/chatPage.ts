import { Component } from "core";
import { ValidationField, validateData } from "utils/validator";
import { withRouter, withStore } from "components/hoc";
import { apiHasError, logger, sanitizeString } from "utils";
import { createChat } from "services";
import {
  MODAL_ADD_USER_ID,
  MODAL_CREATE_CHAT_ID,
  MODAL_DELETE_CHAT_ID,
  MODAL_DELETE_USER_ID
} from "utils/consts";
import {
  getValuesFromElements,
  createModalToggler,
  scrollToBottom
} from "utils/dom";
import {
  addUsersToChat,
  removeUsersFromChat,
  searchUserByLogin
} from "services/user.service";
import { connectChats, setReaded } from "services/message.service";
import { ChatDTO, ChatToken, MessageDTO } from "types/api";
import { deleteChat } from "services/chat.service";

const toggleChatModal = createModalToggler(MODAL_CREATE_CHAT_ID);
const toggleAddUserModal = createModalToggler(MODAL_ADD_USER_ID);
const toggleDeleteUserModal = createModalToggler(MODAL_DELETE_USER_ID);
const toggleDeleteChatModal = createModalToggler(MODAL_DELETE_CHAT_ID);

export class ChatPage extends Component {
  static componentName = "ChatPage";
  constructor(props: PropsAny) {
    super({
      ...props,
      toggleChatModal,
      toggleAddUserModal,
      toggleDeleteUserModal,
      toggleDeleteChatModal,
      onSendMessage: (e: PointerEvent) => {
        e.preventDefault();
        const messageData = getValuesFromElements.bind(this)("message");
        messageData.message = sanitizeString(messageData.message);
        if (validateData.bind(this)(messageData)) {
          logger("Сообщение:", messageData);
          const chatId = this.props.idParam;
          const { socket } = this.props.store
            .getState()
            .tokens.find((token: ChatToken) => token.chatId === chatId);
          if (socket) {
            socket.send(
              JSON.stringify({ content: messageData.message, type: "message" })
            );
            //т.к отправка из 2 мест (кнопка и инпут) пока ищем напрямую для упрощения
            const input = document.getElementById(
              "message"
            ) as HTMLInputElement;
            input.value = "";
          } else {
            logger(`Нет сокета для чата ${chatId}`);
          }
        }
      },
      onAddUser: async (e: PointerEvent) => {
        e.preventDefault();
        const userToAdd = getValuesFromElements.bind(this)("#add-user-name");
        if (validateData.bind(this)(userToAdd)) {
          logger("Запрос на добавление пользователя в чат:", userToAdd);
          const userSearchResponse = await searchUserByLogin({
            login: userToAdd.user_to_add
          });

          if (!apiHasError(userSearchResponse)) {
            this.props.store.dispatch(addUsersToChat, {
              users: [userSearchResponse.id],
              chatId: this.props.idParam
            });
          } else {
            this.props.store.dispatch({
              isLoading: false,
              formError: userSearchResponse.reason || "Ошибка, попробуйте позже"
            });
          }
        }
      },
      onDeleteUser: async (e: PointerEvent) => {
        e.preventDefault();
        const userToRemove =
          getValuesFromElements.bind(this)("#delete-user-name");
        if (validateData.bind(this)(userToRemove)) {
          logger("Запрос на удаление пользователя из чата:", userToRemove);
          const userSearchResponse = await searchUserByLogin({
            login: userToRemove.user_to_delete
          });

          if (!apiHasError(userSearchResponse)) {
            this.props.store.dispatch(removeUsersFromChat, {
              users: [userSearchResponse.id],
              chatId: this.props.idParam
            });
          } else {
            this.props.store.dispatch({
              isLoading: false,
              formError: userSearchResponse.reason || "Ошибка, попробуйте позже"
            });
          }
        }
      },
      onProfileLinkClick: () => {
        this.props.router.go("/settings");
      },
      onChatCreateLinkClick: (e: PointerEvent) => {
        toggleChatModal(e);
      },
      onCreateChat: (e: PointerEvent) => {
        e.preventDefault();
        const chatToCreate = getValuesFromElements.bind(this)("#chat-create");
        if (validateData.bind(this)(chatToCreate)) {
          logger("Запрос на создание чата:", chatToCreate);
          this.props.store.dispatch(createChat.bind(this), {
            title: chatToCreate.chat_title
          });
        }
      },
      onDeleteChat: (e: PointerEvent) => {
        e.preventDefault();
        this.props.store.dispatch(deleteChat, {
          chatId: this.props.idParam
        });
      }
    });

    this.setProps({
      chats: () =>
        this.props.store.getState().chats.map((chat: ChatDTO) => {
          return {
            ...chat,
            link: () => {
              this.props.router.go(`/messenger/${chat.id}`);
              this.props.store.dispatch(setReaded.bind(this));
              scrollToBottom();
            },
            isChatActive: () => chat.id === this.props.idParam,
            connect: () => {
              this.props.store.dispatch(connectChats.bind(this));
            },
            currentUser: this.props.store.getState().user
          };
        }),
      currentChat: () => {
        return this.props.store
          .getState()
          .chats.find((chat: ChatDTO) => chat.id === this.props.idParam);
      },
      formError: () => this.props.store.getState().formError,
      isLoading: () => this.props.store.getState().isLoading,
      isChatsLoading: () =>
        this.props.store.getState().isLoading ||
        this.props.store.getState().isChatsLoading,
      messages: () => {
        const chatId = this.props.idParam;
        const messages = this.props.store.getState().chatMessages;
        return chatId > 0 && messages[chatId]?.length > 0
          ? messages[chatId]
              .map((message: MessageDTO) => {
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

  render(): string {
    //language=hbs
    return `
        <main class="main-chat relative">
            {{#if isChatsLoading}}{{{Spinner type="image"}}}{{/if}}
            <div class="sidebar">
                    {{{Button  type="button" text="профиль"  class="button button-gray" onClick=onProfileLinkClick disabled=isLoading}}}
                {{{ControlledInput name="search" placeholder="Поиск" type="text" id="search" class="sidebar__search-input"}}}
                <ul class="sidebar__chat-list">
                     {{#each chats}}
                     {{{Chat chat=this onClick=this.link currentUser=this.currentUser}}}
                     {{/each}}
                </ul>
                {{{Button type="button" text="создать чат" class="button"  onClick=onChatCreateLinkClick disabled=isLoading}}}
            </div>
            <div class="chat-container">
                {{#if currentChat}}
                    <div class="chat-window">
                        <div class="chat-userbar">
                            <div class="chat-userbar__wrapper">
                               {{#with currentChat as | currentChat |}}
                                    {{{Image type="img" class="chat-userbar__avatar avatar avatar-min" src=currentChat.avatar}}}
                                    <span class="chat-userbar__text">{{currentChat.title}}</span>
                               {{/with}}
                            </div>
                            <div class="chat-userbar__info relative">
                                {{{Button id="chat-options-button" class="chat-userbar__options-button" icon="options"}}}
                                <div class="chat-options" id="chat-options">
                                    <ul class="chat-options__list">
                                        <li class="chat-options__item">
                                            {{{Button type="submit" class="chat-options__button" icon="addUser" onClick=toggleAddUserModal span="Добавить пользователя" spanClass="chat-options__row-text"}}}
                                        </li>
                                        <li class="chat-options__item">
                                            {{{Button type="submit" class="chat-options__button" icon="deleteUser" onClick=toggleDeleteUserModal span="Удалить пользователя" spanClass="chat-options__row-text"}}}
                                        </li>
                                        <li class="chat-options__item">
                                            {{{Button type="submit" class="chat-options__button" icon="deleteUser" onClick=toggleDeleteChatModal span="Удалить чат" spanClass="chat-options__row-text"}}}
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
                                {{{Button type="button" id="chat-attach-button" class="action-bar__file-button" icon="attach" }}}
                                <div class="attach-options" id="attach-options">
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
            {{{Modal id='${MODAL_CREATE_CHAT_ID}'  toggler=toggleChatModal  inputName="chat_title" title="Создать чат" label="Название чата" inputId="chat-create" type="text" placeholder="супер чат" buttonText="Создать" onSubmit=onCreateChat validationField="${ValidationField.ChatTitle}"}}}
            {{{Modal id='${MODAL_ADD_USER_ID}'  toggler=toggleAddUserModal inputName="user_to_add" title="Добавить пользователя" label="Логин" inputId="add-user-name" type="text" placeholder="ivan" buttonText="Добавить" onSubmit=onAddUser validationField="${ValidationField.UserToAdd}"}}}
            {{{Modal id='${MODAL_DELETE_USER_ID}'  toggler=toggleDeleteUserModal inputName="user_to_delete" title="Удалить пользователя"  label="Логин" inputId="delete-user-name" type="text" placeholder="ivan" buttonText="Удалить"  onSubmit=onDeleteUser validationField="${ValidationField.UserToDelete}"}}}
            {{{Modal id='${MODAL_DELETE_CHAT_ID}'  toggler=toggleDeleteChatModal inputName="chat_to_delete" title="Удалить чат?"  confirmMode=true label="Чат" inputId="delete-chat" type="text" placeholder="ivan" buttonText="Удалить"  onSubmit=onDeleteChat}}}
        </main>

    `;
  }
}

export default withRouter(withStore(ChatPage));
