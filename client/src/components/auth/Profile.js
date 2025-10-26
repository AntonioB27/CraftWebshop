import React, { useEffect, useState } from "react";
import "../../static/styles/profile.css"

function Profile({ user }) {
  const [profile, setProfile] = useState(user || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      if (!user || !user._id) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/users/${user._id}`);
        if (!res.ok) throw new Error("Failed to load profile");
        const data = await res.json();
        setProfile(data.user || data);
      } catch (err) {
        setError(err.message || "Error loading profile");
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [user]);

  if (!user) return <div>Molimo prijavite se da vidite profil.</div>;
  if (loading) return <div>Učitavanje...</div>;
  if (error) return <div>Greška: {error}</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Profil</h2>
        <p>
          <strong>Ime:</strong> {profile?.name}
        </p>
        <p>
          <strong>Email:</strong> {profile?.email}
        </p>
        <p>
          <strong>Admin:</strong> {profile?.isAdmin ? "Da" : "Ne"}
        </p>
      </div>
    </div>
  );
}

export default Profile;
