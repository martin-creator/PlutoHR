import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCalendarCheck } from 'react-icons/fa';

const Attendance = ({ user, logoutTime }) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (user) {
      // Get current date in YYYY-MM-DD format
      const today = new Date().toISOString().split('T')[0];
      const loginEntry = {
        date: today,
        employee: user.employee_id,
        time_in: new Date(user.timein).toLocaleTimeString(),
        time_out: logoutTime ? new Date(logoutTime).toLocaleTimeString() : '',
        hoursworked: logoutTime ? calculateHoursWorked(user.timein, logoutTime) : '',
      };
      setFilteredData(prevData => [loginEntry, ...prevData]);

      // Send the new attendance entry to the backend
      if (logoutTime) {
        sendAttendanceData(loginEntry);
      }
    }
  }, [user, logoutTime]);

  const calculateHoursWorked = (timeIn, timeOut) => {
    const start = new Date(timeIn);
    const end = new Date(timeOut);
    const timeDiffInMs = end - start;
    const hours = Math.floor(timeDiffInMs / 3600000);
    const minutes = Math.round((timeDiffInMs % 3600000) / 60000);
    return `${hours}hr ${minutes} mins`;
  };

  const sendAttendanceData = async (attendanceEntry) => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/employee/attendance/', attendanceEntry);
      console.log('Attendance data sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending attendance data:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className='attendance'>
      <h3 className='attendance-heading'>
        <span><FaCalendarCheck /></span>
        Attendance
      </h3>
      <div className='attendance-display'>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Employee Name</th>
              <th>TimeIn</th>
              <th>Timeout</th>
              <th>Hours worked</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.employee}</td>
                <td>{item.time_in}</td>
                <td>{item.time_out}</td>
                <td>{item.hoursworked}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
