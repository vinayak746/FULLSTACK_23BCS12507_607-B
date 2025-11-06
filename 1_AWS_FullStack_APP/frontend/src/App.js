import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [backendUrl] = useState(process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api`);
      setMessage(response.data.msg);
    } catch (error) {
      setMessage('Error connecting to backend');
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Full Stack AWS App</h1>
        <p>Backend Status: {message}</p>
        <button onClick={fetchData}>Refresh</button>
      </header>
    </div>
  );
}

export default App;
