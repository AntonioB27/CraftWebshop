import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/auth/Profile";
import Home from "./components/home/Home";
import Footer from "./components/elements/Footer";
import Manufacturers from "./components/home/Manufacturers";
import ManufacturerDetail from "./components/home/ManufacturerDetail";
import Admin from "./components/admin/Admin";
import AdminUsers from "./components/admin/AdminUsers";
import BeerDetail from "./components/home/BeerDetail"; // added import
import AdminCreateBeer from "./components/admin/AdminCreateBeer";
import AdminEditBeer from "./components/admin/AdminEditBeer";
import AdminCreateManufacturer from "./components/admin/AdminCreateManufacturer";
import AdminEditManufacturer from "./components/admin/AdminEditManufacturer";
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

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

        if (res.status === 401 || res.status === 403) {
          // only clear on auth failure
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
            return;
        }

        if (!res.ok) {
          // log but do NOT logout on non-auth errors (e.g. 400/500)
          console.warn("fetchMe non-auth error:", res.status);
          return;
        }

        const data = await res.json();
        if (data?.user) {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
        }
      } catch (err) {
        console.error("fetchMe network error:", err);
      }
    }
    fetchMe();
  }, []);

  return (
    <CartProvider user={user}>
      <WishlistProvider user={user}>
        <Router>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/proizvodi" element={<Home />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/proizvodaci" element={<Manufacturers />} />
            <Route path="/proizvodaci/:id" element={<ManufacturerDetail />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/korisnici" element={<AdminUsers user={user} />} />
            <Route path="/proizvodi/:id" element={<BeerDetail />} />
            <Route path="/admin/kreiraj-pivo" element={<AdminCreateBeer user={user} />} />
            <Route path="/admin/uredi-pivo/:id" element={<AdminEditBeer user={user} />} />
            <Route path="/admin/kreiraj-proizvodac" element={<AdminCreateManufacturer user={user} />} />
            <Route path="/admin/uredi-proizvodaca/:id" element={<AdminEditManufacturer user={user} />} />
          </Routes>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
