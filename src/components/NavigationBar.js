import React from "react";
import { NavLink } from "react-router-dom";

function NavigationBar() {
  return (
    <>
      <nav>
        <NavLink to="/" exact activeClassName="active-link">
          Catalog
        </NavLink>
        {"  |  "}
        <NavLink to="/upload" activeClassName="active-link">
          Upload
        </NavLink>
        {"  |  "}
        <NavLink to="/settings" activeClassName="active-link">
          Settings
        </NavLink>
        {"  |  "}
        <NavLink to="/profile" activeClassName="active-link">
          Profile
        </NavLink>
        {/* {"  |  "}
        <NavLink to="/favorites" activeClassName="active-link">Favorites</NavLink> */}
      </nav>
    </>
  );
}

export default NavigationBar;
