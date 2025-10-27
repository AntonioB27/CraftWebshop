import React, { useEffect, useState } from "react";
import "../../static/styles/home.css";

export default function Home() {
  const [beers, setBeers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currency, setCurrency] = useState("eur");

  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/beers");
        if (!res.ok) throw new Error("Ne mogu dohvatiti piva");
        const data = await res.json();
        data.sort((a, b) => {
          return a.manufacturer.name.localeCompare(b.manufacturer.name);
        });
        setBeers(data);
      } catch (err) {
        setError(err.message || "Greška pri dohvaćanju");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className="loading">Učitavanje piva...</div>;
  if (error) return <div className="error">Greška: {error}</div>;

  const getImgSrc = (beer) => {
    const filename = beer?.imageUrl ? beer.imageUrl.split("/").pop() : "1.jpg";
    return `${API_BASE}/static/images/beers/${filename}`;
  };

  return (
    <>
      <div className="home-container">
        {beers.map((beer) => (
          <div key={beer._id} className="beer-card">
            <div className="beer-image-container">
              <img src={getImgSrc(beer)} alt={beer.name} />
              <div className="beer-description">
                <p>{beer.description || "Nema opisa za ovo pivo."}</p>
              </div>
            </div>
            <h2>{beer.name}</h2>
            <p className="price">
              Cijena: {currency === "eur" ? beer.priceEur : beer.priceHrk}{" "}
              {currency === "eur" ? "EUR" : "HRK"}
            </p>
            <p>Proizvođač: {beer.manufacturer.name}</p>
            <div className="beer-card-actions">
              <a href={`/proizvodi/${beer._id}`} className="details-button">
                Detalji
              </a>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button
          className="currency-button"
          onClick={() => setCurrency(currency === "eur" ? "hrk" : "eur")}
        >
          {currency === "eur" ? "HRK" : "EUR"}
        </button>
      </div>
    </>
  );
}
