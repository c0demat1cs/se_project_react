const TOKEN_KEY = "jwt";

// setToken accepts the token as an argument, adds it to
// localStorage, and returns the TOKEN_KEY
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);

// getTOken retrieves and returns the value associated with the TOKEN_KEY from localStorage
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// remove JWT from local storage
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
