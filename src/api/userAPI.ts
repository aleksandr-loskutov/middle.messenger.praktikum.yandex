import { BaseAPI } from "./baseAPI";
import { LoginData, RegisterData } from "types/api";

export class UserAPI extends BaseAPI {
  constructor() {
    super("/user");
  }

  updateUserData(data: LoginData): Promise<unknown> {
    return this.httpService.put("/profile", {
      data,
      headers: { "Content-Type": "application/json" }
    });
  }
  updateUserPassword(data: RegisterData): Promise<unknown> {
    return this.httpService.put("/password", {
      data,
      headers: { "Content-Type": "application/json" }
    });
  }
  updateUserAvatar(data: RegisterData): Promise<unknown> {
    return this.httpService.put("/profile/avatar", {
      data,
      headers: { "Content-Type": "application/json" }
    });
  }
}
