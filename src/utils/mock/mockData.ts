export const MOCK = {
  credentials: {
    login: "test",
    password: "test"
  },
  post: {
    id: 1,
    title: "foo",
    body: "bar",
    userId: 3
  },
  template: "<a href=\"/\" class=\"{{#if class}}{{class}}{{else}}link{{/if}}\">{{#if text}}{{text}}{{/if}}</a>",
  templateCompiled: "<a href=\"/\" class=\"link\"></a>",
  templateProps: { text: "test", class: "test-link" },
  templateWithPropsCompiled: "<a href=\"/\" class=\"test-link\">test</a>"
};
