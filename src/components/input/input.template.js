export default `
{{#if label}}<label for="{{id}}" class="{{#if labelClass}}{{labelClass}}{{else}}form__label{{/if}}">{{label}}</label>{{/if}}
<input name="{{name}}" type="{{#if type}}{{type}}{{else}}text{{/if}}" class="{{#if class}}{{class}}{{else}}form-input{{/if}}" value="{{value}}" id="{{id}}" placeholder="{{placeholder}}" {{#if disabled}}disabled{{/if}}/>
`;
