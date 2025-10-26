import React from "react";
import { Link } from "react-router-dom";
import beerMug from "../static/images/beer-mug.png";
import { useNavigate } from "react-router-dom";
import "../static/styles/nav.css";
import "../static/styles/footer.css";

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  const isUserAdmin = !!(user && user && user.isAdmin);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <img src={beerMug} alt="beer mug icon" />
        </div>
        <div className="brand">CraftWebshop</div>
      </div>

      <div className="navbar-center">
        <Link to="/proizvodi" className="nav-link">
          <button type="button" className="nav-button primary">
            Proizvodi
          </button>
        </Link>
        <Link to="/proizvodaci" className="nav-link">
          <button type="button" className="nav-button primary">
            Proizvodaci
          </button>
        </Link>
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <Link to="/profile" className="nav-link">
              <button type="button" className="nav-button">
                Profil
              </button>
            </Link>
            <button type="button" onClick={handleLogout} className="nav-button">
              Odjava
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              <button type="button" className="nav-button">
                Prijava
              </button>
            </Link>
            <Link to="/register" className="nav-link">
              <button type="button" className="nav-button">
                Registracija
              </button>
            </Link>
          </>
        )}

        {isUserAdmin && (
          <Link to="/admin" className="nav-link">
            <button type="button" className="nav-button">
              Admin
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
