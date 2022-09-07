import { AuthAPI, ChatAPI } from "api";
import type { Dispatch } from "core";
import { transformUser, apiHasError, logger } from "utils";
import {
  LoginDTO as LoginPayload,
  RegisterDTO as RegisterPayload
} from "types/api";
import { setDefaultAvatars } from "utils/helpers";

export const login = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  payload: LoginPayload
) => {
  dispatch({ isLoading: true });
  const api = new AuthAPI();
  const response = await api.login(payload);
  if (apiHasError(response)) {
    dispatch({ isLoading: false, formError: response.reason });
    return;
  }
  const user = await api.getUser();
  dispatch({ isLoading: false, formError: null });
  if (apiHasError(user)) {
    dispatch(logout);
    return;
  }
  const chatApi = new ChatAPI();
  let chats = await chatApi.getChats();
  if (apiHasError(chats)) {
    logger("getChatsApiError", chats);
    chats = [];
  }
  chats = setDefaultAvatars(chats);
  dispatch({ user: transformUser(user), chats });
  window.router.go("/messenger");
};

export const register = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  payload: RegisterPayload
) => {
  dispatch({ isLoading: true });
  const api = new AuthAPI();
  const response = await api.register(payload);
  if (apiHasError(response)) {
    dispatch({ isLoading: false, formError: response.reason });
    return;
  }
  const user = await api.getUser();
  if (apiHasError(user)) {
    dispatch(logout);
    return;
  }
  window.router.go("/messenger");
  dispatch({ user: transformUser(user), isLoading: false, formError: null });
};

export const logout = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true });
  const api: AuthAPI = new AuthAPI();
  await api.logout();
  window.router.go("/");
  dispatch({ isLoading: false, user: null });
};
