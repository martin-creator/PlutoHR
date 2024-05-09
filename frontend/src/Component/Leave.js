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
          <Tab>Accepted Leave Request</Tab>
          <Tab>Rejected Leave Request</Tab>
        </TabList>

        <TabPanel>
          <LeaveRequest />
        </TabPanel>
        <TabPanel>
          <AcceptedLeaveRequest />
        </TabPanel>
        <TabPanel>
          <RejectedLeaveRequest />
        </TabPanel>
      </Tabs>      
    </div>
  )
}

export default Leave

//Pending Leave Request component
function LeaveRequest() { 
  return (
    <div className='attendance-display'>
      <h4>Pending Leave Request</h4>
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
          <tr> 
            <td></td>
            <td></td>
            <td><a href={`mailto: steph@plutohr.com`}>steph@plutohr.com</a></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

//Accepted leave component

function AcceptedLeaveRequest() { 
  return (
    <div className='attendance-display'>
      <h4>Accepted Leave Request</h4>
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
          <tr> 
            <td></td>
            <td></td>
            <td><a href={`mailto: steph@plutohr.com`}>steph@plutohr.com</a></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

//Rejected leave component
function RejectedLeaveRequest() { 
  return (
    <div className='attendance-display'>
      <h4>Rejected Leave Request</h4>
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
          <tr> 
            <td></td>
            <td></td>
            <td><a href={`mailto: steph@plutohr.com`}>steph@plutohr.com</a></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
