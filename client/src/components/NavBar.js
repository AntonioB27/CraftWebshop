import React from "react";
import { Link } from "react-router-dom";
import beerMug from "../static/images/beer-mug.png";
import { useNavigate } from "react-router-dom";

export default function NavBar({ user, setUser }) {
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  const navigate = useNavigate();

  const isUserAdmin = !!(user && user.user && user.user.isAdmin);

  return (
    <nav className="flex justify-between my-2 items-center bg-blue-950 p-2 shadow-lg">
      <div>
        <img src={beerMug} alt="beer mug icons" className="h-10 w-10 ml-5" />
      </div>
      <div>
        <Link to="/">
          <button
            type="button"
            className="text-white bg-blue-950 py-1.5 px-3 rounded-xl text-xl font-bold hover:bg-yellow-600 hover:shadow-lg transition duration-300"
          >
            Proizvodi
          </button>
        </Link>

        {user ? (
          <>
            <Link to="/profile">
              <button
                type="button"
                className="text-white bg-blue-950 py-1.5 px-3 rounded-xl text-xl font-bold hover:bg-yellow-600 hover:shadow-lg transition duration-300"
              >
                Profil
              </button>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="text-white bg-blue-950 py-1.5 px-3 rounded-xl text-xl font-bold hover:bg-yellow-600 hover:shadow-lg transition duration-300"
            >
              Odjava
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button
                type="button"
                className="text-white bg-blue-950 py-1.5 px-3 rounded-xl text-xl font-bold hover:bg-yellow-600 hover:shadow-lg transition duration-300"
              >
                Prijava
              </button>
            </Link>
            <Link to="/register">
              <button
                type="button"
                className="text-white bg-blue-950 py-1.5 px-3 rounded-xl text-xl font-bold hover:bg-yellow-600 hover:shadow-lg transition duration-300"
              >
                Registracija
              </button>
            </Link>
          </>
        )}
      </div>

      <div className="mr-5 text-white text-2xl font-bold">CraftWebshop</div>

      {isUserAdmin && (
        <div className="ml-5 text-yellow-400 text-lg font-bold">Admin</div>
      )}
    </nav>
  );
}