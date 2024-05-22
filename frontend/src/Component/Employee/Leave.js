import React, { useState } from 'react';
import axios from 'axios';
import { FaPaperPlane } from 'react-icons/fa';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Leave = () => {
  return (
    <div className='leave'>
      <h3 className='leave-heading'>
        <span><FaPaperPlane /></span>
        Leave
      </h3>
      <Tabs>
        <TabList>
          <Tab>Leave Request</Tab>
          <Tab>Leave Balance/History</Tab>
        </TabList>

        <TabPanel>
          <RequestLeave />
        </TabPanel>
        <TabPanel>
          <LeaveBalance />
        </TabPanel>
      </Tabs>      
    </div>
  )
}

export default Leave;

// Request Leave component
function RequestLeave() {
  const [leaveRequestData, setLeaveRequestData] = useState({
    employee: '',
    start_date: '',
    end_date: '',
    reason: '',
  });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveRequestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
  
    try {
      await axios.post('http://localhost:8000/api/v1/employee/leave/', leaveRequestData);
      setSuccess('Leave request submitted successfully!');
      setLeaveRequestData({
        employee: '',
        start_date: '',
        end_date: '',
        reason: '',
      });
    } catch (error) {
      setError('Error submitting leave request');
      console.error('Error submitting leave request:', error);
    }
  };
  

  return (
    <div className='leave-display'>
      <h4>Apply for Leave</h4>
      <form className='leave-request-form' onSubmit={handleSubmit}>
        <div className='add-employee-input-container'>
          <div>
            <label htmlFor='employee'>Employee Name</label>
            <input
              type='text'
              name='employee'
              value={leaveRequestData.employee}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor='start_date'>Start Date</label>
            <input
              type='date'
              name='start_date'
              value={leaveRequestData.start_date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor='end_date'>End Date</label>
            <input
              type='date'
              name='end_date'
              value={leaveRequestData.end_date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor='reason'>Reason for Leave</label>
            <input
              type='text'
              name='reason'
              value={leaveRequestData.reason}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <input type='submit' className='leave-button' value='Submit' />
      </form>
    </div>
  );
}

// Accepted leave component
function LeaveBalance() {
  return (
    <div className='leave-balance-container'>
      <div className='leave-balance'>
        <h4>Leave Balance</h4>
        <details title='Click the arrow to open'>
          <summary>Annual Leave</summary>
          <p>Available: 21 days</p>
          <p>Taken: 0 days</p>
        </details>
        <details title='Click the arrow to open'>
          <summary>Sick Leave</summary>
          <p>Available: 10 days</p>
          <p>Taken: 0 days</p>
        </details>
        <details title='Click the arrow to open'>
          <summary>Maternity Leave</summary>
          <p>Available: 30 days</p>
          <p>Taken: 0 days</p>
        </details>
      </div>
      <div className='leave-history'>
        <h4>Leave History</h4>
        <table>
          <thead>
            <tr>
              <th>Leave Period</th>
              <th>Leave Type</th>
              <th>Days Taken</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
