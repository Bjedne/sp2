import { postListing } from "../api/auth/postCreateListing.js";

const createListingForm = document.querySelector("#createListingForm");

export function createListing() {
  createListingForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = createListingForm.querySelector("#createListingTitle").value;
    const description =
      createListingForm.querySelector("#createListingDesc").value;
    const endsAt = createListingForm.querySelector(
      "#createListingDeadline",
    ).value;

    // Create the media array and only include media objects with non-empty URL values
    const mediaUrls = [
      createListingForm.querySelector("#createListingImg1").value,
      createListingForm.querySelector("#createListingImg2").value,
      createListingForm.querySelector("#createListingImg3").value,
    ];

    const media = mediaUrls
      .filter((url) => url.trim() !== "")
      .map((url) => ({ url }));

    const body = {
      title,
      description,
      endsAt,
      media,
    };

    try {
      const listingId = await postListing(body);
      alert("Listing created!");
      // Redirect to the newly created listing
      window.location.href = `item.html?id=${listingId}`;
    } catch (error) {
      console.error("Error creating listing:", error);
      alert("Failed to create listing. Please try again.");
    }
  });
}
