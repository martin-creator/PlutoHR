import React, { useState } from "react";
import axios from 'axios';

function Signup({ onSignupSuccess, onSwitchToLogin }) {
  const departmentOptions = [
    { value: 'IT', label: 'IT' },
    { value: 'Finance', label: 'Finance' },
    { value: 'HR', label: 'HR' },
    { value: 'Admin', label: 'Admin' },
  ];

  const roleOptions = [
    { value: 'Manager', label: 'Manager' },
    { value: 'Employee', label: 'Employee' },
  ];

  const [formData, setFormData] = useState({
    employee_id: '',
    username: '',
    email: '',
    password: '',
    phone_number: '',
    job_title: '',
    department: 'IT',
    role: 'Employee',
    address: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
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
        <h2 className="signup-title">Signup to PlutoHR</h2><br /> 
      <form className="signup-form" onSubmit={handleSubmit}>
        <div>
          <label className="label" htmlFor="employee_id">EmployeeID</label>
          <input
            className="signup-input"
            id="employee_id"
            type="text"
            name="employee_id"
            required
            value={formData.employee_id}
            onChange={handleChange}
          />
        </div>
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
          <label className="label" htmlFor="department">Department</label>
          <select
            className="signup-input"
            id="department"
            name="department"
            required
            value={formData.department}
            onChange={handleChange}
          >
            {departmentOptions.map((dept) => (
              <option key={dept.value} value={dept.value}>
                {dept.label}
              </option>
            ))}
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
             {roleOptions.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
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
        <div className="signup-button-cont">
            <button className="signup-button" type="submit">Signup</button>
        </div>
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
