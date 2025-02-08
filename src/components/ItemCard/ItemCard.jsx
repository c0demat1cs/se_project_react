import "./ItemCard.css"; // import the ItemCard component styles
import CurrentUserContext from "../../contexts/CurrentUserContext";
import React, { useContext } from "react"; // Import the useContext hook

// ItemCard component
function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);
  // check if the item was liked by the current user
  // the likes array should be an arrayof ids
  const isLiked = item.likes.some((id) => id === currentUser._id);

  // create a variable to set in 'ClassName' for the liked button
  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  // function handleLike, call the handleCardLike function and pass it the item data as an argument
  const handleLike = () => {
    onCardLike(item._id);
  };
  // Return the JSX code for the ItemCard component
  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      {isLiked && (
        <button
          onClick={handleLike}
          className={itemLikeButtonClassName}
          type="button"
        ></button>
      )}
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl || ""}
        alt={item.name}
      />
    </li>
  );
}
// Export the ItemCard component
export default ItemCard;
