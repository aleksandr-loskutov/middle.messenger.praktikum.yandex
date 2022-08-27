import { AuthAPI, ChatAPI } from "api";
import { UserDTO, ChatDTO } from "types/api";
import type { Dispatch } from "core";
import { transformUser, apiHasError } from "utils";
import { setDefaultAvatars } from "../utils/helpers";

export async function initApp(dispatch: Dispatch<AppState>) {
  try {
    const user = await new AuthAPI().getUser();
    const chats = await new ChatAPI().getChats();
    if (apiHasError(user)) {
      console.log("apiHasError");
      return;
    }

    dispatch({
      user: transformUser(user as UserDTO),
      chats: setDefaultAvatars(chats) as ChatDTO[]
    });
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ appIsInited: true });
  }
}
