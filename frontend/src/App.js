import React, { useState } from "react";
import axios from "axios";
import Login from "./Component/Login";
import EmployeeDashboard from "./Component/Employee/EmployeeDashboard";
import ManagerDashboard from "./Component/Manager/ManagerDashboard";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [logoutTime, setLogoutTime] = useState(null);

  const handleLogin = async (user) => {
    const now = new Date();
    const loginDate = now.toISOString().split('T')[0];
    const loginTime = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    const updatedUser = {
      ...user,
      timein: `${loginDate} ${loginTime}`,
      loginDate: loginDate,
      employee_id: user.employee_id,
    };
    setUser(updatedUser);
    setIsLoggedIn(true);
    await sendAttendanceData(updatedUser, null);
  };

  const handleLogOut = async () => {
    const now = new Date();
    const logoutTime = now.toISOString().split('T')[1].slice(0, 8); // Extract the time part in "hh:mm:ss" format
    setLogoutTime(logoutTime);
    if (user) {
      await sendAttendanceData(user, logoutTime);
    }
    setIsLoggedIn(false);
    setUser(null);
  };
  

  const sendAttendanceData = async (user, logoutTime) => {
    const attendanceEntry = {
      employee: user.employee_id,
      date: user.loginDate,
      time_in: user.timein.split(' ')[1], 
      time_out: logoutTime ? logoutTime.split(' ')[1] : '', 
    };
  
    try {
      console.log('Sending attendance data:', attendanceEntry);
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
