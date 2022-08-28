import { Component } from "core";
import "./message.scss";
import { displayDate } from "utils/helpers";

export interface MessageProps {
  id: number;
  content?: string;
  time: string;
  isText?: boolean;
  isMine?: boolean;
  isSent?: boolean;
  is_read?: boolean;
  image?: string;
}

export class Message extends Component {
  static componentName = "Message";
  constructor({ message, ...rest }: { message: MessageProps }) {
    super({
      ...rest,
      ...message,

      isText: message.type === "message",
      simpleDate: displayDate(message.time)
    });
  }

  // language=hbs
  render(): string {
    return `
      <div class="chat-message {{#if isText}}message{{else}}image{{/if}}-{{#if isMine}}sent{{else}}received{{/if}}">
      {{#if content}}
        <span class="chat-message__text">{{ content }}</span>
        <span class="chat-message__status">{{#if isMine}}✔{{#if is_read}}✔{{/if}}{{/if}}</span>
        <time class="{{#if isMine}} chat-message__date {{else}} chat-message__received-date {{/if}}" datetime="{{time}}">
            {{simpleDate}} </time>
       {{/if}}
       {{#if image}}
        <div class="chat-message__image-wrapper">
            <img src="{{image}}" class="chat-message__image" alt="изображение из чата."/>
            <time class="chat-message__received-image-date" datetime="{{time}}">{{simpleDate}}</time>
        </div>
       {{/if}}
      </div>
`;
  }
}
