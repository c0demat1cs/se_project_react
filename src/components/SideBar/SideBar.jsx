import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import "./SideBar.css";

function SideBar({ handleProfileEditClick, onLogOut }) {
  const { currentUser } = useContext(CurrentUserContext);
  const avatar = currentUser.avatar;
  const name = currentUser.name;

  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Avatar" />
      <p className="sidebar__username">{name}</p>
      <div className="sidebar__buttons">
        <button
          onClick={handleProfileEditClick}
          className="sidebar__change-profile-button"
        >
          Change profile data
        </button>
        <button className="sidebar__signout-button" onClick={onLogOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
