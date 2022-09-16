import { Component } from "core";
import { ChatDTO } from "types/api";
import { displayDate } from "utils/helpers";
import { scrollToBottom } from "utils/dom";

type ChatProps = {
  chat: ChatDTO;
  onClick?: () => void;
  currentUser: User;
};

export class Chat extends Component {
  static componentName = "Chat";
  constructor({ chat, onClick, currentUser, ...rest }: ChatProps) {
    super({
      events: { click: onClick },
      ...chat,
      last_message: chat.last_message
        ? {
            ...chat.last_message,
            simpleDate: displayDate(chat.last_message.time, true),
            content:
              chat.last_message.user?.login === currentUser.login ||
              chat.last_message.isMine
                ? `Вы: ${chat.last_message.content.replace("Вы: ", "")}`
                : chat.last_message.content
          }
        : null,
      ...rest
    });
  }
  componentDidMount() {
    this.props.connect();
    scrollToBottom();
  }
  render(): string {
    // language=hbs
    return `
            <li class="sidebar__chat-item {{#if isChatActive}}chat-active{{/if}}" >
            <img class="chat-item__avatar avatar avatar-normal"  src={{avatar}} alt="аватар {{title}}."/>
            <span class="chat-item__chat-name">{{title}}</span>
        {{#if last_message}}
            <time class="chat-item__message-time" datetime="{{last_message.time}}">{{last_message.simpleDate}}</time>
            <span class="chat-item__message-text"> {{last_message.content}} </span>
        {{/if}}
        {{#if unread_count}}
            {{#if isChatActive}}{{else}}<span class="chat-item__message-status">{{unread_count}}</span>{{/if}}
        {{/if}}
        </li>
    `;
  }
}
