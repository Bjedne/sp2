import getProfile from "../js/api/auth/getProfile.js";

async function updateAvatarFromAPI() {
  try {
    // Fetch the new avatar data from the API
    const newAvatarData = await getProfile();

    // Retrieve the existing profile data from localStorage
    const storedUserData = localStorage.getItem("profile");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);

      console.log(userData);

      // Update the avatar part of the profile data
      userData.avatar = {
        url: newAvatarData.avatar.url,
        alt: newAvatarData.alt || "User Avatar",
      };

      // Save the updated profile data back to localStorage
      localStorage.setItem("profile", JSON.stringify(userData));

      // Optionally update the UI immediately
      const avatarImg = document.getElementById("avatarIcon");
      if (avatarImg) {
        avatarImg.src = userData.avatar.url;
        avatarImg.alt = userData.avatar.alt;
      }
    }
  } catch (error) {
    console.error("Failed to update avatar:", error);
  }
}

export function checkIfLoggedIn() {
  const storedUserData = localStorage.getItem("profile");
  const avatarIconLink = document.getElementById("avatarLink");

  const currentPath = window.location.pathname;
  const levelsUp = currentPath.split("/").length - 2;
  const relativePath = "../".repeat(levelsUp);
  const targetPath = relativePath + "/src/html/login.html";

  avatarIconLink.href = targetPath;

  if (storedUserData) {
    const userData = JSON.parse(storedUserData);

    document.addEventListener("DOMContentLoaded", () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

      if (isLoggedIn) {
        const currentPath = window.location.pathname;
        const levelsUp = currentPath.split("/").length - 2;
        const relativePath = "../".repeat(levelsUp);
        const targetPath = relativePath + "/src/html/profile.html";

        avatarIconLink.href = targetPath;

        const elementsToHide = document.querySelectorAll(
          ".hide-when-logged-in",
        );
        elementsToHide.forEach((element) => {
          element.classList.add("hidden");
        });

        const elementsToShow = document.querySelectorAll(
          ".show-when-logged-in",
        );
        elementsToShow.forEach((element) => {
          element.classList.remove("hidden");
        });

        const avatarImg = document.getElementById("avatarIcon");
        if (avatarImg && userData.avatar) {
          avatarImg.src = userData.avatar.url;
          avatarImg.alt = userData.avatar.alt || "User Avatar";
        }
        updateAvatarFromAPI();
      } else {
        const elementsToShow = document.querySelectorAll(
          ".show-when-logged-out",
        );
        elementsToShow.forEach((element) => {
          element.classList.remove("hidden");
        });
      }
    });
  }
}
