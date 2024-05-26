import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Leave from "./Leave";
import SignOut from "../SignOut"
import Report from "./Report";
import TopBar from "../TopBar";
import Department from "./Department";
import Employee from "./Employee";
import Attendance from "./Attendance";
import axios from 'axios';

const ManagerDashboard=({onLogOut, user})=> {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [acceptedLeave, setAcceptedLeave] = useState([]);
  const [rejectedLeave, setRejectedLeave] = useState([]);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/employee/leave/');
        setLeaveRequests(response.data);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleAcceptLeave = (index) => {
    const acceptedRequest = leaveRequests[index];
    setAcceptedLeave([...acceptedLeave, acceptedRequest]);
    removeLeaveRequest(index);
  };

  const handleRejectLeave = (index) => {
    const rejectedRequest = leaveRequests[index];
    setRejectedLeave([...rejectedLeave, rejectedRequest]);
    removeLeaveRequest(index);
  };

  const removeLeaveRequest = (index) => {
    const updatedLeaveRequests = leaveRequests.filter((_, i) => i !== index);
    // Update the leaveRequests state to remove the accepted/rejected request
    setLeaveRequests(updatedLeaveRequests);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return(
    <BrowserRouter>
      <div className={`container ${isSidebarOpen ? "sidebar-open" : "sidebar-close"}`}>
        <div className="sidebar">
        <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        </div>
        <div className="content">
          <TopBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          <Routes>
            <Route path="/" element={<Home user={user} leaveRequests={leaveRequests}/>} />
            <Route path="employee" element={<Employee />} />
            <Route path="/department" element={<Department />} />
            <Route 
              path="/leave" 
              element={<Leave 
              leaveRequests={leaveRequests}
              onAcceptLeave={handleAcceptLeave}
              onRejectLeave={handleRejectLeave}
              />} 
            />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/report" element={<Report />} />
            <Route
              path="/logout"
              element={<SignOut onLogOut={onLogOut} />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  ) 
}

export default ManagerDashboard;