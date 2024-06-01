import React, { useEffect, useState } from 'react';
import { FaCalendarCheck } from 'react-icons/fa';

const Attendance = ({ user }) => {
  const [hoursWorked, setHoursWorked] = useState(null);

  useEffect(() => {
    const calculateHoursWorked = () => {
      const timeIn = new Date(user.timein);
      const currentTime = new Date();
      const differenceInMilliseconds = currentTime - timeIn;
      const hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
      const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
      setHoursWorked(`${hours} hours ${minutes} minutes`);
    };

    // Initial calculation
    calculateHoursWorked();

    // Update hours worked every minute
    const intervalId = setInterval(calculateHoursWorked, 60000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [user.timein]);

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
              <tr>
                <td>{user.loginDate}</td>
                <td>{user.username}</td>
                <td>{user.timein.split(' ')[1]}</td>
                <td>{user.time_out}</td>
                <td>{Math.round(hoursWorked, 2)}</td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;