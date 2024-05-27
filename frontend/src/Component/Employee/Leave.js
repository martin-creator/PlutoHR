import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPaperPlane } from 'react-icons/fa';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Leave = ({user}) => {
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
          <LeaveBalance user={user} />
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
    comments: '',
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
      const response = await axios.post('http://localhost:8000/api/v1/employee/leave/', {
        employee: leaveRequestData.employee,
        start_date: leaveRequestData.start_date,
        end_date: leaveRequestData.end_date,
        reason: leaveRequestData.reason,
        status: 'Requested',
        comments: leaveRequestData.comments || '',
      });
      console.log('Response data:', response.data); 
      setSuccess('Leave request submitted successfully!');
      setLeaveRequestData({
        employee: leaveRequestData.employee,
        start_date: '',
        end_date: '',
        reason: '',
        comments: '',
      });
    } catch (error) {
      if (error.response) {
        console.error('Server responded with status:', error.response.status);
        setError(`Error submitting leave request: ${error.response.data.message || error.message}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        setError('Error submitting leave request: No response from server.');
      } else {
        console.error('Error setting up the request:', error.message);
        setError(`Error submitting leave request: ${error.message}`);
      }
    }
  };

  return (
    <div className='leave-display'>
      <h4>Apply for Leave</h4>
      <form className='leave-request-form' onSubmit={handleSubmit}>
        <div className='add-employee-input-container'>
          <div>
            <label htmlFor='employee'>Employee ID</label>
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
          <div>
            <label htmlFor='comment'>Comments</label>
            <input
              type='text'
              name='comment'
              value={leaveRequestData.comments}
              onChange={handleChange}
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

// Leave Balance component
function LeaveBalance({ user }) {
  const [leaveHistory, setLeaveHistory] = useState([]);

  useEffect(() => {
    const fetchLeaveHistory = async () => {
      try {
        if (user && user.employee_id) { // Check if user and user.employee_id are defined
          const response = await axios.get(`http://localhost:8000/api/v1/manager/leave/${user.employee_id}/`);
          setLeaveHistory(response.data);
        }
      } catch (error) {
        console.error('Error fetching leave history:', error);
      }
    };

    fetchLeaveHistory();
  }, [user]); // Include user in the dependency array

  return (
    <div className='leave-balance-container'>
      <div className='leave-balance'>
        <h4>Leave Balance</h4>
        <div className='leave-balance-div'>
          <div>
            <p>Annual Leave</p>
            <p> 21</p>
          </div>
          <div>
            <p>Sick Leave</p>
            <p> 21</p>
          </div>
          <div>
            <p>Others Leave</p>
            <p> 21</p>
          </div>
          <div>
            <p>Remaining Leave</p>
            <p> 21</p>
          </div>
        </div>
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
            {leaveHistory.map((leave, index) => (
              <tr key={index}>
                <td>{leave.leave_period}</td>
                <td>{leave.leave_type}</td>
                <td>{leave.days_taken}</td>
                <td>{leave.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}