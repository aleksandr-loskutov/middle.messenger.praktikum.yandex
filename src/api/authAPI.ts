import { BaseAPI } from "./baseAPI";
import { IdDTO, LoginDTO, RegisterDTO, UserDTO } from "types/api";

export class AuthAPI extends BaseAPI {
  constructor() {
    super("/auth");
  }

  login(data: LoginDTO): ApiResponse<void> {
    return this.httpService.post("/signin", {
      data,
      headers: { "Content-Type": "application/json" }
    });
  }
  register(data: RegisterDTO): ApiResponse<IdDTO> {
    return this.httpService.post("/signup", {
      data,
      headers: { "Content-Type": "application/json" }
    });
  }
  getUser(): ApiResponse<UserDTO> {
    return this.httpService.get("/user");
  }
  logout(): ApiResponse<void> {
    return this.httpService.post("/logout");
  }
}
