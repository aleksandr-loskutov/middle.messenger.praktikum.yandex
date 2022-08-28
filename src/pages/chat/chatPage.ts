import { Component } from "core";
import { ValidationField, validateData } from "utils/validator";
import { withRouter, withStore } from "components/hoc";
import { logger, sanitizeHTML } from "utils";
import { createChat, searchAndAddOrDeleteUserFromChat } from "services";
import { connectToChat } from "services/message.service";
import {
  getValuesFromElements,
  toggleAttachWindow,
  createModalToggler,
  toggleOptionsWindow
} from "utils/dom";

const toggleChatModal = createModalToggler("modal-create-chat");
const toggleAddUserModal = createModalToggler("modal-add-user");
const toggleDeleteUserModal = createModalToggler("modal-delete-user");

export class ChatPage extends Component {
  static componentName = "ChatPage";
  constructor(props) {
    super({
      ...props,
      toggleChatModal,
      toggleAttachWindow,
      toggleAddUserModal,
      toggleDeleteUserModal,
      toggleOptionsWindow,
      onSendMessage: (e: PointerEvent) => {
        e.preventDefault();
        const messageData = getValuesFromElements.bind(this)("message");
        messageData.message = sanitizeHTML(messageData.message.trim());
        if (validateData.bind(this)(messageData)) {
          logger("Сообщение:", messageData);
          const { socket } = this.props;
          if (socket) {
            socket.send(
              JSON.stringify({ content: messageData.message, type: "message" })
            );
          }
          //т.к отправка из 2 мест (кнопка и инпут) пока ищем напрямую для упрощения
          const input = document.getElementById("message") as HTMLInputElement;
          input.value = "";
        }
      },
      onAddUser: (e: PointerEvent) => {
        e.preventDefault();
        const userToAdd = getValuesFromElements.bind(this)("#add-user-name");
        if (validateData.bind(this)(userToAdd)) {
          logger("Запрос на добавление пользователя в чат:", userToAdd);
          this.props.store.dispatch(searchAndAddOrDeleteUserFromChat, {
            login: userToAdd.user_to_add,
            chatId: this.props.idParam,
            mode: "add"
          });
        }
      },
      onDeleteUser: (e: PointerEvent) => {
        e.preventDefault();
        const userToRemove =
          getValuesFromElements.bind(this)("#delete-user-name");
        if (validateData.bind(this)(userToRemove)) {
          logger("Запрос на удаление пользователя из чата:", userToRemove);
          this.props.store.dispatch(searchAndAddOrDeleteUserFromChat, {
            login: userToRemove.user_to_delete,
            chatId: this.props.idParam,
            mode: "remove"
          });
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
          this.props.store.dispatch(createChat, {
            title: chatToCreate.chat_title
          });
        }
      }
    });
    this.setProps({
      chats: () =>
        this.props.store.getState().chats.map((chat) => {
          return {
            ...chat,
            link: () => {
              this.props.router.go(`/messenger/${chat.id}`);
              logger(`Подключение к чату ${chat.id}`);
              this.props.store.dispatch(connectToChat.bind(this));
            },
            isChatActive: () => chat.id === this.props.idParam
          };
        }),
      formError: () => this.props.store.getState().formError,
      isLoading: () => this.props.store.getState().isLoading,
      idParam: () => this.props.idParam
    });
  }

  render(): string {
    //language=hbs
    return `
        <main class="main-chat">
            <div class="sidebar">
                <div class="sidebar__links">
                    {{{Link text="Создать чат +" class="sidebar__profile-link" onClick=onChatCreateLinkClick}}}
                    {{{Link text="Профиль >" class="sidebar__profile-link" onClick=onProfileLinkClick}}}
                </div>
                {{{ControlledInput name="search" placeholder="Поиск" type="text" id="search" class="sidebar__search-input"}}}
                <ul class="sidebar__chat-list">
                     {{#each chats}}
                     {{{Chat chat=this onClick=this.link}}}
                     {{/each}}
                </ul>
            </div>
            {{{ChatBox chat=currentChat idParam=idParam onSubmit=onSendMessage toggleAddUserModal=toggleAddUserModal toggleDeleteUserModal=toggleDeleteUserModal toggleAttachWindow=toggleAttachWindow toggleOptionsWindow=toggleOptionsWindow}}}
            {{{Modal id="modal-create-chat" toggler=toggleChatModal  inputName="chat_title" title="Создать чат" label="Название чата" inputId="chat-create" type="text" placeholder="супер чат" buttonText="Создать" onSubmit=onCreateChat validationField="${ValidationField.ChatTitle}"}}}
            {{{Modal id="modal-add-user" toggler=toggleAddUserModal inputName="user_to_add" title="Добавить пользователя" label="Логин" inputId="add-user-name" type="text" placeholder="ivan" buttonText="Добавить" onSubmit=onAddUser validationField="${ValidationField.UserToAdd}"}}}
            {{{Modal id="modal-delete-user" toggler=toggleDeleteUserModal inputName="user_to_delete" title="Удалить пользователя"  label="Логин" inputId="delete-user-name" type="text" placeholder="ivan" buttonText="Удалить"  onSubmit=onDeleteUser validationField="${ValidationField.UserToDelete}"}}}
        </main>

    `;
  }
}
export default withRouter(withStore(ChatPage));
