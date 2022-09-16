import { AuthAPI, ChatAPI } from "api";
import type { Dispatch } from "core";
import { transformUser, apiHasError, logger } from "utils";
import { setDefaultAvatars } from "utils/helpers";
import { routes } from "../router";
import { addLocationObserver, clearErrorsAndSuccess } from "utils/dom";

export async function initApp(dispatch: Dispatch<AppState>) {
  try {
    const userRes = await new AuthAPI().getUser();
    const user = userRes.data;
    if (!user || apiHasError(user)) {
      logger("unAuthed");
      window.router.go("/");
      dispatch({
        user: null,
        chats: [],
        chatMessages: []
      });
      return;
    }
    const chatsRes = await new ChatAPI().getChats();
    const chats = setDefaultAvatars(chatsRes.data || []);
    logger("authed");
    dispatch({
      user: transformUser(user),
      chats,
      chatMessages: []
    });

    //редиректы для авторизованных пользователей
    const currentPathName = window.router.currentRoute?.pathname;
    if (currentPathName) {
      const currentRoute = routes.find((route) =>
        route.path.includes(currentPathName)
      );
      if (
        currentRoute &&
        !currentRoute.shouldAuthorized &&
        currentRoute.path !== "*"
      ) {
        window.router.go("/messenger");
      }
    }
  } catch (err) {
    logger("initApp api error", err);
    dispatch({
      user: null,
      chats: [],
      chatMessages: []
    });
    window.router.go("/");
  } finally {
    dispatch({ appIsInited: true });
    addLocationObserver(clearErrorsAndSuccess);
  }
}
