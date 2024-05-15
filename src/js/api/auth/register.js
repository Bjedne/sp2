import { registerUrl } from "../../constants.js";
/* import storage from "../../storage.js"; */

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
      console.log(data);
      /* const loginUrl = config.BaseURL + "auth/login"
            const loginResponse = await fetch(loginUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

            console.log(loginResponse)
            const loginData = await loginResponse.json()

            console.log(loginData)
            const {accessToken, ...profile} = loginData.data;
            storage.save("token", accessToken)
            storage.save("profile", profile)
            window.location.href ="/pages/profile/" */
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}
