import React from "react";
import { Link } from "react-router-dom";
import "../../static/styles/adminAction.css";
import usersIcon from "../../static/images/users-icon.svg";

function Admin() {
  return (
    <Link to="/admin/korisnici" className="nav-link">
      <button type="button" className="admin-action-button">
        <img src={usersIcon} alt="Korisnici" className="admin-action-icon" />
        <span className="admin-action-label">Korisnici</span>
      </button>
    </Link>
  );
}

export default Admin;