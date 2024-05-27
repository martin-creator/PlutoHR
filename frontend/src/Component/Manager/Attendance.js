import React, { useState, useEffect } from 'react';
import { FaCalendarCheck } from 'react-icons/fa';

const Attendance = ({attendanceData}) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  //Filter attendance data based on date/employee id
  useEffect(() => {
    const filterData = attendanceData.filter((item) => {
      const searchTextLower = searchTerm.toLowerCase();
      return (
        item.date.includes(searchTextLower) ||
        item.employee.includes(searchTextLower)
      );
    });
    setFilteredData(filterData);
  }, [searchTerm, attendanceData]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className='attendance'>
      <h3 className='attendance-heading'>
        <span><FaCalendarCheck /></span>
        Attendance
      </h3>
      <div className='attendance-display'>
        <div className='search-table'>
          <input
            type='text'
            className='search-input'
            placeholder='Search a name/department'
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
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
