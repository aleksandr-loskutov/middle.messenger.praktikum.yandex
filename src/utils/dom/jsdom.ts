import { JSDOM } from "jsdom";

export function jsDOMInit(options = {}) {
  const dom = new JSDOM(
    "<div id=\"root\"><div>",
    Object.assign(
      {
        url: "http://localhost"
      },
      options
    )
  );
  const { window } = dom;
  const { document } = window;
  // @ts-expect-error Attempt to assign to const or readonly variable
  global.window = window;
  // @ts-expect-error Attempt to assign to const or readonly variable
  global.document = document;
  global.XMLHttpRequest = window.XMLHttpRequest;
  global.FormData = window.FormData;
  global.Node = window.Node;
  // @ts-expect-error Attempt to assign to const or readonly variable
  global.navigator = {
    userAgent: "node.js"
  };
  return { window, document };
}
