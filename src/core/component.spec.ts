import { expect } from "chai";
import { Component } from "core/component";
import { jsDOMInit } from "utils/dom/jsdom";
import { MOCK } from "utils/mock/mockData";

type TestLinkProps = {
  text?: string;
  class?: string;
};

describe("Component", () => {
  jsDOMInit();
  let isRendered = false;

  class TestLink extends Component {
    constructor(props: TestLinkProps) {
      super(props);
    }

    render() {
      isRendered = true;
      return MOCK.template;
    }
  }

  it("Create component", () => {
    // @ts-expect-error "unused" variable
    const link = new TestLink({});
    expect(isRendered).to.be.equal(true);
  });

  it("Create component with props", () => {
    isRendered = false;
    const link = new TestLink({ text: "test", class: "test-link" });
    expect(isRendered).to.be.equal(true);
    expect(link.getContent().innerHTML.includes("test")).to.be.equal(true);
    expect(link.getContent().classList.contains("test-link")).to.be.equal(true);
  });

  it("Component props should update", () => {
    const link = new TestLink({ text: "test", class: "test-link" });
    isRendered = false;
    link.setProps({
      class: "link-new"
    });
    expect(isRendered).to.be.equal(true);
    expect(link.getContent().classList.contains("link-new")).to.be.equal(true);
  });
});
