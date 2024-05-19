import { APIKey, apiPath } from "../../constants.js";
import storage from "../../storage.js";

export default async function updateAvatar(body) {
  const token = storage.get("token");
  const name = storage.get("profile").name;
  const url = apiPath + "auction/profiles/" + name;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": APIKey,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (error) {
    console.error(error);
    alert(
      "Failed to update avatar. Please check the URL or your network connection and try again.",
    );
  }
}
