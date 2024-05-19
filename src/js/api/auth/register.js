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
    console.log(data);

    if (response.ok) {
      alert("Account created. Please log in.");
      window.location.href = "login.html";
    } else {
      // Handle server errors or validation errors
      alert(data.message || "Registration failed. Please try again.");
    }
    return data;
  } catch (error) {
    console.log(error);
    alert("An error occurred. Please try again.");
  }
}
