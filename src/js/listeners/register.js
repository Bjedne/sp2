import registration from "../api/auth/register.js";
const registerForm = document.querySelector("#registerForm");

export default function register() {
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const body = {
      name: registerForm.querySelector("#usernameReg").value,
      email: registerForm.querySelector("#emailReg").value,
      password: registerForm.querySelector("#passwordReg").value,
      avatar: { url: registerForm.querySelector("#avatarReg").value },
    };
    registration(body);
  });
}
