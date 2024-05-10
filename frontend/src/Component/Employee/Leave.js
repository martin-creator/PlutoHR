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
          <Tab>Request Leave</Tab>
          <Tab>Leave Balance</Tab>
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
              <label htmlFor='tel'>Phone</label>
              <input
                type='tel'
                name='tel'
                required
              />
            </div>
            <div>
              <label htmlFor='position'>Position</label>
              <input
                type='text'
                name='position'
                required
              />
            </div>
            <div>
              <label htmlFor='department'>Department</label>
              <select name='department' required>
                  <option >Software</option>
                  <option >Accounts</option>
                  <option >Human Resources</option>
              </select>
            </div>
            <div>
              <label htmlFor='gender'>Gender</label>
              <select name='gender'  required>
                  <option>Male</option>
                  <option>Female</option>
              </select>
            </div>
            <div>
              <label htmlFor='address'>Address</label>
              <input
                type='text'
                name='address'
                required
              />
            </div>
          </div>
          <input type='submit' />
        </form>
    </div>
  )
}

//Accepted leave component

function LeaveBalance() { 
  return (
    <div className='leave-display'>
      <h4>Leave Balance</h4>      
    </div>
  )
}