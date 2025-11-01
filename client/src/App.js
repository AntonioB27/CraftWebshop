import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/auth/Profile";
import Home from "./components/home/Home";
import Footer from "./components/elements/Footer";
import Manufacturers from "./components/home/Manufacturers";
import Admin from "./components/admin/Admin";
import AdminUsers from "./components/admin/AdminUsers";
import BeerDetail from "./components/home/BeerDetail"; // added import
import AdminCreateBeer from "./components/admin/AdminCreateBeer";

function App() {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    async function fetchMe() {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await fetch("/api/users/fetch", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          // invalid token -> clear
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
          return;
        }
        const data = await res.json();
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } catch (err) {
        console.error("fetchMe:", err);
      }
    }
    fetchMe();
  }, []);

  return (
    <Router>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proizvodi" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/proizvodaci" element={<Manufacturers />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/korisnici" element={<AdminUsers user={user} />} />
        <Route path="/proizvodi/:id" element={<BeerDetail />} />
        <Route path="/admin/kreiraj-pivo" element={<AdminCreateBeer user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
