import React from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import "./SideBar.css";

function SideBar() {
  const { currentUser } = React.useContext(CurrentUserContext);
  const avatar = currentUser?.avatar || null;
  const name = currentUser?.name || "Guest";

  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Avatar" />
      <p className="sidebar__username">{name}</p>
      <div className="sidebar__buttons">
        <button className="sidebar__change-profile-button">
          Change profile data
        </button>
        {/* onClick={handleLogout} */}
        <button className="sidebar__signout-button">Sign Out</button>
      </div>
    </div>
  );
}

export default SideBar;
