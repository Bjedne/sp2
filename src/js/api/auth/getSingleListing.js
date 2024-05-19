import { apiPath } from "../../constants.js";
import { generateSingleListing } from "../../generate/singleListing.js";

export async function getSingleListing() {
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has("id")) {
    const listingId = searchParams.get("id");
    const listingUrl = `${apiPath}/${listingId}?_seller=true&_bids=true`;
    try {
      const response = await fetch(listingUrl);
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
