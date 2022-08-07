import Component from "core/component";
import "./message.scss";

export interface MessageProps {
  id: number;
  messageText?: string;
  messageTime: string;
  isText?: boolean;
  owner?: boolean;
  isSent?: boolean;
  isViewed?: boolean;
  image?: string;
}

export class Message extends Component {
  static componentName = "Message";
  constructor({ message, ...rest }: { message: MessageProps }) {
    super({ ...rest, ...message });
  }

  // language=hbs
  render(): string {
    return `
      <div class="chat-message {{#if isText}}message{{else}}image{{/if}}-{{#if owner}}sent{{else}}received{{/if}}">
      {{#if messageText}}
        <span class="chat-message__text">{{ messageText }}</span>
        <span class="chat-message__status">{{#if owner}}{{#if isSent}}✔{{#if isViewed}}✔{{/if}}{{/if}}{{/if}}</span>
        <span class="{{#if owner}} chat-message__date {{else}} chat-message__received-date {{/if}}"> {{ messageTime }} </span>
       {{/if}}
       {{#if image}}
        <div class="chat-message__image-wrapper">
            <img src="{{image}}" class="chat-message__image" alt="изображение из чата."/>
            <span class="chat-message__received-image-date">{{ messageTime }}</span>
        </div>
       {{/if}}
      </div>
`;
  }
}
