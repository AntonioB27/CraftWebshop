import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../static/styles/admin.css";

export default function AdminUsers({ user }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/users/all", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.message || `Request failed (${res.status})`);
        }
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message || "Greška pri dohvaćanju korisnika");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div style={{ padding: 16 }}>Učitavanje korisnika...</div>;
  if (error) return <div style={{ padding: 16, color: "crimson" }}>Greška: {error}</div>;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Administracija — Svi korisnici</h1>
        <div className="admin-sub">Pregled i upravljanje korisnicima</div>
      </div>

      <table className="admin-table" style={{ marginTop: 12 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ime</th>
            <th>Email</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="id-cell" data-label="ID">{u._id}</td>
              <td data-label="Ime">{u.name || "-"}</td>
              <td data-label="Email">{u.email}</td>
              <td data-label="Admin">{u.isAdmin ? <span className="badge">Yes</span> : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
