import React, { useState, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Leave = ({ leaveRequests, onUpdateAcceptedRequests, onUpdateRejectedRequests }) => {
  const [pendingRequests, setPendingRequests] = useState(leaveRequests);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);

  useEffect(() => {
    onUpdateAcceptedRequests(acceptedRequests);
  }, [acceptedRequests, onUpdateAcceptedRequests]);

  useEffect(() => {
    onUpdateRejectedRequests(rejectedRequests);
  }, [rejectedRequests, onUpdateRejectedRequests]);

  const handleAccept = (request) => {
    setPendingRequests(pendingRequests.filter((item) => item !== request));
    setAcceptedRequests([...acceptedRequests, { ...request, status: 'Accepted' }]);
  };

  const handleReject = (request) => {
    setPendingRequests(pendingRequests.filter((item) => item !== request));
    setRejectedRequests([...rejectedRequests, { ...request, status: 'Rejected' }]);
  };

  return (
    <div className='leave'>
      <h3 className='leave-heading'>
        <span>
          <FaPaperPlane />
        </span>
        Leave
      </h3>
      <Tabs>
        <TabList>
          <Tab>Leave Request</Tab>
          <Tab>Accepted Leave Request</Tab>
          <Tab>Rejected Leave Request</Tab>
        </TabList>

        <TabPanel>
          <LeaveRequest
            leaveRequests={pendingRequests}
            onAcceptLeave={handleAccept}
            onRejectLeave={handleReject}
          />
        </TabPanel>
        <TabPanel>
          <AcceptedLeaveRequest leaveRequests={acceptedRequests} />
        </TabPanel>
        <TabPanel>
          <RejectedLeaveRequest leaveRequests={rejectedRequests} />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Leave;

//Pending Leave Request component
function LeaveRequest({ leaveRequests, onAcceptLeave, onRejectLeave }) { 
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
              <td>{request.employee}</td>
              <td>{request.start_date}</td>
              <td>{request.end_date}</td>
              <td>{request.reason}</td>
              <td>{request.leave_balance}</td>
              <td className='leave-action-button'>
                <button className='leave-accept' onClick={() => onAcceptLeave(request)}>Accept</button>
                <button className='leave-reject' onClick={() => onRejectLeave(request)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

//Accepted leave component
function AcceptedLeaveRequest({ leaveRequests }) {
  return (
    <div className='leave-display'>
      <h4>Accepted Leave Request</h4>
      <table>
        <thead>
          <tr>
            <th>EmployeeID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Leave Balance</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request, index) => (
            <tr key={index}>
              <td>{request.employee}</td>
              <td>{request.start_date}</td>
              <td>{request.end_date}</td>
              <td>{request.reason}</td>
              <td>{request.leave_balance}</td>
              <td>{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

//Rejected leave component
function RejectedLeaveRequest({ leaveRequests }) {
  return (
    <div className='leave-display'>
      <h4>Rejected Leave Request</h4>
      <table>
        <thead>
          <tr>
            <th>EmployeeID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Leave Balance</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request, index) => (
            <tr key={index}>
              <td>{request.employee}</td>
              <td>{request.start_date}</td>
              <td>{request.end_date}</td>
              <td>{request.reason}</td>
              <td>{request.leave_balance}</td>
              <td>{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
