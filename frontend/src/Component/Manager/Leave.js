import React from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Leave = ({leaveRequests}) => {
 
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
          <LeaveRequest leaveRequests={leaveRequests}/>
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
function LeaveRequest({leaveRequests}) { 

  return (
    <div className='leave-display'>
      <h4>Pending Leave Request</h4>
      <table>
        <thead>
          <tr>
            <th>EmployeeID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Leave Balance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request, index) => (
            <tr key={index}>
              <td>{request.employee_id}</td>
              <td>{request.start_date}</td>
              <td>{request.end_date}</td>
              <td>{request.reason}</td>
              <td>{request.leave_balance}</td>
              <td className='leave-action-button'>
                <button className='leave-accept'>Accept</button>
                <button className='leave-reject'>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

//Accepted leave component
function AcceptedLeaveRequest() { 
  return (
    <div className='leave-display'>
      <h4>Accepted Leave Request</h4>
      <table>
        <thead>
          <tr>
          <th>Date</th>
            <th>Employee Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Department</th>
            <th>Leave Balance</th>
            <th>Days Requested</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr> 
            <td></td>
            <td></td>
            <td>
              {/* <a href={`mailto: steph@plutohr.com`}>steph@plutohr.com</a> */}
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className='leave-action-button'>
              <button className='leave-accept'>Accept</button>
              <button className='leave-reject'>Reject</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

//Rejected leave component
function RejectedLeaveRequest() { 
  return (
    <div className='leave-display'>
      <h4>Rejected Leave Request</h4>
      <table>
        <thead>
          <tr>
          <th>Date</th>
            <th>Employee Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Department</th>
            <th>Leave Balance</th>
            <th>Days Requested</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr> 
            <td></td>
            <td></td>
            <td>
              {/* <a href={`mailto: steph@plutohr.com`}>steph@plutohr.com</a> */}
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className='leave-action-button'>
              <button className='leave-accept'>Accept</button>
              <button className='leave-reject'>Reject</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
