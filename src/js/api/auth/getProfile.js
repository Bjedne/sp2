import storage from "../../storage.js";
import { apiPath, APIKey } from "../../constants.js";

export default async function getProfile() {
  try {
    const token = storage.get("token");
    const name = storage.get("profile").name;
    const url = apiPath + "auction/profiles/" + name;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": APIKey,
      },
    });

    const data = await response.json();

    if (data) {
      return data.data;
    }
  } catch (err) {
    console.error(err);
  }
}
