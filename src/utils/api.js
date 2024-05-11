// set the base url for the api
const baseUrl = "http://localhost:3001";

// get all items from the api
function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(res);
  });
}

export { getItems };
