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

    filteredListings.slice(0, 6).forEach(function (listing) {
      const endDate = new Date(listing.endsAt);
      const options = { day: "numeric", month: "numeric", year: "2-digit" };
      const formattedEndDate = endDate.toLocaleDateString(undefined, options);

      const latestBid = listing.bids[listing.bids.length - 1];
      const latestBidAmount = latestBid ? latestBid.amount : "No bids";

      landingContainer.innerHTML += `<div class="col-5">
      <img class="thumbnailImage" src="${listing.media[0].url}" alt="${listing.media[0].alt}">
      <h3 class="arimoItalic">${listing.title}</h3>
      <div class="d-flex">
        <p class="me-auto"><i class="bi bi-coin"></i> ${latestBidAmount}</p>
        <p>Ends: ${formattedEndDate}</p>
      </div>
        </div>`;
    });
  } catch (error) {
    console.log(error);
  }
}

landingListings();

/* API renders an icon in top right corner.
- This icon should display a placeholder icon and direct to login/signup page if no user is logged in.
- If logged in, the icon should display the user's avatar instead and direct to the profile page */

/* If logged in:
- Profile should appear in the navbar as an option and signin/signup should not
If NOT logged in:
- Signin/signup should appear in the navbar and profile should not
 */

/* Change the API call to have each listing displayed be an anchor tag that directs to listing specific page */
