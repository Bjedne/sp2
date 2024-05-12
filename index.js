import { getListings } from "./src/js/api/index.js";
const landingContainer = document.querySelector(".landingContainer");

async function landingListings() {
  try {
    landingContainer.innerHTML = "";

    const listings = await getListings();
    console.log(listings);

    listings.data.slice(6, 10).forEach(function (listing) {
      const endDate = new Date(listing.endsAt);
      const formattedEndDate = endDate.toLocaleDateString();

      landingContainer.innerHTML += `<div class="col-5">
      <img class="thumbnailImage" src="${listing.media[0].url}">
      <h3>${listing.title}</h3>
      <p>100 credits</p>
      <p>Ends: ${formattedEndDate}</p>
        </div>`;
    });
  } catch (error) {
    console.log(error);
  }
}

landingListings();
