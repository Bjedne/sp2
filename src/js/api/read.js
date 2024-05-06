import { apiPath } from "../constants.js";

export async function getListings(limit = 20) {
  const response = await fetch(
    `${apiPath}auction/listings?limit=${limit}&_seller=true&_bids=true&_active=true`,
  );

  if (response.ok) {
    const listings = await response.json();
    console.log(listings);
  }

  /* throw new Error(); */
}

getListings();
