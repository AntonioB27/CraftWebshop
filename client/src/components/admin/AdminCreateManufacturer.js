import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../static/styles/admin.css";

export default function AdminCreateManufacturer({ user }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || !user.isAdmin) navigate("/");
  }, [user, navigate]);

  const [form, setForm] = useState({ name: "", description: "", imageUrl: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) {
      setError("Naziv je obavezan.");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/manufacturers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Request failed (${res.status})`);
      }
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Greška pri stvaranju proizvođača");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="edit-beer-container">
      <div className="edit-beer-header">
        <h1>Dodaj proizvođača</h1>
        <div>
          <Link to="/admin" className="details-button" style={{ marginRight: 8 }}>
            ← Natrag
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="edit-beer-form">
        <label>
          Naziv
          <input name="name" value={form.name} onChange={onChange} required />
        </label>

        <label>
          Opis
          <textarea name="description" value={form.description} onChange={onChange} rows={3} />
        </label>

        <label>
          imageUrl (opcionalno, npr. /static/images/medvedgrad/logo.png ili puni URL)
          <input name="imageUrl" value={form.imageUrl} onChange={onChange} />
        </label>

        {error && <div className="form-error">{error}</div>}

        <div style={{ display: "flex", gap: 10 }}>
          <button className="details-button" type="submit" disabled={loading}>
            {loading ? "Spremam..." : "Kreiraj proizvođača"}
          </button>
          <Link to="/admin" className="details-button" style={{ background: "#ddd", color: "#071222" }}>
            Otkaži
          </Link>
        </div>
      </form>
    </div>
  );
}