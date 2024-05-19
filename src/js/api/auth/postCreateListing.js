import storage from "../../storage.js";
import { apiPath, APIKey } from "../../constants.js";

export async function postListing(body) {
  try {
    const token = storage.get("token");
    const url = apiPath + "auction/listings";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": APIKey,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    if (data) {
      return data.data.id;
    }
  } catch (err) {
    console.error(err);
  }
}
