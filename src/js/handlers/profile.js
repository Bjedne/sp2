import { checkIfLoggedIn } from "../loggedIn.js";
import { generateProfilePage } from "../generate/profilePage.js";

const signOutBtn = document.getElementById("signOutBtn");
signOutBtn.addEventListener("click", function () {
  localStorage.clear();
  window.location.href = "../../../index.html";
});

checkIfLoggedIn();
generateProfilePage();
