import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import beerMug from './static/images/beer-mug.png';

function App() {
  const [backendData, setData] = useState([{}]);

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Router>
      <nav className="flex justify-between my-2 items-center bg-blue-950 p-2 shadow-lg">
      <div>
        <img src={beerMug} alt="beer mug icons" className="h-10 w-10 ml-5"/>
      </div>
        <div>
          <Link to="/">
            <button
              type="button"
              className="text-white bg-yellow-500 m-2 py-1.5 px-3 rounded-xl text-xl font-bold hover:bg-yellow-600 hover:shadow-lg transition duration-300">
              Home
            </button>
          </Link>
          <Link to="/login">
            <button
              type="button"
              className="text-white bg-yellow-500 m-2 py-1.5 px-3 rounded-xl text-xl font-bold hover:bg-yellow-600 hover:shadow-lg transition duration-300">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button
              type="button"
              className="text-white bg-yellow-500 m-2 py-1.5 px-3 rounded-xl text-xl font-bold hover:bg-yellow-600 hover:shadow-lg transition duration-300">
              Register
            </button>
          </Link>
        </div>
        <div className="mr-5 text-white text-2xl font-bold">
          CraftWebshop
        </div>
      </nav>
      
    </Router>
  );
}

export default App;
