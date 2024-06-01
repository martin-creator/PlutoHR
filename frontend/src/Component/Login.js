import React, { useState } from "react";
import axios from 'axios';
import Signup from "./SignUp";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('https://plutohr-yh2n.onrender.com/api/v1/employee/list/');
      const users = response.data;
      const user = users.find(user => user.email === email && user.username === username);
      if (user) {
        onLogin(user);
      } else {
        setError('Invalid Email or Password');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Error fetching user data. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      {isSignup ? (
        <Signup onSignupSuccess={() => setIsSignup(false)} onSwitchToLogin={() => setIsSignup(false)} />
      ) : (
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
      )}
    </div>
  );
}

export default Login;
