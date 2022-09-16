import { logger } from "utils/helpers";
import { CHAT_MESSAGES_BOX_CLASS } from "utils/consts";

export function clickOnAvatarInput() {
  //временное решение
  const el = document.getElementById("avatar") as HTMLInputElement;
  el.click();
}

export function createModalToggler(modalId: string) {
  const _modalId = modalId;
  return (event: PointerEvent) => {
    const { target } = event;
    if ((target as HTMLElement).classList.contains("modal__wrapper")) {
      const { parentElement } = target;
      parentElement.classList.toggle("hidden");
      deleteSearchParams("modal");
    } else {
      const el = document.getElementById(_modalId) as HTMLElement;
      el.classList.contains("hidden") && el.classList.remove("hidden");
      setSearchParams("modal", _modalId.replace("modal-", ""));
    }
    clearErrorsAndSuccess();
  };
}

export function clearError() {
  const els = document.querySelectorAll(".error");
  if (els.length > 0) {
    els.forEach((el) => {
      el.innerHTML = "";
    });
  }
}

export function clearSuccess() {
  const els = document.querySelectorAll(".success");
  if (els.length > 0) {
    els.forEach((el) => {
      el.innerHTML = "";
    });
  }
}

export function clearErrorsAndSuccess() {
  clearError();
  clearSuccess();
}

export function setSearchParams(key: string, value: string): void {
  if ("URLSearchParams" in window) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, value);
    const newRelativePathQuery =
      window.location.pathname + "?" + searchParams.toString();
    history.pushState(null, "", newRelativePathQuery);
  }
}

export function deleteSearchParams(key: string): void {
  if ("URLSearchParams" in window) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete(key);
    const newRelativePathQuery =
      window.location.pathname + searchParams.toString();
    history.pushState(null, "", newRelativePathQuery);
  }
}

export function getValuesFromElements(...names: string[]): object {
  const data = {} as Indexed;
  names.forEach((name) => {
    const element = this.element?.querySelector(
      name.includes("#") ? name : `[name="${name}"]`
    ) as HTMLInputElement;
    if (element) {
      if (name.includes("#")) {
        const attr = element.getAttribute("name");
        if (attr) data[attr] = element.value;
      } else {
        data[name] = element.value;
      }
    }
  });
  return data;
}

export function addLocationObserver(onLocationChange: () => void) {
  let previousUrl = "";

  const observer = new MutationObserver(() => {
    if (window.location.href !== previousUrl) {
      logger(`URL changed from ${previousUrl} to ${window.location.href}`);
      previousUrl = window.location.href;
      if (onLocationChange) onLocationChange();
    }
  });
  const config = { subtree: true, childList: true };

  observer.observe(document, config);
}

export function reloadPage() {
  window.location.reload();
}

export function scrollToBottom() {
  const scrollingElement = document.querySelector(CHAT_MESSAGES_BOX_CLASS);
  if (scrollingElement)
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
}
