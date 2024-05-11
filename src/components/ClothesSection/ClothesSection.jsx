import React from "react";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection() {
  return (
    <div className="clothes-section">
      <div>
        <p className="clothes-section__title">Clothes</p>
        <button className="clothes-section__button">Add New</button>
      </div>
      <ul className="cards__list">
        {defaultClothingItems.map((item) => {
          <ItemCard key={item._id} item={item} />;
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
