import { registerUrl } from "../../constants.js";
import { loginUrl } from "../../constants.js";
import storage from "../../storage.js";

export default async function registration(body) {
  const url = registerUrl;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data) {
      const loginResponse = await fetch(loginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const loginData = await loginResponse.json();

      const { accessToken, ...profile } = loginData.data;
      storage.save("token", accessToken);
      storage.save("profile", profile);
      window.location.href = "/profile/";
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}
