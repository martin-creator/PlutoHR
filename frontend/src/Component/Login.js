import React, { useState } from "react";
import axios from 'axios';

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/api/v1/employee/list');
      const users = response.data;
      const user = users.find(user => user.email === email && user.username === username);
      if (user) {
        console.log(user.role)
        onLogin(user.role);
      } else {
        setError('Invalid Email or password');
      }
    } catch (error) {
      setError('Error fetching user data');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Welcome to PlutoHR</h2>
        <div>
          <label className="label" htmlFor="username">Username</label>
          <input
            className="login-pass"
            id="username"
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="label" htmlFor="email">Email</label>
          <input
            className="login-email"
            id="email"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button className="login-button" type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
