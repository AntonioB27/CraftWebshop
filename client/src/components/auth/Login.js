import React, { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import "../../static/styles/auth.css";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || "Login failed");
        return;
      }
      localStorage.setItem("user", JSON.stringify(data));
      if (setUser) {
        setUser(data);
      }
      navigate("/");
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
    <div className="text-container">
      <h1>Wellcome to CraftWebshop, please log in to order your favourite beers!</h1>
    </div>
      <div className="auth-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Login;
