import { checkIfLoggedIn } from "../loggedIn.js";
import getProfile from "../api/auth/getProfile.js";

const signOutBtn = document.getElementById("signOutBtn");
signOutBtn.addEventListener("click", function () {
  localStorage.clear();
  window.location.href = "../../../index.html";
});

checkIfLoggedIn();
getProfile();
