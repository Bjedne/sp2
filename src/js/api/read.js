import { apiPath } from "../constants.js";

export async function getListings(limit = 60) {
  const response = await fetch(
    `${apiPath}auction/listings?limit=${limit}&_seller=true&_bids=true&_active=true`,
  );

  if (response.ok) {
    return await response.json();
  } else {
    console.error("Something went wrong");
  }
}
