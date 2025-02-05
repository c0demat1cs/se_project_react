import { useEffect, useState } from "react"; // import hooks useState and useEffect
// import { Routes, Route } from "react-router-dom"; // import the Routes and Route components
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./App.css"; // import the App component styles
import Header from "../Header/Header"; // import the Header component
import Main from "../Main/Main"; // import the Main component
// import ModalWithForm from "../ModalWithForm/ModalWithForm"; // import the ModalWithForm component
import ItemModal from "../ItemModal/ItemModal"; // import the ItemModal component
import { coordinates, APIkey } from "../../utils/constants"; // import the coordinates and APIkey constants
import { getWeather, filterWeatherData } from "../../utils/weatherApi"; // import the getWeather function
import Footer from "../Footer/Footer";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext"; // Import the CurrentTemperatureUnitContext context
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute";
import { getItems, register, authorize } from "../../utils/api";
import { getToken, setToken } from "../../utils/token";
import * as auth from "../../utils/auth";
import * as api from "../../utils/api";
import "../../vendor/fonts.css"; // Import the fonts.css file

// App component
function App() {
  // invoke the navigate hook
  const navigate = useNavigate();
  // invoke the location hook.
  const location = useLocation();
  // Declare the weatherData state variable
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [currentUser, setCurrentUser] = useState({ name: "", avatar: "" }); // Declare the currentUser state variable
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Declare the isLoggedIn state variable
  const [clothingItems, setClothingItems] = useState([]); // Declare the clothingItems state variable
  const [activeModal, setActiveModal] = useState(""); // Declare the activeModal state variable
  const [selectedCard, setSelectedCard] = useState({}); // Declare the selectedCard state variable
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F"); // Declare the CurrentTemperatureUnit state variables

  // check the token
  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    // call the function, passing it the JWT
    auth
      .getUserInfo(jwt)
      .then(({ name, email }) => {
        // if response is successful, log in user, and
        // save their data to state, and
        // navigate them to /ducks.
        setIsLoggedIn(true);
        setCurrentUser({ name, email });
      })
      .catch(console.error);
  }, []);

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
        // console.log(filteredData);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  // Fetch the clothing items from the API
  useEffect(() => {
    getItems()
      // pull the value of the data property
      // and assign to variable called data
      .then((items) => {
        // make use of data
        // console.log(data);
        setClothingItems(items.data.reverse()); // Update the clothingItems state variable
      })
      .catch(console.error);
  }, []);

  // function for processing registration.
  // after successful registration, close the modal and sign in the user.
  const handleRegistration = ({ email, password, name, avatar }) => {
    auth
      .register(name, avatar, email, password)
      .then(() => {
        closeActiveModal();
        handleLogin({ email, password });
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  // configure user authorization.
  // createa  function to pass the necessary data to the /signin request.
  // if a log-in is successful, check that the server gave access in its response
  // and add it to local storage.
  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.jwt) {
          setToken(data.jwt); // save the token to local storage
          localStorage.setItem("jwt", data.token);
          setIsLoggedIn(true);
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  // handle Logout
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUserData({ name: "", avatar: "" });
    navigate("/");
  };

  // Compute a boolean to determine whether the modal is open
  const isAddGarmentOpen = activeModal === "add-garment";
  const isItemModalOpen = activeModal === "preview";
  // add the isLoggedIn variable to App's state with a boolean value to check if the user is authorized
  const isRegisterOpen = activeModal === "register";

  // console.log(currentTemperatureUnit);
  // Return the JSX code for the App component
  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              handleLogOut={handleLogout}
            />
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
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                    />
                  </ProtectedRoute>
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
          <RegisterModal />
          <LoginModal />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

// Export the App component
export default App;
