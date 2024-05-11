import { useEffect, useState } from "react"; // import hooks useState and useEffect
// import { Routes, Route } from "react-router-dom"; // import the Routes and Route components
import { Routes, Route } from "react-router-dom";
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
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";

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

  // Function to add an item
  const onAddItem = (values) => {
    console.log(values);
    // closeActiveModal();
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
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                />
              }
            />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          closeActiveModal={closeActiveModal}
          onAddItem={onAddItem}
          isAddGarmentOpen={isAddGarmentOpen}
        />
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
