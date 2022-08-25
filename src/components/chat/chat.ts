import { Component } from "core";

export interface ChatProps {
  chatName: string;
  userAvatar: string;
  userMessage?: boolean;
  messageText?: string;
  messageTime: string;
  isChatActive: boolean;
  chatUnreadMessages: number;
}

export class Chat extends Component {
  static componentName = "Chat";
  constructor({ chat }: { chat: ChatProps }) {
    super({ ...chat });
  }

  render(): string {
    // language=hbs
    return `
        {{#if isChatActive}}
            <li class="sidebar__chat-item chat-active">
        {{else}}
            <li class="sidebar__chat-item">
        {{/if}}
        {{#if userAvatar}}
                <img class="chat-item__avatar avatar avatar-normal"  src={{userAvatar}} alt="аватар {{chatName}}."/>
        {{else}}

        {{/if}}
            <span class="chat-item__chat-name">{{chatName}}</span>
            <time class="chat-item__message-time" datetime="{{messageTime}}+03:00">{{messageTime}}</time>
            <span class="chat-item__message-text">{{#if userMessage}} Вы: {{/if}} {{messageText}} </span>
        {{#if chatUnreadMessages}}
                <span class="chat-item__message-status">{{chatUnreadMessages}}</span>
        {{/if}}
        </li>
    `;
  }
}
