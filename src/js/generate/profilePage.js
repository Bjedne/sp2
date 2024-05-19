import getProfile from "../api/auth/getProfile.js";

export async function generateProfilePage() {
  const profile = await getProfile();
  const avatar = document.querySelector("#avatarProfile");
  const username = document.querySelector("#usernameProfile");
  const credits = document.querySelector("#creditsProfile");

  avatar.src = profile.avatar.url;
  username.innerHTML = profile.name;
  credits.innerHTML += profile.credits;
}
