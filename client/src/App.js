import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/auth/Profile";
import NavBar from "./components/NavBar";
import Home from "./components/home/Home";
import Footer from "./components/elements/Footer";
import Manufacturers from "./components/home/Manufacturers";

function App() {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  return (
    <Router>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proizvodi" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/profile" element={<Profile user={user?.user} />} />
        <Route path="/proizvodaci" element={<Manufacturers />} />
      </Routes>
    <Footer></Footer>
    </Router>
  );
}

export default App;
