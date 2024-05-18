import { checkIfLoggedIn } from "../loggedIn.js";
import { apiPath, APIKey } from "../constants.js";
import storage from "../storage.js";

async function getSingleListing() {
  const searchParams = new URLSearchParams(window.location.search);
  const token = storage.get("token");
  if (searchParams.has("id")) {
    const listingId = searchParams.get("id");
    const listingUrl = `${apiPath}auction/listings/${listingId}?_bids=true`;
    try {
      const response = await fetch(listingUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": APIKey,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const listing = await response.json();
      generateSingleListing(listing);
    } catch (error) {
      console.error("Error fetching the listing:", error);
    }
  }
}

const generateSingleListing = (listing) => {
  console.log(listing);
  const container = document.getElementById("singleListingContainer");
  console.log(listing.data.bids.length);

  const lastBidAmount =
    listing.data.bids.length > 0
      ? listing.data.bids[listing.data.bids.length - 1].amount
      : 0;

  container.innerHTML = `
    <div class="container text-center">
      <div class="row justify-content-start">
        <a href="javascript:history.back()" class="col-3">
          <i class="bi bi-arrow-left"></i>
        </a>
        <div class="col-6">
          <h1 class="mx-auto" id="itemName">${listing.data.title}</h1>
        </div>
      </div>
    </div>
    <div class="col-10 container">
      <img
        class="img-fluid rounded"
        src="${listing.data.media[0].url}"
        id="itemImg"
      />
      <p class="mt-2" id="itemDescription">
        ${listing.data.description}
      </p>
      <p id="auctionEnds">${listing.data.endsAt}</p>
    </div>
    <div class="col-10 container">
      <div class="d-flex gap-2" id="tags">
        <p class="bg-primary p-2 rounded-pill text-light inter">Good Condition</p>
        <p class="bg-primary p-2 rounded-pill text-light inter">Used</p>
      </div>
      <div class="d-flex gap-1" id="currentBid">
        <p>Current bid:</p>
        <i class="bi bi-coin"> ${lastBidAmount}</i>
      </div>
    </div>
    <div class="col-10 container hidden show-when-logged-in">
      <p>
        <button
          class="btn border-primary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          View bid history
          <i class="bi bi-caret-down"></i>
        </button>
      </p>
      <div class="collapse mb-3" id="collapseExample">
        <div class="card card-body gap-1">
          <i class="bi bi-coin"> 10</i>
          <i class="bi bi-coin"> 20</i>
          <i class="bi bi-coin"> 30</i>
          <i class="bi bi-coin"> 40</i>
        </div>
      </div>
    </div>
    <div class="hidden show-when-logged-in">
      <div class="col-10 container d-flex gap-1">
        <div class="col-6">
          <input class="form-control" />
        </div>
        <div class="col-4">
          <button class="btn btn-primary">Place Bid</button>
        </div>
      </div>
    </div>
    <div class="col-10 container hide-when-logged-in mt-2">
      <a href="./login.html">
        <button class="btn btn-warning">Sign in to place bid</button></a>
    </div>
  `;
  checkIfLoggedIn(); // Call checkIfLoggedIn after generating the listing
};

document.addEventListener("DOMContentLoaded", () => {
  getSingleListing();
});
