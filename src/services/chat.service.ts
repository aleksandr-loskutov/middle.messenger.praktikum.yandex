import { ChatAPI } from "api";
import type { Dispatch } from "core";
import { apiHasError, logger } from "utils";
import { ChatDTO, CreateChatDTO } from "types/api";
import { setDefaultAvatars } from "utils/helpers";

export const getChats = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true });
  const api = new ChatAPI();
  const response = await api.getChats();
  if (apiHasError(response)) {
    logger("getChatsApiError", response);
    dispatch({ isLoading: false });
    return;
  }

  dispatch({
    isLoading: false,
    chats: response as ChatDTO[]
  });
};

export const createChat = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  data: CreateChatDTO
) => {
  dispatch({ isLoading: true, formSuccess: null });
  const api = new ChatAPI();
  const response = await api.createChat(data);
  if (apiHasError(response)) {
    logger("createChatApiError", response);
    dispatch({ isLoading: false, formError: response.reason });
    return;
  }
  const chats = await api.getChats();
  if (apiHasError(chats)) {
    logger("getChatsApiError", chats);
    dispatch({ isLoading: false, formError: chats.reason });
    return;
  }
  dispatch({
    isLoading: false,
    formError: null,
    formSuccess: "Чат успешно создан",
    chats: setDefaultAvatars(chats)
  });
};
