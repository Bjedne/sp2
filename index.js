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

    filteredListings.slice(0, 17).forEach(function (listing) {
      const endDate = new Date(listing.endsAt);
      const options = { day: "numeric", month: "numeric", year: "2-digit" };
      const formattedEndDate = endDate.toLocaleDateString(undefined, options);

      landingContainer.innerHTML += `<div class="col-5">
      <img class="thumbnailImage" src="${listing.media[0].url}">
      <h3>${listing.title}</h3>
      <div class="d-flex">
        <p class="me-3">100 credits</p>
        <p>Ends: ${formattedEndDate}</p>
      </div>
        </div>`;
    });
  } catch (error) {
    console.log(error);
  }
}

landingListings();
