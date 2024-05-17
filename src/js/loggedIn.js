export function checkIfLoggedIn() {
  const storedUserData = localStorage.getItem("profile");

  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    console.log(userData);

    document.addEventListener("DOMContentLoaded", () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const avatarIconLink = document.getElementById("avatarLink");

      if (isLoggedIn) {
        avatarIconLink.href = "./src/html/profile.html";
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
