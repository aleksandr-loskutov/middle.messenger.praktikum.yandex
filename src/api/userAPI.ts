import { BaseAPI } from "./baseAPI";

export class UserAPI extends BaseAPI {
  constructor() {
    super("/user");
  }

  updateUserData(data): Promise<unknown> {
    return this.httpService.put("/profile", {
      data,
      headers: { "Content-Type": "application/json" }
    });
  }
  updateUserPassword(data): Promise<unknown> {
    return this.httpService.put("/password", {
      data,
      headers: { "Content-Type": "application/json" }
    });
  }
  updateUserAvatar(data): Promise<unknown> {
    return this.httpService.put("/profile/avatar", {
      data,
      headers: { "Content-Type": "application/json" }
    });
  }
  searchUsers(data): Promise<unknown> {
    return this.httpService.post("/search", {
      data,
      headers: { "Content-Type": "application/json" }
    });
  }
}
