import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({ onCardClick, clothingItems }) {
  return (
    <>
      <section className="profile__sidebar">
        <SideBar />
        <section className="profile__clothes-section"></section>
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
        />
      </section>
    </>
  );
}

export default Profile;
