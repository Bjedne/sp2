import updateAvatar from "../api/auth/updateAvatar.js";
const changeAvatarForm = document.querySelector("#changeAvatarForm");

export function changeAvatar() {
  changeAvatarForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const body = {
      avatar: { url: changeAvatarForm.querySelector("#avatarInput").value },
    };
    updateAvatar(body);
  });
}
