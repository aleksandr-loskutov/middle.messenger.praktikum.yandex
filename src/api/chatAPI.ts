import { BaseAPI } from "./baseAPI";
import {
  ChatDTO,
  CreateChatDTO,
  DeletedChatDTO,
  Token,
  UsersToChatDTO
} from "types/api";

export class ChatAPI extends BaseAPI {
  constructor() {
    super("/chats");
  }

  getChats(): ApiResponse<ChatDTO[]> {
    return this.httpService.get("", {
      headers: { "Content-Type": "application/json" }
    });
  }
  createChat(data: CreateChatDTO): ApiResponse<void> {
    return this.httpService.post("", {
      data,
      headers: { "Content-Type": "application/json" }
    });
  }
  deleteChat(data: { chatId: number }): ApiResponse<DeletedChatDTO> {
    return this.httpService.delete("", {
      data,
      headers: { "Content-Type": "application/json" }
    });
  }
  addUsersToChat(data: UsersToChatDTO): ApiResponse<void> {
    return this.httpService.put("/users", {
      data,
      headers: { "Content-Type": "application/json" }
    });
  }
  removeUsersFromChat(data: UsersToChatDTO): ApiResponse<void> {
    return this.httpService.delete("/users", {
      data,
      headers: { "Content-Type": "application/json" }
    });
  }
  getWsTokenForChat(chatId: number): ApiResponse<Token> {
    return this.httpService.post(`/token/${chatId}`, {
      headers: { "Content-Type": "application/json" }
    });
  }
}
