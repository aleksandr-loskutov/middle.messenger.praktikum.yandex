import { UserAPI } from "api";
import type { Dispatch } from "core";
import { transformUser, apiHasError } from "utils";
import { RegisterData as UserDataPayload } from "types/api";

export const updateUserData = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  payload: UserDataPayload
) => {
  dispatch({ isLoading: true, formSuccess: null });
  const api = new UserAPI();
  const response = await api.updateUserData(payload);
  if (apiHasError(response)) {
    console.log("apiHasError", response);
    dispatch({ isLoading: false, formError: response.reason });
    return;
  }
  dispatch({
    isLoading: false,
    formError: null,
    formSuccess: "Данные успешно обновлены",
    user: transformUser(response)
  });
};
export const updateUserPassword = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  payload: UserDataPayload
) => {
  dispatch({ isLoading: true, formSuccess: null });
  const api = new UserAPI();
  const response = await api.updateUserPassword(payload);
  if (apiHasError(response)) {
    console.log("apiHasError", response);
    dispatch({ isLoading: false, formError: response.reason });
    return;
  }
  dispatch({
    isLoading: false,
    formError: null,
    formSuccess: "Пароль успешно обновлен"
  });
};
