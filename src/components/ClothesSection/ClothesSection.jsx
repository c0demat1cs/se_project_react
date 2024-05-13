import React from "react";
// import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ onCardClick, clothingItems }) {
  console.log(clothingItems);
  return (
    <div className="clothes-section">
      <div className="clothes-section__container">
        <p className="clothes-section__title">Your Items</p>
        <button className="clothes-section__button">+ Add New</button>
      </div>
      <ul className="clothes-section__cards">
        {clothingItems.map((item) => {
          // slide added temporarily to debug profile .slice(0, -7)
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
