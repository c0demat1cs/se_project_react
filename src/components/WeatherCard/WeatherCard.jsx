import React, { useContext } from "react"; // Import
import sunny from "../../assets/sunny.png"; // Import the sunny image
import "./WeatherCard.css"; // Import the WeatherCard component styles
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

// WeatherCard component
function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]}
      </p>
      <img src={sunny} alt="Sunny" className="weather-card__image" />
    </section>
  );
}
// Export the WeatherCard component
export default WeatherCard;
