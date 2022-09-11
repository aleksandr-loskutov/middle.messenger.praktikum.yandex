import { expect } from "chai";
import { Store } from "../core";

describe("core/Store", () => {
  it("should set state", () => {
    const store = new Store({});
    store.set({ userId: 111 });
    expect(store.getState()).equal({ userId: 111 });
  });
});
