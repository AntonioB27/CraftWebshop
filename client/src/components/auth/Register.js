import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../static/styles/auth.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || "Registration failed");
        return;
      }
      navigate("/login");
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
    <div className="text-container">
      <h1>Wellcome to CraftWebshop, please register to order your favourite beers!</h1>
    </div>
      <div className="auth-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Register;
