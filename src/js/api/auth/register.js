import { registerUrl } from "../../constants.js";

export default async function registration(body) {
  const url = registerUrl;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Account created. Please log in.");
      window.location.href = "login.html";
    } else {
      alert(data.errors[0].message || "Registration failed. Please try again.");
    }
    return data;
  } catch (error) {
    console.error(error);
    alert("An error occurred. Please try again.");
  }
}
