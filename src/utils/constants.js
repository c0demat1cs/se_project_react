// Definition of constants used in the project

// Coordinates of Craryville, NY
export const coordinates = { latitude: 42.16558, longitude: -73.65095 };
// OpenWeatherMap API key
export const APIkey = "e9b08885f0396fbd2bb59a999ad84dd5";

// Base URL for the backend API
export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwr.unibutton.com"
    : "http://localhost:3001";
