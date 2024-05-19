import { checkIfLoggedIn } from "../loggedIn.js";
import { apiPath, APIKey } from "../constants.js";
import { formatTimeLeft } from "../timeLeft.js";
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
      console.error(error);
    }
  }
}

const generateSingleListing = (listing) => {
  const container = document.getElementById("singleListingContainer");
  const formattedTimeLeft = formatTimeLeft(listing.data.endsAt);

  const lastBidAmount =
    listing.data.bids.length > 0
      ? listing.data.bids[listing.data.bids.length - 1].amount
      : 0;

  const bidHistoryHtml = listing.data.bids
    .map((bid) => `<i class="bi bi-coin"> ${bid.amount}</i>`)
    .join("");

  container.innerHTML = `
    <div class="container text-center">
      <div class="row justify-content-start align-items-center">
        <a href="javascript:history.back()" class="col-3 fs-1">
          <i class="bi bi-arrow-left"></i>
        </a>
        <div class="col-6">
          <h1 class="mx-auto" id="itemName">${listing.data.title}</h1>
        </div>
      </div>
    </div>
    <div class="col-10 container">

    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="carouselContainer">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

      <p class="mt-2" id="itemDescription">
        ${listing.data.description}
      </p>
      <p id="auctionEnds">Ends in: ${formattedTimeLeft}</p>
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

  const carouselContainer = document.getElementById("carouselContainer");
  carouselContainer.innerHTML = "";

  const carouselItemsHtml = listing.data.media
    .map(
      (media, index) => `
    <div class="container carousel-item ${index === 0 ? "active" : ""}">
      <img src="${media.url}" class="d-block mx-auto w-100" alt="Image ${index + 1}">
    </div>
  `,
    )
    .join("");

  carouselContainer.innerHTML = carouselItemsHtml;

  const carouselIndicators = document.querySelector(".carousel-indicators");
  const carouselControls = document.querySelectorAll(".carousel-control");
  const carouselPrev = document.querySelector(".carousel-control-prev-icon");
  const carouselNext = document.querySelector(".carousel-control-next-icon");

  if (listing.data.media.length <= 1) {
    carouselIndicators.style.display = "none";
    carouselPrev.style.display = "none";
    carouselNext.style.display = "none";

    carouselControls.forEach((control) => (control.style.display = "none"));
  }

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
    console.error(error);
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
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getSingleListing();
});
