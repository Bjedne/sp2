import { getListings } from "./src/js/api/index.js";
const landingContainer = document.querySelector(".landingContainer");

async function landingListings() {
  try {
    landingContainer.innerHTML = "";

    const listings = await getListings();
    console.log(listings);

    const filteredListings = listings.data.filter(
      (listing) => listing.media.length > 0,
    );

    filteredListings.slice(0, 6).forEach(function (listing) {
      const endDate = new Date(listing.endsAt);
      const options = { day: "numeric", month: "numeric", year: "2-digit" };
      const formattedEndDate = endDate.toLocaleDateString(undefined, options);

      const latestBid = listing.bids[listing.bids.length - 1];
      const latestBidAmount = latestBid ? latestBid.amount : "No bids";

      landingContainer.innerHTML += `
      <div class="col-5">
      <a href="./src/html/item.html/${listing.id}">
      <img class="thumbnailImage" src="${listing.media[0].url}" alt="${listing.media[0].alt}">
      <h3 class="arimoItalic">${listing.title}</h3>
      <div class="d-flex">
        <p class="me-auto"><i class="bi bi-coin"></i> ${latestBidAmount}</p>
        <p>Ends: ${formattedEndDate}</p>
      </div>
      </a>
        </div>
        `;
    });
  } catch (error) {
    console.log(error);
  }
}

landingListings();

const storedUserData = localStorage.getItem("profile");

if (storedUserData) {
  const userData = JSON.parse(storedUserData);
  console.log(userData);

  document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const avatarIconLink = document.getElementById("avatarLink");

    if (isLoggedIn) {
      avatarIconLink.href = "./src/html/profile.html";
      const elementsToHide = document.querySelectorAll(".hide-when-logged-in");
      elementsToHide.forEach((element) => {
        element.classList.add("hidden");
      });

      const elementsToShow = document.querySelectorAll(".show-when-logged-in");
      elementsToShow.forEach((element) => {
        element.classList.remove("hidden");
      });

      const avatarImg = document.getElementById("avatarIcon");
      if (avatarImg && userData.avatar) {
        avatarImg.src = userData.avatar.url;
        avatarImg.alt = userData.avatar.alt || "User Avatar";
      }
    } else {
      const elementsToShow = document.querySelectorAll(".show-when-logged-out");
      elementsToShow.forEach((element) => {
        element.classList.remove("hidden");
      });
    }
  });
}

/* Change the API call to have each listing displayed be an anchor tag that directs to listing specific page */
