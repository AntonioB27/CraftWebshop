import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../../static/styles/home.css";
import "../../static/styles/beerDetail.css";

export default function BeerDetail() {
  const { id } = useParams();
  const [beer, setBeer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/beers/${id}`);
        if (!res.ok) throw new Error("Ne mogu dohvatiti pivo");
        const data = await res.json();
        setBeer(data);
      } catch (err) {
        setError(err.message || "Greška pri dohvaćanju piva");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div className="loading">Učitavanje...</div>;
  if (error) return <div className="error">Greška: {error}</div>;
  if (!beer) return <div className="error">Pivo nije pronađeno</div>;

  const getImgSrc = (b) => {
    const filename = b?.imageUrl ? b.imageUrl.split("/").pop() : "1.jpg";
    return `${API_BASE}/static/images/beers/${filename}`;
  };

  const isUserAdmin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.isAdmin;
  };

  async function handleDelete() {
    if (isUserAdmin() === false) {
      alert("Nemate ovlasti za brisanje piva.");
      setError("Nemate ovlasti za brisanje piva.");
      return;
    }
    const confirm = window.confirm(
      "Jeste li sigurni da želite izbrisati ovo pivo?"
    );
    if (!confirm) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/beers/${beer._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Brisanje nije uspjelo");
      alert("Pivo je uspješno izbrisano.");
      window.location.href = "/proizvodi";
    } catch (err) {
      alert(err.message || "Greška pri brisanju piva");
      setError(err.message || "Greška pri brisanju piva");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="beer-detail-container">
      <Link to="/proizvodi" className="back-link">
        ← Natrag na proizvode
      </Link>

      <div className="beer-detail-card">
        <div className="beer-detail-image">
          <img src={getImgSrc(beer)} alt={beer.name} />
        </div>

        <div className="beer-detail-info">
          <h1>{beer.name}</h1>
          <p className="price">
            Cijena: {beer.priceEur} EUR / {beer.priceHrk} HRK
          </p>
          <p>
            <strong>Proizvođač:</strong> {beer.manufacturer?.name}
          </p>
          {beer.abv && (
            <p>
              <strong>ABV:</strong> {beer.abv}%
            </p>
          )}
          {beer.type && (
            <p>
              <strong>Tip:</strong> {beer.type}
            </p>
          )}
          {beer.volume && (
            <p>
              <strong>Volumen:</strong> {beer.volume} ml
            </p>
          )}
          <div className="beer-full-description">
            <h3>Opis</h3>
            <p>{beer.description || "Nema dodatnog opisa."}</p>
          </div>
          {isUserAdmin() && (
            <div className="admin-actions">
              <Link
                to={`/admin/uredi-pivo/${beer._id}`}
                className="details-button"
              >
                Uredi
              </Link>
            </div>
          )}
        </div>
        {isUserAdmin() && (
          <div className="admin-actions">
            <button className="delete-beer-button" onClick={handleDelete}>
              Izbriši Pivo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
