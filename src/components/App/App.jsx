import { useEffect, useState } from "react"; // import hooks useState and useEffect

import "./App.css"; // import the App component styles
import Header from "../Header/Header"; // import the Header component
import Main from "../Main/Main"; // import the Main component
import ModalWithForm from "../ModalWithForm/ModalWithForm"; // import the ModalWithForm component
import ItemModal from "../ItemModal/ItemModal"; // import the ItemModal component

import { coordinates, APIkey } from "../../utils/constants"; // import the coordinates and APIkey constants
import { getWeather } from "../../utils/weatherApi"; // import the getWeather function
import { filterWeatherData } from "../../utils/weatherApi"; // import the filterWeatherData function
import Footer from "../Footer/Footer";
import "../../vendor/fonts.css"; // Import the fonts.css file
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext"; // Import the CurrentTemperatureUnitContext context

// App component
function App() {
  // Declare the weatherData state variable
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState(""); // Declare the activeModal state variable
  const [selectedCard, setSelectedCard] = useState({}); // Declare the selectedCard state variable
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F"); // Declare the CurrentTemperatureUnit state variables

  // Function to handle the card click event
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  // Function to handle the add click event
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  // Function to close the active modal
  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  // Fetch the weather data from the OpenWeatherMap API
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        console.log(filteredData);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  // Compute a boolean to determine whether the modal is open
  const isAddGarmentOpen = activeModal === "add-garment";
  const isItemModalOpen = activeModal === "preview";

  // console.log(currentTemperatureUnit);
  // Return the JSX code for the App component
  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Main weatherData={weatherData} handleCardClick={handleCardClick} />
          <Footer />
        </div>
        <ModalWithForm
          title="New garment"
          buttonText="Add garment"
          isOpen={isAddGarmentOpen}
          onClose={closeActiveModal}
        >
          <label htmlFor="name" className="modal__label">
            Name{" "}
            <input
              type="text"
              id="name"
              className="modal__input"
              placeholder="Name"
            />
          </label>
          <label htmlFor="imageUrl" className="modal__label">
            Image{" "}
            <input
              type="url"
              id="imageUrl"
              className="modal__input"
              placeholder="Image URL"
            />
          </label>
          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the weather type:</legend>
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="hot"
                type="radio"
                className="modal__radio-input"
                name="weatherType"
              />
              Hot
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="warm"
                type="radio"
                className="modal__radio-input"
                name="weatherType"
              />
              Warm
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="cold"
                type="radio"
                className="modal__radio-input"
                name="weatherType"
              />
              Cold
            </label>
          </fieldset>
        </ModalWithForm>
        <ItemModal
          isOpen={isItemModalOpen}
          card={selectedCard}
          onClose={closeActiveModal}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}
// Export the App component
export default App;
