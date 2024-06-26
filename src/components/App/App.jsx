import { useEffect, useState } from "react"; // import hooks useState and useEffect
// import { Routes, Route } from "react-router-dom"; // import the Routes and Route components
import { Routes, Route } from "react-router-dom";
import "./App.css"; // import the App component styles
import Header from "../Header/Header"; // import the Header component
import Main from "../Main/Main"; // import the Main component
// import ModalWithForm from "../ModalWithForm/ModalWithForm"; // import the ModalWithForm component
import ItemModal from "../ItemModal/ItemModal"; // import the ItemModal component
import { coordinates, APIkey } from "../../utils/constants"; // import the coordinates and APIkey constants
import { getWeather } from "../../utils/weatherApi"; // import the getWeather function
import { filterWeatherData } from "../../utils/weatherApi"; // import the filterWeatherData function
import Footer from "../Footer/Footer";
import "../../vendor/fonts.css"; // Import the fonts.css file
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext"; // Import the CurrentTemperatureUnitContext context
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getItems, postItem, deleteItem } from "../../utils/api";

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
  const [clothingItems, setClothingItems] = useState([]); // Declare the clothingItems state variable

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
  // Function to handle the toggle switch change event
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  // Function to add an item
  // add handleAddItemSubmit handler, call correspinding method from api.js
  // and update the clothingItems state variable with an extended copy of the array
  // using the spread operator setClothingItems([item, ...clothingItems]);
  // instead of a handleAddItem function
  const onAddItem = (values) => {
    const { name, imageUrl } = values; // destructure object values
    const weather = weatherData.type; // weather data from state variable
    postItem(name, imageUrl, weather)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  // function to delete an item
  // the card is deleted immediately from the UI
  // create a copy of the array and exclude the deleted card from it.
  // close the item modal window.
  const onDeleteItem = (_id) => {
    deleteItem(_id)
      .then(() => {
        // filter out the deleted item
        const updatedItems = clothingItems.filter((item) => item._id !== _id);
        setClothingItems(updatedItems);
        // close modal
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
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

  // Fetch the clothing items from the API
  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        setClothingItems(data.reverse()); // Update the clothingItems state variable
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
                // pass the clothing items as a prop to the Main component
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            />
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
          onDeleteItem={onDeleteItem}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}
// Export the App component
export default App;
