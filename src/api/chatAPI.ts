import { BaseAPI } from "./baseAPI";
import { CreateChatDTO } from "../types/api";

export class ChatAPI extends BaseAPI {
  constructor() {
    super("/chats");
  }

  getChats(): Promise<unknown> {
    return this.httpService.get("", {
      headers: { "Content-Type": "application/json" }
    });
  }

  createChat(data: CreateChatDTO): Promise<unknown> {
    return this.httpService.post("", {
      data,
      headers: { "Content-Type": "application/json" }
    });
  }
  addUsersToChat(data): Promise<unknown> {
    return this.httpService.put("/users", {
      data,
      headers: { "Content-Type": "application/json" }
    });
  }
  removeUsersFromChat(data): Promise<unknown> {
    return this.httpService.delete("/users", {
      data,
      headers: { "Content-Type": "application/json" }
    });
  }
}
