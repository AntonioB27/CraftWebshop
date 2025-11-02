import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../static/styles/home.css";

export default function Manufacturers() {
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE = process.env.REACT_APP_API_URL || "";

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/manufacturers");
        if (!res.ok) throw new Error("Ne mogu dohvatiti proizvođaće");
        const data = await res.json();
        setManufacturers(data);
      } catch (err) {
        setError(err.message || "Greška pri dohvaćanju");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className="loading">Učitavanje proizvođaća...</div>;
  if (error) return <div className="error">Greška: {error}</div>;

  const getImgSrc = (manufacturer) => {
    const filename = manufacturer?.logoUrl ? manufacturer.logoUrl.split("/").pop() : "1.jpg";
    return `${API_BASE}/static/images/${filename}`.replace("//static", "/static");
  };

  return (
    <>
      <div className="home-container">
        {manufacturers.map((manufacturer) => (
          <div key={manufacturer._id} className="beer-card">
            <div className="beer-image-container">
              <img src={getImgSrc(manufacturer)} alt={manufacturer.name} />
              <div className="beer-description">
                <p>{manufacturer.description || "Nema opisa."}</p>
              </div>
            </div>
            <h1>{manufacturer.name}</h1>
            {manufacturer.founded && <p>Osnovano: {manufacturer.founded}</p>}
            {manufacturer.country && <p>Zemlja: {manufacturer.country}</p>}

            <div style={{ marginTop: 10 }}>
              <Link to={`/proizvodaci/${manufacturer._id}`} className="details-button">
                Detalji
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
