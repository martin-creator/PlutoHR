import React from 'react'
import { FaPaperPlane } from 'react-icons/fa'
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

export default Leave

// Request Leave component
function RequestLeave() { 
  return (
    <div className='leave-display'>
      <h4>Apply for Leave</h4>
      <form className='leave-request-form'>
          <div className='add-employee-input-container'>
            <div>
              <label htmlFor='id'>EmployeeID</label>
              <input
                type='number'
                name='id'
                required
              />
            </div>
            <div>
              <label htmlFor='name'>Employee Name</label>
              <input
                type='text'
                name='name'
                required
              />
            </div>
            <div>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                name='email'
                required
              />
            </div>
            <div>
              <label htmlFor='leave'>Leave Type</label>
              <select name='leave'  required>
                  <option>Casual Leave</option>
                  <option>Annual Leave</option>
                  <option>Maternity Leave</option>
              </select>
            </div>
            <div>
              <label htmlFor='period'>Leave Period</label>
              <input
                type='date'
                name='period'
                required
              />
            </div>
            <div>
              <label htmlFor='days'>Days requested</label>
              <input
                type='number'
                name='days'
                required
              />
            </div>
            <div>
              <label htmlFor='reason'>Reason for Leave</label>
              <input
                type='text'
                name='reason'
                required
              />
            </div>
          </div>
          <input type='submit' className='leave-button' />
        </form>
    </div>
  )
}

//Accepted leave component

function LeaveBalance() { 
  return (
    <div className='leave-balance-container'>
      <div className='leave-balance'>
       <h4>Leave Balance</h4> 
       <details title='Click the arrow to open'>
        <summary>Annual Leave</summary>
        <p>Available: 21 days</p>
        <p>Taken: 0 day</p>
        </details> 
        <details title='Click the arrow to open'>
          <summary>Sick Leave</summary>
          <p>Available: 10 days</p>
          <p>Taken: 0 day</p>
        </details> 
        <details title='Click the arrow to open'>
          <summary>Maternity Leave</summary>
          <p>Available: 30 days</p>
          <p>Taken: 0 day</p>
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
  )
}