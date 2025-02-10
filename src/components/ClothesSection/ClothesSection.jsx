import React, { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  onCardLike,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  console.log("Current User:", currentUser);
  console.log("Current User _id:", currentUser?._id);
  console.log("Clothing Items:", clothingItems);

  // Filter clothing items to only show the items added by the current user
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );
  console.log("user items", userItems);

  // debuggin logs
  console.log("Current User:", currentUser);
  console.log("Clothing Items:", clothingItems);

  return (
    <div className="clothes-section">
      <div className="clothes-section__container">
        <p className="clothes-section__title">Your Items</p>
        <button onClick={handleAddClick} className="clothes-section__button">
          + Add New
        </button>
      </div>
      <ul className="clothes-section__cards">
        {userItems.length > 0 ? (
          userItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          ))
        ) : (
          <p className="clothes-section__empty">No items added yet.</p>
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;
