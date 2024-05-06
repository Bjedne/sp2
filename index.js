import { getListings } from "./src/js/api/index.js";
const landingContainer = document.querySelector(".landingContainer");

async function landingListings() {
  try {
    landingContainer.innerHTML = "";

    const listings = await getListings();
    console.log(listings);

    listings.data.slice(0, 4).forEach(function (listing) {
      landingContainer.innerHTML += `<div><h1>Here are some words to test ${listing.title}</h1></div>`;
    });
  } catch (error) {
    console.log(error);
  }
}

landingListings();
