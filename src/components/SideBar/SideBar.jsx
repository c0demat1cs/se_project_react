import React from "react";
import avatar from "../../assets/avatar.png";

import "./SideBar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default Avatar" />
      <p className="sidebar__username">Terence Tegegne</p>
      {/* onClick={handleLogout} */}
      <button className="header__signout-button">Sign Out</button>
    </div>
  );
}

export default SideBar;
