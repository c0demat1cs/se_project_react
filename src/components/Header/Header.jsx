import "./Header.css"; // Import the Header component styles
import logo from "../../assets/logo.svg"; // Import the logo image
import avatar from "../../assets/avatar.png"; // Import the avatar image

// Header component
function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  // Return the JSX code for the Header component
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Header Logo" />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-button"
      >
        + Add Clothes
      </button>
      <div className="header__user_container">
        <p className="header__username">Terence Tegegne</p>
        <img src={avatar} alt="User Photo" className="header__avatar" />
      </div>
    </header>
  );
}
// Export the Header component
export default Header;
