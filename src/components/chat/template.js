export default `
    {{#if isChatActive}}
        <li class="sidebar__chat-item chat-active">
    {{else}}
        <li class="sidebar__chat-item">
    {{/if}}
        {{#if userAvatar}}
            <img class="chat-item__avatar avatar avatar-normal"  src={{userAvatar}} alt="аватар {{chatName}}."/>
        {{else}}
              <svg
              class="chat-item__avatar avatar avatar-normal"
              width="47"
              height="47"
              viewBox="0 0 47 47"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="23.5" cy="23.5" r="23.5" fill="#EFEFEF" />
            </svg>
        {{/if}} 
            <span class="chat-item__chat-name">{{chatName}}</span>
            <time class="chat-item__message-time" datetime="{{messageTime}}+03:00">{{messageTime}}</time>
            <span class="chat-item__message-text">{{#if userMessage}} Вы: {{/if}} {{messageText}} </span>
            {{#if chatUnreadMessages}}
            <span class="chat-item__message-status">{{chatUnreadMessages}}</span>
            {{/if}}
    </li>
`;
