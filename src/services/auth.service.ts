import { AuthAPI } from "api";
import type { Dispatch } from "core";
import { transformUser, apiHasError } from "utils";
import {
  LoginDTO as LoginPayload,
  RegisterDTO as RegisterPayload
} from "types/api";

export const login = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
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
  if (apiHasError(response)) {
    dispatch(logout);
    return;
  }
  dispatch({ user: transformUser(user) });
  window.router.go("/messenger");
};

export const register = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
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
  dispatch({ isLoading: false, formError: null });
  if (apiHasError(response)) {
    dispatch(logout);
    return;
  }
  dispatch({ user: transformUser(user) });
  window.router.go("/messenger");
};

export const logout = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true });
  const api: AuthAPI = new AuthAPI();
  await api.logout();
  dispatch({ isLoading: false, user: null });
  window.router.go("/");
};
