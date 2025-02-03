import "./Header.css"; // Import the Header component styles
import logo from "../../assets/logo.svg"; // Import the logo image
import avatar from "../../assets/avatar.png"; // Import the avatar image
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch"; // Import the ToggleSwitch component
import { Link } from "react-router-dom";
// Header component
function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  // Return the JSX code for the Header component
  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img src={logo} className="header__logo" alt="Header Logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      {/* Add the ToggleSwitch component */}
      <ToggleSwitch />
      {/* Add a button to add clothes */}
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-button"
      >
        + Add Clothes
      </button>
      <div className="header__user_container">
        <Link to="/profile" className="header__profile-link">
          <p className="header__username">Terence Tegegne</p>
        </Link>
        <img src={avatar} alt="User Photo" className="header__avatar" />
      </div>
    </header>
  );
}
// Export the Header component
export default Header;
