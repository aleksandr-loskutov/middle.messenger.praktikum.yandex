import { BaseAPI } from "./baseAPI";
import { LoginDTO, RegisterDTO } from "types/api";

export class AuthAPI extends BaseAPI {
  constructor() {
    super("/auth");
  }

  login(data: LoginDTO): Promise<unknown> {
    return this.httpService.post("/signin", {
      data,
      headers: { "Content-Type": "application/json" }
    });
  }
  register(data: RegisterDTO): Promise<unknown> {
    return this.httpService.post("/signup", {
      data,
      headers: { "Content-Type": "application/json" }
    });
  }
  getUser(): Promise<unknown> {
    return this.httpService.get("/user");
  }
  logout(): Promise<unknown> {
    return this.httpService.post("/logout");
  }
}
