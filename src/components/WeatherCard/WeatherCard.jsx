import React, { useContext } from "react"; // Import
import daySunny from "../../assets/day-sunny.png"; // Import the sunny image
import dayCloudy from "../../assets/day-cloudy.png"; // Import the cloudy image
import dayRain from "../../assets/day-rain.png"; // Import the rainy image
import dayFog from "../../assets/day-fog.png"; // Import the foggy image
import daySnow from "../../assets/day-snow.png"; // Import the snowy image
import dayStorm from "../../assets/day-storm.png"; // Import the stormy image
import nightClear from "../../assets/night-clear.png"; // Import the clear night image
import nightCloudy from "../../assets/night-cloudy.png"; // Import the cloudy night image
import nightRain from "../../assets/night-rain.png"; // Import the rainy night image
import nightFog from "../../assets/night-fog.png"; // Import the foggy night image
import nightSnow from "../../assets/night-snow.png"; // Import the snowy night image
import nightStorm from "../../assets/night-storm.png"; // Import the stormy night image
import "./WeatherCard.css"; // Import the WeatherCard component styles
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

// Object with weather images
const weatherImages = {
  day: {
    clear: daySunny,
    clouds: dayCloudy,
    rain: dayRain,
    drizzle: dayRain,
    fog: dayFog,
    mist: dayFog,
    haze: dayFog,
    snow: daySnow,
    thunderstorm: dayStorm,
  },
  night: {
    clear: nightClear,
    clouds: nightCloudy,
    rain: nightRain,
    drizzle: nightRain,
    fog: nightFog,
    mist: nightFog,
    haze: nightFog,
    snow: nightSnow,
    thunderstorm: nightStorm,
  },
};

// WeatherCard component
function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // Determine whether it's day or night
  const timeOfDay = weatherData.isDay ? "day" : "night";

  // Get the correct image based on weather condition
  const weatherImage =
    weatherImages[timeOfDay][weatherData.condition] ||
    (weatherData.isDay ? daySunny : nightClear); // Default to sunny image

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]}
      </p>
      <img
        src={weatherImage}
        alt={weatherData.condition}
        className="weather-card__image"
      />
    </section>
  );
}

// Export the WeatherCard component
export default WeatherCard;
