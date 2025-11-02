import React from "react";
import { Link } from "react-router-dom";
import "../../static/styles/adminAction.css";
import usersIcon from "../../static/images/users-icon.svg";
import factoryIcon from "../../static/images/factory-icon.svg";

function Admin() {
  return (
    <>
      <Link to="/admin/korisnici" className="nav-link">
        <button type="button" className="admin-action-button">
          <img src={usersIcon} alt="Korisnici" className="admin-action-icon" />
          <span className="admin-action-label">Korisnici</span>
        </button>
      </Link>

      <Link to="/admin/kreiraj-proizvodac" className="nav-link" style={{ marginLeft: 10 }}>
        <button type="button" className="admin-action-button">
          <img src={factoryIcon} alt="Proizvođači" className="admin-action-icon" />
          <span className="admin-action-label">Proizvođači</span>
        </button>
      </Link>
    </>
  );
}

export default Admin;
