import { AuthAPI, ChatAPI } from "api";
import type { Dispatch } from "core";
import { transformUser, apiHasError, logger } from "utils";
import { setDefaultAvatars } from "utils/helpers";

export async function initApp(dispatch: Dispatch<AppState>) {
  try {
    const user = await new AuthAPI().getUser();
    const chats = await new ChatAPI().getChats();
    if (apiHasError(user) || apiHasError(chats)) {
      logger("unAuthed or api error");
      dispatch({
        user: null,
        chats: [],
        chatMessages: []
      });
      return;
    }
    logger("authed");
    dispatch({
      user: transformUser(user),
      chats: setDefaultAvatars(chats),
      chatMessages: []
    });
  } catch (err) {
    logger("initApp api error", err);
    dispatch({
      user: null,
      chats: [],
      chatMessages: []
    });
  } finally {
    dispatch({ appIsInited: true });
  }
}
