import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../static/styles/admin.css";
import "../../static/styles/beer.css";

export default function AdminCreateBeer({ user }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || !user.isAdmin) navigate("/");
  }, [user, navigate]);

  const [manufacturers, setManufacturers] = useState([]);
  useEffect(() => {
    async function loadM() {
      try {
        const res = await fetch("/api/manufacturers");
        if (!res.ok) return;
        const data = await res.json();
        setManufacturers(data);
      } catch (e) {
        // ignore
      }
    }
    loadM();
  }, []);

  const [form, setForm] = useState({
    name: "",
    description: "",
    priceEur: "",
    priceHrk: "",
    manufacturer: "",
    abv: "",
    type: "",
    volume: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.manufacturer) {
      setError("Odaberite proizvođača iz padajućeg izbornika.");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const body = {
        name: form.name,
        description: form.description,
        priceEur: parseFloat(form.priceEur) || 0,
        priceHrk: parseFloat(form.priceHrk) || 0,
        abv: form.abv ? parseFloat(form.abv) : undefined,
        volume: form.volume ? parseInt(form.volume, 10) : undefined,
        type: form.type,
        imageUrl: form.imageUrl,
        manufacturer: form.manufacturer,
      };
      const res = await fetch("/api/beers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Request failed (${res.status})`);
      }
      navigate("/proizvodi");
    } catch (err) {
      setError(err.message || "Greška pri stvaranju piva");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="add-beer-container">
      <div className="add-beer-header">
        <h1>Dodaj novo pivo</h1>
        <Link
          to="/proizvodi"
          className="form-button"
          style={{ background: "#ddd", color: "#071222" }}
        >
          ← Natrag
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="add-beer-form">
        <label>
          Ime
          <input name="name" value={form.name} onChange={onChange} required />
        </label>

        <label>
          Proizvođač
          <select
            name="manufacturer"
            value={form.manufacturer}
            onChange={onChange}
            required
          >
            <option value="">-- Odaberite proizvođača --</option>
            {manufacturers.map((m) => (
              <option key={m._id} value={m._id}>
                {m.name}
              </option>
            ))}
          </select>
        </label>

        <label style={{ gridColumn: "1 / -1" }}>
          Opis
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            rows={4}
          />
        </label>

        <label>
          Cijena (EUR)
          <input
            name="priceEur"
            value={form.priceEur}
            onChange={onChange}
            type="number"
            step="0.01"
          />
        </label>

        <label>
          Cijena (HRK)
          <input
            name="priceHrk"
            value={form.priceHrk}
            onChange={onChange}
            type="number"
            step="0.01"
          />
        </label>

        <label>
          ABV (%)
          <input
            name="abv"
            value={form.abv}
            onChange={onChange}
            type="number"
            step="0.1"
          />
        </label>

        <label>
          Tip
          <input name="type" value={form.type} onChange={onChange} />
        </label>

        <label>
          Volumen (ml)
          <input
            name="volume"
            value={form.volume}
            onChange={onChange}
            type="number"
          />
        </label>

        <label style={{ gridColumn: "1 / -1" }}>
          imageUrl (npr. /static/images/beers/1.jpg ili filename)
          <input name="imageUrl" value={form.imageUrl} onChange={onChange} />
        </label>

        {error && <div className="form-error">{error}</div>}

        <div style={{ gridColumn: "1 / -1", display: "flex", gap: 10 }}>
          <button className="form-button" type="submit" disabled={loading}>
            {loading ? "Spremam..." : "Kreiraj pivo"}
          </button>
          <Link
            to="/admin"
            className="form-button"
            style={{ background: "#ddd", color: "#071222" }}
          >
            Otkaži
          </Link>
        </div>
      </form>
    </div>
  );
}
