import React, { useCallback, useEffect, useState } from 'react';
import { FaHome, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = ({ user, leaveRequests, acceptedLeave, rejectedLeave, attendanceData }) => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [uniqueDates, setUniqueDates] = useState([]);
  const [totalWorkedHours, setTotalWorkedHours] = useState(0);

  // Get unique days in attendance data
  const extractUniqueDates = useCallback(() => {
    const dates = attendanceData.map(entry => entry.date);
    const uniqueDatesSet = new Set(dates);
    setUniqueDates([...uniqueDatesSet]);
  }, [attendanceData]);

  // Calculate total worked hours
  useEffect(() => {
    let totalHours = 0;
    attendanceData.forEach(entry => {
      totalHours += parseFloat(entry.hours_worked); // Assuming hours_worked is present in each entry
    });
    setTotalWorkedHours(totalHours.toFixed(2)); // Round to 2 decimal places
  }, [attendanceData]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (attendanceData.length > 0) {
      extractUniqueDates();
    }
  }, [attendanceData, extractUniqueDates]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://plutohr-yh2n.onrender.com/api/v1/employee/list/');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleOpenProfile = () => {
    navigate('/employee');
  };

  const handleOpenLeaveForm = () => {
    navigate('/leave');
  };

  return (
    <div className='home'>
      <h3 className='home-heading'>
        <span><FaHome /></span>
        Home
      </h3>
      <div className='home-details'>
        <div className='home-profile'>
          <div className='home-profile-desc'>
            <div>Welcome back, {user.username}</div>
            <div>I wish you a great day 👍 </div>
            <button className='open-profile-button' onClick={handleOpenProfile}>View Employees</button>
          </div>
          <div className='home-profile-img'>
            <img src='https://avatars.githubusercontent.com/u/148610430?v=4' alt='Profile' />
          </div>
        </div>
        <div className='home-stats'>
          <div className='home-stat-heading'>
            <h3>Statistics</h3>
          </div>
          <div className='home-stat-employee'>
            <div className='employee-icon'>
              <FaUser className='icon' />
            </div>
            <div className='employee-stat'>
              <p>Number of employees</p>
              <p>{employees.length}</p>
            </div>
          </div>
        </div>
        <div className='attendance-stat'>
          <div className='attendance-stat-heading'>
            <h3>Attendance & Leaves</h3>
            <select htmlFor="day">
              <option name="day" id='day' className='day'>Today</option>
              <option name="day" id='week' className='week'>Week</option>
            </select>
          </div>
          <div className='attendance-stat-detail'>
            <div>
              <p>{leaveRequests.length}</p>
              <p>Total Leaves</p>
            </div>
            <div>
              <p>{acceptedLeave.length}</p>
              <em>Accepted Leaves</em>
            </div>
            <div>
              <p>{rejectedLeave.length}</p>
              <em>Rejected Leaves</em>
            </div>
            <div>
              <p>{leaveRequests.length - acceptedLeave.length - rejectedLeave.length}</p>
              <em>Pending Approval</em>
            </div>
            <div>
              <p>{uniqueDates.length}</p>
              <em>Worked Days</em>
            </div>
            <div>
              <p>{totalWorkedHours}</p>
              <em>Worked Hours</em>
            </div>
          </div>
          <div>
            <button className='home-leave-apply-button' onClick={handleOpenLeaveForm}>Open Leave Requests</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
