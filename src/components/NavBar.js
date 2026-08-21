import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold" to="/verses">
          FaithVerse Tracker
        </NavLink>

        <div className="navbar-nav ms-auto">
          <NavLink className="nav-link" to="/verses">
            Verse List
          </NavLink>

          <NavLink className="nav-link" to="/verses/create">
            Add Verse
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
