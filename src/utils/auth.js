// specify the BASE_URL for the backend server
export const BASE_URL = "http://localhost:3001";
import { processServerResponse } from "./utils";

// /users/me to check the token
function getUserInfo(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

// post items to the api - protected
function postItem(name, imageURL, weather, token) {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
      imageUrl: imageURL,
      weather: weather,
    }),
  }).then(processServerResponse);
}

// delete an item from the api - protected
function deleteItem(_id, token) {
  return fetch(`${BASE_URL}/items/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
}

// like item - protected
function likeItem(_id, token) {
  return fetch(`${BASE_URL}/items/${_id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
}

// unlike item - protected
function unlikeItem(_id, token) {
  return fetch(`${BASE_URL}/items/${_id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
}

export { getUserInfo, postItem, deleteItem, likeItem, unlikeItem };
