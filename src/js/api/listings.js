import { getListings } from "./index.js";
import { checkIfLoggedIn } from "../loggedIn.js";
import { formatTimeLeft } from "../timeLeft.js";
import { createListing } from "../listeners/postListing.js";

const allListingsContainer = document.querySelector(".allListingsContainer");
const searchBar = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton");
const noResultsMessage = document.getElementById("noResultsMessage");

async function allListings(searchQuery = "") {
  try {
    allListingsContainer.innerHTML = "";
    noResultsMessage.style.display = "none";

    const listings = await getListings();
    console.log(listings);

    const filteredListings = listings.data.filter(
      (listing) =>
        listing.media.length > 0 &&
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    if (filteredListings.length === 0) {
      noResultsMessage.style.display = "block";
    } else {
      noResultsMessage.style.display = "none";
      filteredListings.slice(0, 20).forEach(function (listing) {
        const formattedTimeLeft = formatTimeLeft(listing.endsAt);

        const latestBid = listing.bids[listing.bids.length - 1];
        const latestBidAmount = latestBid ? latestBid.amount : "No bids";

        allListingsContainer.innerHTML += `
          <div class="col-5">
            <a href="./item.html?id=${listing.id}">
              <img class="thumbnailImage" src="${listing.media[0].url}" alt="${listing.media[0].alt}">
              <h3 class="arimoItalic">${listing.title}</h3>
              <div class="d-flex">
                <p class="me-auto"><i class="bi bi-coin"></i> ${latestBidAmount}</p>
                <p>Ends: ${formattedTimeLeft}</p>
              </div>
            </a>
          </div>
        `;
      });
    }
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  allListings();
  checkIfLoggedIn();
  createListing();
});

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  const searchQuery = searchBar.value;
  allListings(searchQuery);
});
