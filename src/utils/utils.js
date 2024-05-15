// code for processing the server response
const processServerResponse = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(`Error: ${response.status}`);
  }
};

export { processServerResponse };
