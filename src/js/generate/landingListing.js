import { getListings } from "../api/index.js";

export async function landingListings() {
  const landingContainer = document.querySelector(".landingContainer");
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
