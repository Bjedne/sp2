import { APIKey, apiPath } from "../../constants.js";
import storage from "../../storage.js";

export default async function updateAvatar(body) {
  const token = storage.get("token");
  const name = storage.get("profile").name;
  const url = apiPath + "auction/profiles/" + name;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": APIKey,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  location.reload();
  console.log(data);
}
