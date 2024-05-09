import React, { useState, useEffect, useMemo } from 'react';
import { FaCalendarCheck } from 'react-icons/fa';

const Attendance = () => { 
  const attendanceData = useMemo(() => [
    {
      Date: '30/04/2024',
      EmployeeName: 'Steph',
      Email: 'steph@plutohr.com',
      Position: 'Developer',
      Department: 'Software',
      TimeIn: '9:20a m',
      Timeout: '5:00pm',
      HoursWorked: '7hr 40 mins',
    },
    {
      Date: '30/04/2024',
      EmployeeName: 'Martin',
      Email: 'martin@plutohr.com',
      Position: 'Developer',
      Department: 'Software',
      TimeIn: '8:20a m',
      Timeout: '4:50pm',
      HoursWorked: '8hr 40 mins',
    },
    {
      Date: '30/04/2024',
      EmployeeName: 'Angella',
      Email: 'angel@plutohr.com',
      Position: 'HR',
      Department: 'Human Resoucrce',
      TimeIn: '9:20a m',
      Timeout: '5:00pm',
      HoursWorked: '7hr 40 mins',
    },
  ], [])

  const [filteredData, setFilteredData] = useState(attendanceData); 
  const [searchTerm, setSearchTerm] = useState(''); 
  useEffect(() => {
    const filterData = attendanceData.filter((item) => {
      const searchTextLower = searchTerm.toLowerCase();
      return (
        item.Date.toLowerCase().includes(searchTextLower) ||
        item.EmployeeName.toLowerCase().includes(searchTextLower) ||
        item.Position.toLowerCase().includes(searchTextLower) ||
        item.Department.toLowerCase().includes(searchTextLower)
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
              <th>Email</th>
              <th>Position</th>
              <th>Department</th>
              <th>TimeIn</th>
              <th>Timeout</th>
              <th>Hours worked</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.Date}> 
                <td>{item.Date}</td>
                <td>{item.EmployeeName}</td>
                <td><a href={`mailto: ${item.Email}`}>{item.Email}</a></td>
                <td>{item.Position}</td>
                <td>{item.Department}</td>
                <td>{item.TimeIn}</td>
                <td>{item.Timeout}</td>
                <td>{item.HoursWorked}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
