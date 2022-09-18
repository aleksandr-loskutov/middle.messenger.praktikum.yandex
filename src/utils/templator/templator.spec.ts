import { expect } from "chai";
import { jsDOMInit } from "utils/dom/jsdom";
import render from "core/render";
import { Templator } from "./templator";
import { MOCK } from "utils/mock/mockData";

describe("Templator & render", () => {
  const { document } = jsDOMInit();
  const template = Templator(MOCK.template) as HandlebarsTemplateDelegate;
  const createElementFromHtmlString = (htmlString: string) => {
    const div = document.createElement("div");
    div.innerHTML = htmlString.trim();
    return div.firstChild;
  };

  it("Template should compile proper html", () => {
    expect(template({})).to.be.equal(MOCK.templateCompiled);
  });

  it("Template should take props and compile proper html", () => {
    expect(template({ ...MOCK.templateProps })).to.be.equal(
      MOCK.templateWithPropsCompiled
    );
  });

  it("Render should render", () => {
    // @ts-expect-error We actually don't need real component here for testing purposes
    render({ element: createElementFromHtmlString(template({})) });
    const link = document.body.querySelector("a");
    expect(link?.className).to.equal("link");
  });
});
