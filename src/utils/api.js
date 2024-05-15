// set the base url for the api
const baseUrl = "http://localhost:3001";
import { processServerResponse } from "./utils.js";

// get all items from the api
function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

// post items to the api
function postItem(name, imageURL, weather) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name, imageUrl: imageURL, weather: weather }),
  }).then(processServerResponse);
}

// delete an item from the api
function deleteItem(_id) {
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
  }).then(processServerResponse);
}
export { getItems, postItem, deleteItem };
