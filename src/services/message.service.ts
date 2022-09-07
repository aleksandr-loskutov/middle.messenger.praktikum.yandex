import { ChatAPI } from "api";
import type { Dispatch } from "core";
import { logger, connectWebSocket } from "utils";
import { WS_ENDPOINT } from "utils/consts";
import { ChatDTO, MessageDTO, Token } from "types/api";

export async function connectChats(
  dispatch: Dispatch<AppState>,
  state: AppState
) {
  if (state.isChatsLoaded || state.isChatsLoading || !state.chats) return;
  dispatch({ isChatsLoading: true, isLoading: true });
  //получаем список чатов
  const chats = state.chats.map((chat) => {
    return { chatId: chat.id };
  });
  //для каждого чата получаем токен
  const api = new ChatAPI();
  const chatsWithTokens = await Promise.all(
    chats.map(async (chat) => {
      const { token } = (await api.getWsTokenForChat(chat.chatId)) as Token;
      return {
        ...chat,
        token
      };
    })
  );
  //для каждого чата подключаемся к вебсокету
  const chatsWithSockets = await Promise.all(
    chatsWithTokens.map(async (chat) => {
      const socket = (await connectChatToSocket.bind(this)(
        chat.chatId,
        chat.token
      )) as WebSocket;
      return { ...chat, socket };
    })
  );
  //todo - сделать проверку на то, что все чаты подключены
  dispatch({
    isChatsLoaded: true,
    isChatsLoading: false,
    isLoading: false,
    tokens: chatsWithSockets
  });
}

export async function connectChatToSocket(
  chatId: number,
  token: string
): Promise<WebSocket | undefined> {
  const userId = this.props.store.getState().user.id;

  try {
    const socket = await connectWebSocket(
      `${WS_ENDPOINT}${userId}/${chatId}/${token}`
    );

    //инициирующий запрос на получение последних 20 сообщений
    socket.send(
      JSON.stringify({
        content: "0",
        type: "get old"
      })
    );

    socket.addEventListener("message", (event) => {
      let { data } = event;
      if (data) {
        data = JSON.parse(data);
      } else return;
      const { type, content, user_id } = data as MessageDTO;
      if (type === "pong") return;
      const { chats } = this.props.store.getState();
      const { chatMessages } = this.props.store.getState();
      const currentChatId = this.props.idParam;
      const currentChatMessages = chatMessages[chatId] || [];
      const updatedChats = chats.map((chat: ChatDTO) => {
        if (chat.id === chatId) {
          if (user_id !== userId) {
            return {
              ...chat,
              unread_count:
                currentChatId !== chat.id
                  ? chat.unread_count + 1
                  : chat.unread_count,
              last_message: { ...data, isMine: false }
            };
          } else {
            return {
              ...chat,
              last_message: { ...data, content: "Вы: " + content, isMine: true }
            };
          }
        } else {
          return chat;
        }
      });
      if (!Array.isArray(data) && data) {
        switch (type) {
          case "message":
            logger("Получено новое сообщение в чате", content);
            this.props.store.dispatch({
              chats: updatedChats,
              chatMessages: {
                ...chatMessages,
                [chatId]: [data, ...currentChatMessages]
              }
            });
            break;
          case "error":
            logger(
              "Получена ошибка в socket.addEventListener message",
              content
            );
            break;
          case "pong":
            break;
        }
      } else {
        //todo переработать
        if (data.length > 0) {
          logger("Получен массив сообщений", data);
          const { chatMessages } = this.props.store.getState();
          this.props.store.dispatch({
            chatMessages: { ...chatMessages, [chatId]: data }
          });
        }
      }
    });
    //временное решение
    return socket;
  } catch (error) {
    logger("Ошибка в работе с вебсокетом", error);
  }
  return;
}

export function setReaded(_dispatch: Dispatch<AppState>, state: AppState) {
  const { chats } = state;
  const currentChatId = this.props.idParam;
  const chat = chats?.find((chat) => chat.id === currentChatId);
  if (chat) chat.unread_count = 0;
}
