import React, { useEffect, useState } from 'react'

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
  );
}


export default App