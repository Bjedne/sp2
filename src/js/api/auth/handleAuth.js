export const addAuthToken = (token) => {
  localStorage.setItem("access-token", token);
};
export const addUserName = (name) => {
  localStorage.setItem("name", name);
};

export const getAuthToken = () => {
  const accessToken = localStorage.getItem("access-token");
  return accessToken;
};

export function headers() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAuthToken()}`,
  };
}

export async function authFetch(url, options) {
  return fetch(url, {
    ...options,
    headers: headers(),
  });
}
