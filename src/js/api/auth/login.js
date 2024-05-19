import { loginUrl } from "../../constants.js";
import storage from "../../storage.js";

export async function loginUser(email, password) {
  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      alert("Invalid credentials");
      throw new Error("Invalid credentials");
    }

    const data = await response.json();

    if (data) {
      const { accessToken, ...profile } = data.data;
      storage.save("token", accessToken);
      storage.save("profile", profile);
      localStorage.setItem("isLoggedIn", "true");
      setTimeout(() => {
        window.location.href = "../../../../index.html";
      }, 500);
    } else {
      alert("Incorrect username or password");
      throw new Error("No access token provided");
    }

    return data;
  } catch (error) {
    console.error(error);
  }
}
