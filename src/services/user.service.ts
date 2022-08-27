import { ChatAPI, UserAPI } from "api";
import type { Dispatch } from "core";
import { transformUser, apiHasError } from "utils";
import { RegisterDTO as UserDataPayload, UserDTO } from "types/api";

export const updateUserData = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  payload: UserDataPayload
) => {
  dispatch({ isLoading: true, formSuccess: null });
  const api = new UserAPI();
  const response = await api.updateUserData(payload);
  if (apiHasError(response)) {
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
    dispatch({ isLoading: false, formError: response.reason });
    return;
  }
  dispatch({
    isLoading: false,
    formError: null,
    formSuccess: "Пароль успешно обновлен"
  });
};

export const searchAndAddOrDeleteUserFromChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  payload: { login: string; chatId: number; mode: "add" | "remove" }
) => {
  dispatch({ isLoading: true, formSuccess: null });
  const api = new UserAPI();
  const response = (await api.searchUsers(payload)) as UserDTO[];

  if (apiHasError(response)) {
    dispatch({ isLoading: false, formError: response.reason });
    return;
  } else if (response.length === 0) {
    dispatch({ isLoading: false, formError: "Пользователь не найден" });
    return;
  }
  const { chatId, login, mode } = payload;
  const foundUser = response.find((user) => user.login === login);
  if (foundUser) {
    const chatAPI = new ChatAPI();
    const payload = {
      users: [foundUser.id],
      chatId
    };
    let response;
    if (mode === "add") {
      response = await chatAPI.addUsersToChat(payload);
    } else if (mode === "remove") {
      response = await chatAPI.removeUsersFromChat(payload);
    }
    if (apiHasError(response)) {
      console.log(response.reason);
      dispatch({ isLoading: false, formError: response.reason });
      return;
    }
    dispatch({
      isLoading: false,
      formError: null,
      formSuccess: `${foundUser.login} ${
        mode === "add" ? "добавлен" : "удален"
      } `
    });
  } else {
    dispatch({ isLoading: false, formError: "Пользователь не найден" });
  }
};
