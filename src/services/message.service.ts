import { ChatAPI } from "api";
import type { Dispatch } from "core";
import { logger, connectWebSocket } from "utils";
import { WS_ENDPOINT } from "utils/consts";

export async function connectChats(
  dispatch: Dispatch<AppState>,
  state: AppState
) {
  if (state.isChatsLoaded || state.isChatsLoading) return;
  dispatch({ isChatsLoading: true, isLoading: true });
  //получаем список чатов
  const chats = state.chats.map((chat) => {
    return { chatId: chat.id };
  });
  //для каждого чата получаем токен
  const api = new ChatAPI();
  const chatsWithTokens = await Promise.all(
    chats.map(async (chat) => {
      const { token } = await api.getWsTokenForChat(chat.chatId);
      return {
        ...chat,
        token
      };
    })
  );
  //для каждого чата подключаемся к вебсокету
  const chatsWithSockets = await Promise.all(
    chatsWithTokens.map(async (chat) => {
      const socket = await connectChatToSocket.bind(this)(
        chat.chatId,
        chat.token
      );
      return { ...chat, socket };
    })
  );
  dispatch({
    isChatsLoaded: true,
    isChatsLoading: false,
    isLoading: false,
    tokens: chatsWithSockets
  });
}

export async function connectChatToSocket(chatId, token) {
  const userId = this.props.store.getState().user.id;
  const currentChatId = this.props.idParam;
  try {
    const socket = (await connectWebSocket(
      `${WS_ENDPOINT}${userId}/${chatId}/${token}`
    )) as WebSocket;

    //инициирующий запрос на получение последних 20 сообщений
    socket.send(
      JSON.stringify({
        content: "0",
        type: "get old"
      })
    );

    socket.addEventListener("message", (event) => {
      let { data } = event;
      if (data) data = JSON.parse(data);
      const { type, content } = data;

      if (type === "pong") return;
      const { chatMessages } = this.props.store.getState();
      const currentChatMessages = chatMessages[chatId] || [];
      const currentChat = this.props.store
        .getState()
        .chats.find((chat) => chat.id === chatId);
      // const chats = this.props.store.getState().chats;
      if (!Array.isArray(data) && data) {
        switch (type) {
          case "message":
            logger("Получено новое сообщение в чате", content);
            currentChat.last_message = data;
            if (currentChatId !== chatId) {
              currentChat.unread_count = currentChat.unread_count + 1;
            }
            this.props.store.dispatch({
              // chats: [...chats],
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
}
