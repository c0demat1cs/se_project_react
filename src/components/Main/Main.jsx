import "./Main.css"; // Import the Main component styles
import WeatherCard from "../WeatherCard/WeatherCard"; // Import the WeatherCard component
import ItemCard from "../ItemCard/ItemCard"; // Import the ItemCard component
// import { defaultClothingItems } from "../../utils/constants"; // Import the defaultClothingItems array
import "../../vendor/fonts.css"; // Import the fonts.css
import React, { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

// Main component
function Main({ weatherData, handleCardClick, clothingItems, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <div className="clothes-section">
        <section className="cards">
          <p className="cards__text">
            Today is {weatherData.temp[currentTemperatureUnit]} / You may want
            to wear:{" "}
          </p>
          <ul className="cards__list">
            {clothingItems
              .filter((item) => {
                console.log(item.weather === weatherData.type);
                return item.weather === weatherData.type;
              })
              .map((item) => {
                return (
                  <ItemCard
                    key={item._id}
                    item={item}
                    onCardClick={handleCardClick}
                    onCardLike={onCardLike}
                  />
                );
              })}
          </ul>
        </section>
      </div>
    </main>
  );
}
// Export the Main component
export default Main;
