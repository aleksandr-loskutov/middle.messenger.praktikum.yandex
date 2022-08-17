export function toggleOptionsWindow() {
  document.getElementById("chat-options").classList.toggle("hidden");
  document
    .getElementById("chat-options-button")
    .classList.toggle("options-button-active");
}
export function toggleAttachWindow() {
  document.getElementById("attach-options").classList.toggle("hidden");
}

export function addUserModal() {
  const modal = document.getElementById("modal-add-user");
  modal.style.display = "block";
}
export function deleteUserModal() {
  const modalDeleteUser = document.getElementById("modal-delete-user");
  modalDeleteUser.style.display = "block";
}
//TODO переработать
export function addListeners() {
  window.onclick = function (event) {
    if (window.location.pathname === "/chat") {
      const modalAddUser = document.getElementById("modal-add-user");
      const modalDeleteUser = document.getElementById("modal-delete-user");
      if (modalAddUser || modalDeleteUser) {
        if (event.target.classList.contains("modal__wrapper")) {
          modalAddUser.style.display = "none";
          modalDeleteUser.style.display = "none";
        }
      }
    }
    if (window.location.pathname === "/profile") {
      const personalImage = document.getElementById("user-avatar");
      const input = document.getElementById("avatar");
      personalImage.addEventListener("click", () => {
        input.click();
      });
    }
  };
}

export function getValuesFromElements(...names: string[]): object {
  const data = {};
  names.forEach((name) => {
    const element = this.element?.querySelector(
      name.includes("#") ? name : `[name="${name}"]`
    );
    if (element) {
      name.includes("#")
        ? (data[element.getAttribute("name")] = element.value)
        : (data[name] = element.value);
    }
  });
  return data;
}
