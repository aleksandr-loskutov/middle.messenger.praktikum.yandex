import { BaseAPI } from "./baseAPI";
import {
  ByLoginDTO,
  PasswordsDTO,
  UserDTO,
  UserUpdateProfileDTO
} from "types/api";

export class UserAPI extends BaseAPI {
  constructor() {
    super("/user");
  }

  updateUserData(data: UserUpdateProfileDTO): ApiResponse<UserDTO> {
    return this.httpService.put("/profile", {
      data,
      headers: { "Content-Type": "application/json" }
    });
  }
  updateUserPassword(data: PasswordsDTO): ApiResponse<void> {
    return this.httpService.put("/password", {
      data,
      headers: { "Content-Type": "application/json" }
    });
  }
  updateUserAvatar(data: FormData): ApiResponse<UserDTO> {
    return this.httpService.put("/profile/avatar", {
      data
    });
  }
  searchUsers(data: ByLoginDTO): ApiResponse<UserDTO[]> {
    return this.httpService.post("/search", {
      data,
      headers: { "Content-Type": "application/json" }
    });
  }
}
