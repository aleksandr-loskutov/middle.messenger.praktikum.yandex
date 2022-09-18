import { ChatAPI, UserAPI } from "api";
import type { Dispatch } from "core";
import { transformUser, apiHasError, logger } from "utils";
import {
  APIError,
  ByLoginDTO,
  PasswordsDTO,
  UserDTO,
  UsersToChatDTO,
  UserUpdateProfileDTO
} from "types/api";
import { fileToFormData } from "utils";

export const updateUserData = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  payload: UserUpdateProfileDTO
) => {
  dispatch({ isLoading: true, formSuccess: null });
  const api = new UserAPI();
  const response = await api.updateUserData(payload);
  if (apiHasError(response)) {
    dispatch({ isLoading: false, formError: response.reason });
    return;
  }
  const user = response?.data || {};
  dispatch({
    isLoading: false,
    formError: null,
    formSuccess: "Данные успешно обновлены",
    user: transformUser(user)
  });
};

export const updateUserPassword = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  payload: PasswordsDTO
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

export const updateUserAvatar = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  payload: File
) => {
  if (state.isLoading) return;
  dispatch({ isLoading: true, formSuccess: null });
  const api = new UserAPI();
  const formData = fileToFormData(payload);
  const response = await api.updateUserAvatar(formData);
  if (apiHasError(response)) {
    dispatch({ isLoading: false, formError: response.reason });
    return;
  }

  const avatar = response?.data?.avatar;
  const { user } = state;
  if (avatar && user) {
    dispatch({
      isLoading: false,
      formError: null,
      formSuccess: "Аватар успешно обновлен",
      user: {
        ...user,
        avatar
      }
    });
  } else {
    dispatch({
      isLoading: false
    });
  }
};

export const searchUserByLogin = async (
  payload: ByLoginDTO
): Promise<UserDTO | APIError> => {
  const api = new UserAPI();
  const response = await api.searchUsers(payload);
  if (Array.isArray(response.data)) {
    if (response.data.length === 0) {
      return { reason: "Пользователь не найден" };
    }
    const { login } = payload;
    const user = response?.data?.find(
      (user) => user.login.toLowerCase() === login.toLowerCase()
    );
    if (user) {
      return user;
    }
    return { reason: "Пользователь не найден" };
  }

  return { reason: "Пользователь не найден" };
};

export const addUsersToChat = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  payload: { users: number[]; chatId: number }
) => {
  dispatch({ isLoading: true, formSuccess: null });
  const chatAPI = new ChatAPI();
  const response = await chatAPI.addUsersToChat(payload);
  if (apiHasError(response)) {
    logger("addUsersToChat", response);
    dispatch({ isLoading: false, formError: response.reason });
    return;
  }
  dispatch({
    isLoading: false,
    formError: null,
    formSuccess: "пользователь/ли добавлен/ы в чат"
  });
};

export const removeUsersFromChat = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  payload: UsersToChatDTO
) => {
  dispatch({ isLoading: true, formSuccess: null });
  const chatAPI = new ChatAPI();
  const response = await chatAPI.removeUsersFromChat(payload);
  if (apiHasError(response)) {
    logger("removeUsersFromChat", response);
    dispatch({ isLoading: false, formError: response.reason });
    return;
  }
  dispatch({
    isLoading: false,
    formError: null,
    formSuccess: "пользователь/ли удален/ы"
  });
};
