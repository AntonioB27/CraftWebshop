import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../../static/styles/beerEdit.css";

export default function AdminEditBeer({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.isAdmin) navigate("/");
  }, [user, navigate]);

  const [manufacturers, setManufacturers] = useState([]);
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [mRes, bRes] = await Promise.all([
          fetch("/api/manufacturers"),
          fetch(`/api/beers/${id}`),
        ]);

        if (mRes.ok) {
          const mData = await mRes.json();
          setManufacturers(mData);
        }

        if (!bRes.ok) {
          const err = await bRes.json().catch(() => ({}));
          throw new Error(err.message || "Ne mogu dohvatiti pivo");
        }
        const bData = await bRes.json();
        setForm({
          name: bData.name || "",
          description: bData.description || "",
          priceEur: bData.priceEur ?? "",
          priceHrk: bData.priceHrk ?? "",
          manufacturer: bData.manufacturer?._id || "",
          abv: bData.abv ?? "",
          type: bData.type || "",
          volume: bData.volume ?? "",
          imageUrl: bData.imageUrl || "",
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
    if (!form.manufacturer) {
      setError("Odaberite proizvođača.");
      return;
    }
    setSaving(true);
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

      const res = await fetch(`/api/beers/${id}`, {
        method: "PUT",
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

      navigate("/proizvodi/" + id);
    } catch (err) {
      setError(err.message || "Greška pri spremanju");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div style={{ padding: 16 }}>Učitavanje...</div>;
  if (error) return <div style={{ padding: 16, color: "crimson" }}>Greška: {error}</div>;

  return (
    <div className="edit-beer-container">
      <div className="edit-beer-header">
        <h1>Uredi pivo</h1>
        <div>
          <Link to={`/proizvodi/${id}`} className="details-button" style={{ marginRight: 8 }}>
            ← Povratak
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="edit-beer-form">
        <label>
          Ime
          <input name="name" value={form.name} onChange={onChange} required />
        </label>

        <label>
          Proizvođač
          <select name="manufacturer" value={form.manufacturer} onChange={onChange} required>
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
          <textarea name="description" value={form.description} onChange={onChange} rows={4} />
        </label>

        <label>
          Cijena (EUR)
          <input name="priceEur" value={form.priceEur} onChange={onChange} type="number" step="0.01" />
        </label>

        <label>
          Cijena (HRK)
          <input name="priceHrk" value={form.priceHrk} onChange={onChange} type="number" step="0.01" />
        </label>

        <label>
          ABV (%)
          <input name="abv" value={form.abv} onChange={onChange} type="number" step="0.1" />
        </label>

        <label>
          Tip
          <input name="type" value={form.type} onChange={onChange} />
        </label>

        <label>
          Volumen (ml)
          <input name="volume" value={form.volume} onChange={onChange} type="number" />
        </label>

        <label style={{ gridColumn: "1 / -1" }}>
          imageUrl (npr. /static/images/beers/1.jpg ili filename)
          <input name="imageUrl" value={form.imageUrl} onChange={onChange} />
        </label>

        {error && <div style={{ color: "crimson", gridColumn: "1 / -1" }}>{error}</div>}

        <div style={{ gridColumn: "1 / -1", display: "flex", gap: 10 }}>
          <button className="details-button" type="submit" disabled={saving}>
            {saving ? "Spremam..." : "Spremi promjene"}
          </button>
          <Link to={`/proizvodi/${id}`} className="details-button" style={{ background: "#ddd", color: "#071222" }}>
            Otkaži
          </Link>
        </div>
      </form>
    </div>
  );
}