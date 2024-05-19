import { checkIfLoggedIn } from "../loggedIn.js";
import { generateProfilePage } from "../generate/profilePage.js";
import { changeAvatar } from "../listeners/changeAvatar.js";
import { getUserListings } from "../api/auth/getUserListings.js";

const signOutBtn = document.getElementById("signOutBtn");
signOutBtn.addEventListener("click", function () {
  localStorage.clear();
  window.location.href = "../../../index.html";
});

generateProfilePage();
changeAvatar();
checkIfLoggedIn();
getUserListings();
