export function toggleOptionsWindow() {
  document.getElementById("chat-options")?.classList.toggle("hidden");
  document
    .getElementById("chat-options-button")
    ?.classList.toggle("options-button-active");
}
export function toggleAttachWindow() {
  document.getElementById("attach-options")?.classList.toggle("hidden");
}

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
    } else {
      const el = document.getElementById(_modalId) as HTMLElement;
      el.classList.contains("hidden") && el.classList.toggle("hidden");
    }
  };
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
