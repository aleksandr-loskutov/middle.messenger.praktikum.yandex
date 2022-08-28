import { ChatAPI } from "api";
import type { Dispatch } from "core";
import { apiHasError, logger, connectWebSocket } from "utils";

//todo полный рефакторинг
export async function connectToChat(
  dispatch: Dispatch<AppState>,
  state: AppState
) {
  dispatch({ isLoading: true });
  const userId = this.props.store.getState().user.id;
  const chatId = this.props.idParam;

  if (!userId || !chatId) {
    logger(
      "Не указан идентификатор пользователя или чата. Подключение не выполнено."
    );
    dispatch({ isLoading: false });
    return;
  }
  const api = new ChatAPI();
  const response = await api.getWsTokenForChat(chatId);
  if (apiHasError(response)) {
    logger("getWsTokenForChatApiError", response);
    dispatch({ isLoading: false });
    return;
  }

  const { token } = response;

  try {
    const socket = (await connectWebSocket(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
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

      if (!Array.isArray(data) && data) {
        const { type, content } = data;
        const messages = this.props.store.getState().chatMessages;

        switch (type) {
          case "message":
            logger("Получено новое сообщение в чате", content);
            dispatch({
              isLoading: false,
              chatMessages: [data, ...messages]
            });
            break;
          case "error":
            logger("Получена ошибка", content);
            break;
          case "pong":
            break;
        }
      } else {
        logger("Получен массив сообщений", data);
        //todo переработать
        dispatch({
          isLoading: false,
          chatMessages: data
        });
      }
    });

    //временное решение
    this.setProps({ socket });
  } catch (error) {
    logger("Ошибка в работе с вебсокетом", error);
  }
}
