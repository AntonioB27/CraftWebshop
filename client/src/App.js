import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

function App() {

  const [backendData, setData] = useState([{}]);

  useEffect(() => {
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }
  , []);

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </nav>
      <Routes>
        <Route path="/" element={
          <div className="App">
            <h1>Welcome to CraftWebshop</h1>
            {(typeof backendData.users === 'undefined') ? (
              <p>Loading...</p>
            ) : (
              backendData.users.map((user, index) => (
                <p key={index}>{user.username}</p>
              ))
            )}
          </div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;