import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile() {
  return (
    <>
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection />
      </section>
    </>
  );
}

export default Profile;
