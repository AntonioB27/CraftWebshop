import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../../static/styles/home.css";
import "../../static/styles/beerDetail.css";

export default function ManufacturerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [manufacturer, setManufacturer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_BASE = process.env.REACT_APP_API_URL || "";

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/manufacturers/${id}`);
        if (!res.ok) throw new Error("Ne mogu dohvatiti proizvođača");
        const data = await res.json();
        setManufacturer(data);
      } catch (err) {
        setError(err.message || "Greška pri dohvaćanju");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div className="loading">Učitavanje...</div>;
  if (error) return <div className="error">Greška: {error}</div>;
  if (!manufacturer) return <div className="error">Proizvođač nije pronađen</div>;

  const imgSrc = (m) => {
    const filename = m?.logoUrl ? m.logoUrl.split("/").pop() : "1.jpg";
    return `${API_BASE}/static/images/${filename}`.replace("//static", "/static");
  };

  const isUserAdmin = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return user && user.isAdmin;
    } catch {
      return false;
    }
  };

  async function handleDelete() {
    if (!isUserAdmin()) {
      alert("Nemate ovlasti za brisanje.");
      return;
    }
    const ok = window.confirm("Jeste li sigurni da želite obrisati ovog proizvođača? Ako postoje piva vezana uz proizvođača brisanje nije dozvoljeno.");
    if (!ok) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/manufacturers/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(body.message || `Brisanje nije uspjelo (${res.status})`);
      }
      alert("Proizvođač obrisan.");
      navigate("/proizvodaci");
    } catch (err) {
      alert(err.message || "Greška pri brisanju proizvođača");
      setError(err.message || "Greška pri brisanju proizvođača");
    }
  }

  return (
    <div className="beer-detail-container">
      <Link to="/proizvodaci" className="back-link">← Natrag na proizvođače</Link>

      <div className="beer-detail-card">
        <div className="beer-detail-image" style={{ flex: "0 0 240px" }}>
          <img src={imgSrc(manufacturer)} alt={manufacturer.name} />
        </div>

        <div className="beer-detail-info">
          <h1>{manufacturer.name}</h1>
          {manufacturer.founded && <p><strong>Osnovano:</strong> {manufacturer.founded}</p>}
          {manufacturer.country && <p><strong>Zemlja:</strong> {manufacturer.country}</p>}
          <div style={{ marginTop: 12 }}>
            <h3>Opis</h3>
            <p>{manufacturer.description || "Nema opisa."}</p>
          </div>

          {isUserAdmin() && (
            <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
              <Link to={`/admin/uredi-proizvodaca/${id}`} className="details-button" style={{ background: "#3b82f6" }}>
                Uredi
              </Link>
              <button className="delete-beer-button" onClick={handleDelete}>
                Izbriši proizvođača
              </button>
            </div>
          )}

          {error && <div className="error" style={{ marginTop: 12 }}>{error}</div>}
        </div>
      </div>
    </div>
  );
}