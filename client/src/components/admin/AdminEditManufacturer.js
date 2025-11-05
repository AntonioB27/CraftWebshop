import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../../static/styles/admin.css";

export default function AdminEditManufacturer({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.isAdmin) navigate("/");
  }, [user, navigate]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/manufacturers/${id}`);
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.message || "Ne mogu dohvatiti proizvođača");
        }
        const data = await res.json();
        setForm({
          name: data.name || "",
          description: data.description || "",
          imageUrl: data.imageUrl || "",
        });
      } catch (err) {
        setError(err.message || "Greška pri učitavanju podataka");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

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
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/manufacturers/${id}`, {
        method: "PUT",
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

      navigate(`/proizvodaci/${id}`);
    } catch (err) {
      setError(err.message || "Greška pri spremanju");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div style={{ padding: 16 }}>Učitavanje...</div>;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Uredi proizvođača</h1>
        <div>
          <Link to={`/proizvodaci/${id}`} className="details-button" style={{ marginRight: 8 }}>
            ← Povratak
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr" }}>
        <label>
          Naziv
          <input name="name" value={form.name} onChange={onChange} required />
        </label>

        <label>
          Opis
          <textarea name="description" value={form.description} onChange={onChange} rows={4} />
        </label>

        <label>
          imageUrl (opcionalno, npr. /static/images/medvedgrad/logo.png ili puni URL)
          <input name="imageUrl" value={form.imageUrl} onChange={onChange} />
        </label>

        {error && <div className="form-error">{error}</div>}

        <div style={{ display: "flex", gap: 10 }}>
          <button className="details-button" type="submit" disabled={saving}>
            {saving ? "Spremam..." : "Spremi promjene"}
          </button>
          <Link to={`/proizvodaci/${id}`} className="details-button" style={{ background: "#ddd", color: "#071222" }}>
            Otkaži
          </Link>
        </div>
      </form>
    </div>
  );
}