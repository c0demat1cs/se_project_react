import React, { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";

function ClothesSection({ onCardClick, clothingItems, handleAddClick }) {
  const { currentUser } = useContext(CurrentUserContext);

  // Filter clothing items to only show the items added by the current user
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );

  // debuggin logs
  console.log("Current User:", currentUser);
  console.log("Clothing Items:", clothingItems);
  console.log(
    "Filtered User Items:",
    clothingItems.filter((item) => item.owner === currentUser._id)
  );

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
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))
        ) : (
          <p className="clothes-section__empty">No items added yet.</p>
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;
