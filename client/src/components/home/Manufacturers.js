import React, { useEffect, useState } from "react";
import "../../static/styles/home.css";

export default function Home() {
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE = process.env.REACT_APP_API_URL;

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
    return `${API_BASE}/static/images/${filename}`;
  };

  return (
    <>
      <div className="home-container">
        {manufacturers.map((manufacturer) => (
          <div key={manufacturer._id} className="beer-card">
            <div className="beer-image-container">
              <img src={getImgSrc(manufacturer)} alt={manufacturer.name} />
              <div className="beer-description">
                <p>{manufacturer.description || "Nema opisa za ovo pivo."}</p>
              </div>
            </div>
            <h1>{manufacturer.name}</h1>
            <p>Otvoreno: {manufacturer.founded}</p>
            <p>Zemlja: {manufacturer.country}</p>
          </div>
        ))}
      </div>
    </>
  );
}
