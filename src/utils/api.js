// set the base url for the api
const baseUrl = "http://localhost:3001";

// get all items from the api
function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(res);
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
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(res);
  });
}

// delete an item from the api
function deleteItem(_id) {
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(res);
  });
}
export { getItems, postItem, deleteItem };
