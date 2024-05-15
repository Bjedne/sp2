export const apiUrl = new URL("https://v2.api.noroff.dev");
export const apiPath = apiUrl.toString();

export const registerUrl = `${apiPath}auth/register`;
export const loginUrl = `${apiPath}auth/login`;
