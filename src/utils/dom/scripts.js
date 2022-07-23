// chat page
function toggleOptionsWindow() {
  document.getElementById("chat-options").classList.toggle("hidden");
  document
    .getElementById("chat-options-button")
    .classList.toggle("options-button-active");
}
function toggleAttachWindow() {
  document.getElementById("attach-options").classList.toggle("hidden");
}

function addUserModal() {
  const modal = document.getElementById("modal-add-user");
  modal.style.display = "block";
}
function deleteUserModal() {
  const modalDeleteUser = document.getElementById("modal-delete-user");
  modalDeleteUser.style.display = "block";
}
window.onclick = function (event) {
  const modal = document.getElementById("modal-add-user");
  const modalDeleteUser = document.getElementById("modal-delete-user");
  if (modal || modalDeleteUser) {
    if (event.target.classList.contains("modal__wrapper")) {
      modal.style.display = "none";
      modalDeleteUser.style.display = "none";
    }
  }
  // profile page
  if (window.location.pathname === "/profile") {
    const personalImage = document.getElementById("avatar");
    const input = document.getElementById("user-avatar");
    personalImage.addEventListener("click", () => {
      input.click();
    });
  }
};
