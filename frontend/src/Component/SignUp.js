import React, { useState } from "react";
import axios from 'axios';

function Signup({ onSignupSuccess, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone_number: '',
    job_title: '',
    job_status: 'Active',
    department: 'IT',
    role: 'Employee',
    address: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://plutohr-yh2n.onrender.com/api/v1/employee/register/', formData);
      console.log('Signup successful:', response.data);
      onSignupSuccess();
    } catch (error) {
      console.error('Error during signup:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="signup-container">
        <h2 className="signup-title">Signup to PLutoHR</h2><br /> 
      <form className="signup-form" onSubmit={handleSubmit}>
        <div>
          <label className="label" htmlFor="username">Username</label>
          <input
            className="signup-input"
            id="username"
            type="text"
            name="username"
            required
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="label" htmlFor="email">Email</label>
          <input
            className="signup-input"
            id="email"
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="label" htmlFor="password">Password</label>
          <input
            className="signup-input"
            id="password"
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="label" htmlFor="phone_number">Phone Number</label>
          <input
            className="signup-input"
            id="phone_number"
            type="text"
            name="phone_number"
            required
            value={formData.phone_number}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="label" htmlFor="job_title">Job Title</label>
          <input
            className="signup-input"
            id="job_title"
            type="text"
            name="job_title"
            required
            value={formData.job_title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="label" htmlFor="job_status">Job Status</label>
          <select
            className="signup-input"
            id="job_status"
            name="job_status"
            required
            value={formData.job_status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Leave">Leave</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="department">Department</label>
          <select
            className="signup-input"
            id="department"
            name="department"
            required
            value={formData.department}
            onChange={handleChange}
          >
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
            <option value="HR">HR</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="role">Role</label>
          <select
            className="signup-input"
            id="role"
            name="role"
            required
            value={formData.role}
            onChange={handleChange}
          >
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="address">Address</label>
          <input
            className="signup-input"
            id="address"
            type="text"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
          />
        </div><br />
        <button className="signup-button" type="submit">Signup</button>
      </form>
      <div className="open-signup">
            <p>Already signed up?</p>
            <button
            type="button"
            className="login-switch-button"
            onClick={onSwitchToLogin}
            >
            Login
            </button>
        </div>
    </div>
  );
}

export default Signup;
