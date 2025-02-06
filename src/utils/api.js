// set the base url for the api
const BASE_URL = "http://localhost:3001";
import { processServerResponse } from "./utils.js";

// get all items from the api - unprotected
function getItems() {
  return fetch(`${BASE_URL}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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

// edit profile
function editProfile(name, avatar, token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
      avatar: avatar,
    }),
  }).then(processServerResponse);
}

export { getItems, postItem, deleteItem, likeItem, unlikeItem, editProfile };
