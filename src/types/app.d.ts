import { Store, Router } from "core";

declare global {
  export type Nullable<T> = T | null;
  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];
  export type Indexed = { [key: string]: any };

  export type AppState = {
    appIsInited: boolean;
    isLoading: boolean;
    formError: string | null;
    formSuccess: string | null;
    user: User | null;
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
}

export {};
