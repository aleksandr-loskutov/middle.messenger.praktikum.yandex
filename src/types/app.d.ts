import { Store, Router } from "core";
import { APIError, ChatDTO, ChatToken, MessageDTO } from "./api";

declare global {
  export type Nullable<T> = T | null;
  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];
  export type Indexed = { [key: string]: string };
  export type ResponseFormat<T> = { status: number; data: T };
  export type ApiResponse<T> = Promise<ResponseFormat<T> | APIError>;
  export type PropsAny = Record<string, unknown>;

  export type AppState = {
    appIsInited: boolean;
    isLoading: boolean;
    formError: string | null;
    formSuccess: string | null;
    user: User | null;
    chats: ChatDTO[] | null;
    chatMessages: MessageDTO[];
    isChatsLoaded: boolean;
    isChatsLoading: boolean;
    tokens: ChatToken[];
  };

  export type User = {
    id: number;
    login: string;
    firstName: string;
    secondName: string;
    displayName: string;
    avatar: string;
    phone: string;
    email: string;
  };
  export interface Window {
    store: Store<AppState>;
    router: Router;
  }
  export type RequestOptions = {
    headers?: { [key: string]: string };
    timeout?: number;
    method?: string;
    data?: any;
    retries?: number;
  };
  export interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget & { files?: File[] };
  }
}

export {};
