import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  handleEditProfileClick,
  onCardLike,
  onLogOut,
}) {
  return (
    <>
      <section className="profile__sidebar">
        <SideBar
          handleProfileEditClick={handleEditProfileClick}
          onLogOut={onLogOut}
        />
        <section className="profile__clothes-section"></section>
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </>
  );
}
export default Profile;
