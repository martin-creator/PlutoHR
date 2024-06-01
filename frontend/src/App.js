import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Component/Login';
import EmployeeDashboard from './Component/Employee/EmployeeDashboard';
import ManagerDashboard from './Component/Manager/ManagerDashboard';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [logoutTime, setLogoutTime] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchAttendanceData();
    }
  }, [isLoggedIn]);

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
    sendAttendanceData(updatedUser);
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    const now = new Date();
    const logoutTime = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    setLogoutTime(`${user.loginDate} ${logoutTime}`);
  };

  const sendAttendanceData = async (user, logoutTime) => {
    const attendanceEntry = {
      employee: user.employee_id,
      date: user.loginDate,
      time_in: user.timein.split(' ')[1],
      time_out: logoutTime ? logoutTime.split(' ')[1] : ' ',
    };

    try {
      await axios.post('https://plutohr-yh2n.onrender.com/api/v1/manager/attendance/', attendanceEntry);
      // console.log('Attendance data sent successfully:', response.data);
      fetchAttendanceData();
    } catch (error) {
      console.error('Error sending attendance data:', error.response ? error.response.data : error.message);
    }
  };

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get('https://plutohr-yh2n.onrender.com/api/v1/manager/attendance/');
      setAttendanceData(response.data);
    } catch (error) {
      console.error('Error fetching attendance data:', error.response ? error.response.data : error.message);
    }
  };

  return isLoggedIn ? (
    <>
      {user.role === 'Manager' ? (
        <ManagerDashboard attendanceData={attendanceData} user={user} logoutTime={logoutTime} onLogOut={handleLogOut} />
      ) : (
        <EmployeeDashboard user={user} logoutTime={logoutTime} onLogOut={handleLogOut} />
      )}
    </>
  ) : (
    <Login onLogin={handleLogin} />
  );
}
