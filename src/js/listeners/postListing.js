import { postListing } from "../api/auth/postCreateListing.js";

const createListingForm = document.querySelector("#createListingForm");

async function isValidUrl(url) {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
}

export function createListing() {
  createListingForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = createListingForm.querySelector("#createListingTitle").value;
    const description =
      createListingForm.querySelector("#createListingDesc").value;
    const endsAt = createListingForm.querySelector(
      "#createListingDeadline",
    ).value;

    const mediaUrls = [
      createListingForm.querySelector("#createListingImg1").value,
      createListingForm.querySelector("#createListingImg2").value,
      createListingForm.querySelector("#createListingImg3").value,
    ];

    const media = mediaUrls
      .filter((url) => url.trim() !== "")
      .map((url) => ({ url }));

    for (const mediaItem of media) {
      const isValid = await isValidUrl(mediaItem.url);
      if (!isValid) {
        alert(`The URL ${mediaItem.url} is not valid or reachable.`);
        return;
      }
    }

    const body = {
      title,
      description,
      endsAt,
      media,
    };

    try {
      const listingId = await postListing(body);

      alert("Listing created!");
      window.location.href = `item.html?id=${listingId}`;
    } catch (error) {
      console.error(error);
      alert("Failed to create listing. Please try again.");
    }
  });
}
