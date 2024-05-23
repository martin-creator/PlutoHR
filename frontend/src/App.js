import React, { useState } from "react";
import axios from "axios";
import Login from "./Component/Login";
import EmployeeDashboard from "./Component/Employee/EmployeeDashboard";
import ManagerDashboard from "./Component/Manager/ManagerDashboard";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [logoutTime, setLogoutTime] = useState(null);

  const handleLogin = (user) => {
    const now = new Date();
    const loginDate = now.toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    const loginTime = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }); // Get current time in "hh:mm" format
    const updatedUser = {
      ...user,
      timein: `${loginDate} ${loginTime}`, // Combine date and time
      loginDate: loginDate,
      employee: user.employee_id
    };
    setUser(updatedUser);
    setIsLoggedIn(true);
    sendAttendanceData(updatedUser, null); // Send login data to API
  };
  
  const handleLogOut = () => {
    const now = new Date();
    const logoutTime = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }); // Get current time in "hh:mm" format
    setLogoutTime(logoutTime);
    if (user) {
      sendAttendanceData(user, logoutTime); // Send logout data to API
    }
    setIsLoggedIn(false);
    setUser(null);
  };
  
  
  const sendAttendanceData = async (user, logoutTime) => {
    const attendanceEntry = {
      employee: user.employee_id,
      date: user.loginDate,
      time_in: user.timein,
      time_out: logoutTime || '', 
    };
    try {
      const response = await axios.post('http://localhost:8000/api/v1/employee/attendance/', attendanceEntry);
      console.log('Attendance data sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending attendance data:', error.response ? error.response.data : error.message);
    }
  };

  return isLoggedIn ? (
    <>
      {user.role === "Manager" ? (
        <ManagerDashboard user={user} logoutTime={logoutTime} onLogOut={handleLogOut} />
      ) : (
        <EmployeeDashboard user={user} logoutTime={logoutTime} onLogOut={handleLogOut} />
      )}
    </>
  ) : (
    <Login onLogin={handleLogin} />
  );
}
