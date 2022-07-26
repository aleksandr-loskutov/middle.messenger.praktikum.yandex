import "./message.scss";
export default `
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
