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
  dispatch({ isLoading: true, formSuccess: null, formError: null });
  const api = new AuthAPI();
  const response = await api.login(payload);
  if (apiHasError(response)) {
    dispatch({ isLoading: false, formError: response.reason });
    return;
  }
  const userRes = await api.getUser();
  dispatch({ isLoading: false, formError: null });
  if (apiHasError(userRes)) {
    dispatch(logout);
    return;
  }
  const user = userRes.data;
  const chatApi = new ChatAPI();
  const chatsRes = await chatApi.getChats();
  if (apiHasError(chatsRes)) {
    logger("getChatsApiError", chatsRes);
  }
  const chats = setDefaultAvatars(chatsRes.data || []);
  dispatch({ user: transformUser(user), chats });
  window.router.go("/messenger");
};

export const register = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  payload: RegisterPayload
) => {
  dispatch({ isLoading: true, formSuccess: null, formError: null });
  const api = new AuthAPI();
  const response = await api.register(payload);
  if (apiHasError(response)) {
    dispatch({ isLoading: false, formError: response.reason });
    return;
  }
  const userRes = await api.getUser();
  if (apiHasError(userRes)) {
    dispatch(logout);
    return;
  }
  const user = userRes.data;
  window.router.go("/messenger");
  dispatch({ user: transformUser(user), isLoading: false, formError: null });
};

export const logout = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true, formSuccess: null, formError: null });
  const api: AuthAPI = new AuthAPI();
  await api.logout();
  window.router.go("/");
  dispatch({ isLoading: false, user: null });
};
