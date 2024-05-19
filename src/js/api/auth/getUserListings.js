import { apiPath, APIKey } from "../../constants.js";
import storage from "../../storage.js";
import { formatTimeLeft } from "../../timeLeft.js";

export async function getUserListings() {
  const token = storage.get("token");
  const name = storage.get("profile").name;
  const url = apiPath + "auction/profiles/" + name + "/listings";

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": APIKey,
    },
  });
  const profileListing = await response.json();

  const profileListings = document.querySelector("#profileListings");
  profileListings.innerHTML = "";

  profileListing.data.forEach((listing) => {
    const formattedTimeLeft = formatTimeLeft(listing.endsAt);
    console.log(listing);
    profileListings.innerHTML += `<a
    href="./item.html?id=${listing.id}"
    class="card container d-flex flex-row justify-content-between gap-3"
  >
    <p class="mt-2">${listing.title}</p>
    <p class="mt-2">Bids: ${listing._count.bids}</p>
    <p class="mt-2">Ends in ${formattedTimeLeft}</p>
  </a>`;
  });
}
