import { getListings } from "./src/js/api/index.js";
const landingContainer = document.querySelector(".landingContainer");

async function landingListings() {
  try {
    landingContainer.innerHTML = "";

    const listings = await getListings();
    console.log(listings);

    listings.data.slice(0, 4).forEach(function (listing) {
      landingContainer.innerHTML += `<div class="col-5">
      <img src="${listing.media[0].url}">
      <h3>${listing.title}</h3>
      <p>100 credits</p>
      <p>Ends: ${listing.endsAt}</p>
        </div>`;
    });
  } catch (error) {
    console.log(error);
  }
}

landingListings();
