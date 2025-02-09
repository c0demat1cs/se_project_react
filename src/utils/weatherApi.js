import { processServerResponse } from "./utils";

//  Functions to fetch weather data from OpenWeatherMap API
export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(processServerResponse);
};

// Function to filter the weather data
export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = {
    F: `${Math.round(data.main.temp)}°F`,
    C: `${Math.round(((data.main.temp - 32) * 5) / 9)}°C`,
  };
  result.type = getWeatherType(data.main.temp); //
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys); // 🔹 FIX: Remove incorrect time conversion
  return result; // Return the filtered weather data from the API response
};

// Determine if it's daytime
const isDay = ({ sunrise, sunset }) => {
  const now = Date.now() / 1000; // Convert milliseconds to seconds
  return sunrise < now && now < sunset;
};

// Function to determine the weather type based on the temperature
const getWeatherType = (temperature) => {
  if (temperature > 86) {
    return "hot";
  } else if (temperature >= 66 && temperature <= 86) {
    return "warm";
  } else {
    return "cold";
  }
};
