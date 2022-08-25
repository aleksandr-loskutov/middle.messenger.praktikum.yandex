import { AuthAPI } from "api";
import { UserDTO } from "types/api";
import type { Dispatch } from "core";
import { transformUser, apiHasError } from "utils";

export async function initApp(dispatch: Dispatch<AppState>) {
  try {
    const response = await new AuthAPI().getUser();

    if (apiHasError(response)) {
      console.log("apiHasError");
      return;
    }

    dispatch({ user: transformUser(response as UserDTO) });
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ appIsInited: true });
  }
}
