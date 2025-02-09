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
    isLiked ? "card__like-button_active" : "card__like-button_inactive"
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  if (!item._id) {
    console.error("Error: item._id is undefined in handleLike");
    return;
  }

  // function handleLike, call the handleCardLike function and pass it the item data as an argument
  const handleLike = () => {
    onCardLike(item._id, isLiked);
  };
  // Return the JSX code for the ItemCard component
  return (
    <li className="card">
      <div className="card__info_container">
        <h2 className="card__name">{item.name}</h2>
        <button
          onClick={handleLike}
          className={itemLikeButtonClassName}
          type="button"
        ></button>
      </div>
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
