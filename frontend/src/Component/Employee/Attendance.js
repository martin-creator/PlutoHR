import React from 'react';
import { FaCalendarCheck } from 'react-icons/fa';

const Attendance = ({ attendanceData = [] }) => {
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
            {attendanceData.map((item, index) => (
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