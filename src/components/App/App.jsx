import { useEffect, useState } from "react"; // import hooks useState and useEffect
// import { Routes, Route } from "react-router-dom"; // import the Routes and Route components
import { Routes, Route, useNavigate } from "react-router-dom";
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
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";
import ProtectedRoute from "../ProtectedRoute";
import { getItems, editProfile } from "../../utils/api";
import { getToken, removeToken, setToken } from "../../utils/token";
import * as auth from "../../utils/auth";
import * as api from "../../utils/api";
import "../../vendor/fonts.css"; // Import the fonts.css file

// App component
function App() {
  // invoke the navigate hook
  const navigate = useNavigate();

  // Declare the weatherData state variable
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [currentUser, setCurrentUser] = useState(null); // Declare the currentUser state variable
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Declare the isLoggedIn state variable
  const [clothingItems, setClothingItems] = useState([]); // Declare the clothingItems state variable
  const [activeModal, setActiveModal] = useState(""); // Declare the activeModal state variable
  const [selectedCard, setSelectedCard] = useState({}); // Declare the selectedCard state variable
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F"); // Declare the CurrentTemperatureUnit state variables

  console.log("===============================");
  console.log(clothingItems);

  // check the token
  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    // call the function, passing it the JWT
    getUserInfo();
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

  // function to handle the registration click event
  const handleRegisterClick = () => {
    setActiveModal("register");
  };
  // function to handle the login click event
  const handleLoginClick = () => {
    setActiveModal("login");
  };

  // function to handle edit profile click event
  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
    setCurrentUser(currentUser);
    console.log(currentUser);
  };

  const handleOpenDelete = () => {
    setActiveModal("delete-item");
  };

  // Function to close the active modal
  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return; // Stop if no modal is open
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscClose); // Add event listener
    return () => {
      document.removeEventListener("keydown", handleEscClose); // Cleanup listener
    };
  }, [activeModal]); // Runs only when activeModal changes

  // Function to handle the toggle switch change event
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  // function to get user info
  function getUserInfo() {
    const token = getToken();
    auth
      .getUserInfo(token)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
        closeActiveModal();
      })
      .catch(console.error);
  }

  const handleCardLike = (id, isLiked) => {
    const token = getToken();
    console.log("user token:", token);
    console.log("card id:", id);
    console.log("isLiked:", isLiked);
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        api
          // the first argument is the card's id
          .likeItem(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
            console.log("Updated (liked) card from API:", updatedCard.data);
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        api
          // the first argument is the card's id
          .unlikeItem(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
            console.log("Updated (unliked) card from API:", updatedCard.data);
          })
          .catch(console.error);
  };

  const onAddItem = (values) => {
    const { name, imageUrl, weather } = values; // destructure object values
    const token = getToken(); // get the token from local storage
    api
      .postItem(name, imageUrl, weather, token)
      .then((res) => {
        setClothingItems((prevItems) => [res.data, ...prevItems]);
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
    const token = getToken();
    api
      .deleteItem(_id, token)
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
      .then((data) => {
        console.log("Fetched clothing items after user update:", data);
        setClothingItems(data.reverse()); // Preserve the latest order
      })
      .catch(console.error);
  }, []); // Re-fetch when `currentUser` updates

  // function for processing registration.
  // after successful registration, close the modal and sign in the user.
  const onRegistration = ({ email, password, name, avatar }) => {
    auth
      .register(name, avatar, email, password)
      .then(() => {
        closeActiveModal();
        onLogin({ email, password });
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  // configure user authorization.
  // createa  function to pass the necessary data to the /signin request.
  // if a log-in is successful, check that the server gave access in its response
  // and add it to local storage.
  const onLogin = ({ email, password }) => {
    if (!email || !password) return;
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token); // Save the token to local storage
          localStorage.setItem("jwt", data.token);
          getUserInfo();
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  // function to edit the user profile
  // current user's data should be filled in the form.
  // make an API call that sends new user name and the avatar URL to the server.
  const onEditProfile = ({ name, avatar }) => {
    const token = getToken();
    editProfile(name, avatar, token)
      .then((updatedUser) => {
        setCurrentUser((prevUser) => ({
          ...prevUser, // Keep existing properties
          name: updatedUser.name,
          avatar: updatedUser.avatar,
        }));
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error editing profile:", error);
      });
  };

  // handle Logout
  function handleLogOut() {
    removeToken();
    navigate("/");
    setIsLoggedIn(false);
    setCurrentUser(null);
  }

  // Compute a boolean to determine whether the modal is open
  const isAddGarmentOpen = activeModal === "add-garment";
  const isItemModalOpen = activeModal === "preview";
  const isRegisterOpen = activeModal === "register";
  const isLoginOpen = activeModal === "login";
  const isEditProfileOpen = activeModal === "edit-profile";
  const isDeleteItemOpen = activeModal === "delete-item";

  // console.log(currentTemperatureUnit);
  // Return the JSX code for the App component
  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider
        value={{ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              handleLoginClick={handleLoginClick}
              handleRegisterClick={handleRegisterClick}
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
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardLike={handleCardLike}
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      handleEditProfileClick={handleEditProfileClick}
                      onLogOut={handleLogOut}
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
            handleOpenDelete={handleOpenDelete}
          />
          <RegisterModal
            isRegisterOpen={isRegisterOpen}
            onRegistration={onRegistration}
            closeActiveModal={closeActiveModal}
            handleLoginClick={handleLoginClick}
          />
          <LoginModal
            isLoginOpen={isLoginOpen}
            onLogin={onLogin}
            closeActiveModal={closeActiveModal}
            handleRegisterClick={handleRegisterClick}
          />
          <EditProfileModal
            isEditProfileOpen={isEditProfileOpen}
            onEditProfile={onEditProfile}
            closeActiveModal={closeActiveModal}
          />
          <DeleteItemModal
            card={selectedCard}
            isOpen={isDeleteItemOpen}
            onDeleteItem={onDeleteItem}
            closeActiveModal={closeActiveModal}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

// Export the App component
export default App;
