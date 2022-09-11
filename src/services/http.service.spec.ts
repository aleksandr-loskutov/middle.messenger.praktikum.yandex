import { HttpService } from "./http.service";
import { expect } from "chai";
import jsdom from "mocha-jsdom";

describe("HTTPTransport", () => {
  jsdom({ url: "http://localhost" });
  it("GET выполняется успешно", async () => {
    const httpService = new HttpService("/api/get");
    const res = await httpService.get("");
    expect(res).to.have.property("reason");
  });
});
