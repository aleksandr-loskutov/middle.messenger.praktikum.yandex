import "./button.scss";
export default `
    <button  id="{{id}}" type="{{#if type}}{{type}}{{else}}submit{{/if}}" class="{{#if class}}{{class}}{{else}}button{{/if}}">{{text}}</button>
`;
