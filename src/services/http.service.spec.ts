import { HttpService } from "./http.service";
import { expect } from "chai";
import { jsDOMInit } from "utils/dom/jsdom";
import { compareObjects } from "utils/helpers";
import { MOCK } from "utils/mock/mockData";

const headers = { "Content-Type": "application/json" };
describe("HTTPTransport", () => {
  jsDOMInit();

  it("GET", async () => {
    const httpService = new HttpService(
      "https://jsonplaceholder.typicode.com/posts/"
    );
    const res = await httpService.get("");
    expect(res).to.have.property("status").and.equal(200);
  });

  it("POST", async () => {
    const httpService = new HttpService("/auth/signin");
    const res = await httpService.post("", { data: MOCK.credentials, headers });
    expect(res).to.have.property("status").and.equal(401);
  });

  it("PUT", async () => {
    const httpService = new HttpService(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    const res = await httpService.put("", { data: MOCK.post, headers });
    expect(
      compareObjects(res, { data: { ...MOCK.post }, status: 200 })
    ).to.be.equal(true);
  });

  it("DELETE", async () => {
    const httpService = new HttpService(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    const res = await httpService.delete("");
    expect(res).to.have.property("status").and.equal(200);
  });
});
