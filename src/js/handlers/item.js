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

  const lastBidAmount =
    listing.data.bids.length > 0
      ? listing.data.bids[listing.data.bids.length - 1].amount
      : 0;

  const bidHistoryHtml = listing.data.bids
    .map((bid) => `<i class="bi bi-coin"> ${bid.amount}</i>`)
    .join("");

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
          ${bidHistoryHtml}
        </div>
      </div>
    </div>
    <div class="hidden show-when-logged-in">
      <div class="col-10 container d-flex gap-1">
        <div class="col-6">
          <input class="form-control" id="inputBidAmount" placeholder="Enter your bid amount"/>
        </div>
        <div class="col-4">
          <button class="btn btn-primary" id="btnPlaceBid">Place Bid</button>
        </div>
      </div>
    </div>
    <div class="col-10 container hide-when-logged-in mt-2">
      <a href="./login.html">
        <button class="btn btn-warning">Sign in to place bid</button></a>
    </div>
  `;

  // Add event listener for the "Place Bid" button
  document
    .getElementById("btnPlaceBid")
    .addEventListener("click", () => placeBid(listing.data.id));
  checkIfLoggedIn();
};

async function placeBid(listingId) {
  const bidAmount = document.getElementById("inputBidAmount").value;
  const token = storage.get("token");

  if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
    alert("Please enter a valid bid amount.");
    return;
  }

  const bidUrl = `${apiPath}auction/listings/${listingId}/bids`;
  try {
    const response = await fetch(bidUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": APIKey,
      },
      body: JSON.stringify({ amount: parseInt(bidAmount, 10) }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    alert("Bid placed successfully!");
    updateListingBids(listingId);
  } catch (error) {
    console.error("Error placing bid:", error);
    alert("Failed to place bid. Please try again.");
  }
}

async function updateListingBids(listingId) {
  const token = storage.get("token");
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
    const bidHistoryHtml = listing.data.bids
      .map((bid) => `<i class="bi bi-coin"> ${bid.amount}</i>`)
      .join("");
    document.querySelector("#collapseExample .card-body").innerHTML =
      bidHistoryHtml;
    document.getElementById("currentBid").innerHTML = `
      <p>Current bid:</p>
      <i class="bi bi-coin"> ${listing.data.bids.length > 0 ? listing.data.bids[listing.data.bids.length - 1].amount : 0}</i>
    `;
  } catch (error) {
    console.error("Error updating bid history:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getSingleListing();
});
