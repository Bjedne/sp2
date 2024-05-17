import { getListings } from "./index.js";
const allListingsContainer = document.querySelector(".allListingsContainer");
import { checkIfLoggedIn } from "../loggedIn.js";

async function allListings() {
  try {
    allListingsContainer.innerHTML = "";

    const listings = await getListings();
    console.log(listings);

    const filteredListings = listings.data.filter(
      (listing) => listing.media.length > 0,
    );

    filteredListings.slice(0, 20).forEach(function (listing) {
      const endDate = new Date(listing.endsAt);
      const options = { day: "numeric", month: "numeric", year: "2-digit" };
      const formattedEndDate = endDate.toLocaleDateString(undefined, options);

      const latestBid = listing.bids[listing.bids.length - 1];
      const latestBidAmount = latestBid ? latestBid.amount : "No bids";

      allListingsContainer.innerHTML += `<div class="col-5">
      <a href="./src/html/item.html/${listing.id}"><img class="thumbnailImage" src="${listing.media[0].url}" alt="${listing.media[0].alt}">
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

allListings();
checkIfLoggedIn();
