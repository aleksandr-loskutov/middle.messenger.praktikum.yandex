import { AuthAPI, ChatAPI } from "api";
import { UserDTO, ChatDTO } from "types/api";
import type { Dispatch } from "core";
import { transformUser, apiHasError, logger } from "utils";
import { setDefaultAvatars } from "utils/helpers";

export async function initApp(dispatch: Dispatch<AppState>) {
  try {
    const user = await new AuthAPI().getUser();
    const chats = await new ChatAPI().getChats();
    if (apiHasError(user)) {
      logger("unauthed or api error");
      dispatch({
        user: null,
        chats: [],
        chatMessages: []
      });
      return;
    }
    logger("authed");
    dispatch({
      user: transformUser(user as UserDTO),
      chats: setDefaultAvatars(chats) as ChatDTO[],
      chatMessages: []
    });
  } catch (err) {
    logger("initApp api error", err);
  } finally {
    dispatch({ appIsInited: true });
  }
}
