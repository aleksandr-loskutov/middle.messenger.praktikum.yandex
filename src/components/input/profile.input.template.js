export default `
          <div class="profile-data__row">
            <label class="{{#if labelClass}}{{labelClass}}{{else}}profile-data__label{{/if}}" for="{{id}}">{{label}}</label>
            <input
              type="{{#if type}}{{type}}{{else}}text{{/if}}"
              name="{{name}}"
              id="{{id}}"
              placeholder="{{placeholder}}"
              class="{{#if class}}{{class}}{{else}}profile-data__input{{/if}}"
              value="{{value}}"
              {{#if disabled}}disabled{{/if}}
            />
            {{#if error}}
             <span
              class="profile-data__input-error"
              id="{{errorId}}"
              >{{error}}
            </span>
             {{/if}}
          </div>
`;
