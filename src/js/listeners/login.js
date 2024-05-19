import { loginUser } from "../api/auth/login.js";

export default function loginListener() {
  const loginForm = document.querySelector("#login");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    loginUser(email, password);
  });
}
