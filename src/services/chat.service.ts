import { ChatAPI } from "api";
import type { Dispatch } from "core";
import { apiHasError, logger } from "utils";
import { CreateChatDTO } from "types/api";
import { setDefaultAvatars } from "utils/helpers";
import { connectOneChat } from "services/message.service";

export const getChats = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true, formSuccess: null, formError: null });
  const api = new ChatAPI();
  const response = await api.getChats();
  if (apiHasError(response)) {
    logger("getChatsApiError", response);
    dispatch({ isLoading: false });
    return;
  }
  const chats = setDefaultAvatars(response.data || []);
  dispatch({
    isLoading: false,
    chats
  });
};

export async function createChat(
  dispatch: Dispatch<AppState>,
  _state: AppState,
  data: CreateChatDTO
) {
  dispatch({
    isLoading: true,
    isChatsLoading: true,
    formSuccess: null,
    formError: null
  });
  const api = new ChatAPI();
  const response = await api.createChat(data);
  if (apiHasError(response)) {
    logger("createChatApiError", response);
    dispatch({
      isLoading: false,
      isChatsLoading: false,
      formError: response.reason
    });
    return;
  }

  const chatsRes = await api.getChats();
  if (apiHasError(chatsRes)) {
    logger("getChatsApiError", chatsRes);
    dispatch({
      isLoading: false,
      isChatsLoading: false,
      formError: chatsRes.reason
    });
    return;
  }

  const newChatId = response.data?.id;
  if (newChatId) {
    window.router.go(`/messenger/${newChatId}`);
  }

  dispatch(connectOneChat.bind(this), {
    chatId: newChatId,
    chats: chatsRes.data
  });
}

export const deleteChat = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  data: { chatId: number }
) => {
  const { chatId } = data;
  if (!chatId) return;
  dispatch({ isLoading: true, formSuccess: null, formError: null });
  const api = new ChatAPI();
  const response = await api.deleteChat(data);
  if (apiHasError(response)) {
    logger("deleteChatApiError", response);
    dispatch({
      isLoading: false,
      formError: response.reason
    });
    return;
  }
  window.router.go("/messenger");
  const chats = _state.chats?.filter((chat) => chat.id !== chatId);
  dispatch({
    isLoading: false,
    formError: null,
    formSuccess: "Чат успешно удален",
    chats
  });
};
