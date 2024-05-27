import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Leave from "./Leave";
import SignOut from "../SignOut";
import Report from "./Report";
import TopBar from "../TopBar";
import Department from "./Department";
import Employee from "./Employee";
import Attendance from "./Attendance";
import axios from 'axios';

const ManagerDashboard = ({ onLogOut, user,attendanceData }) => {
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

  const handleUpdateAcceptedRequests = (acceptedRequests) => {
    setAcceptedLeave(acceptedRequests);
  };

  const handleUpdateRejectedRequests = (rejectedRequests) => {
    setRejectedLeave(rejectedRequests);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <BrowserRouter>
      <div className={`container ${isSidebarOpen ? "sidebar-open" : "sidebar-close"}`}>
        <div className="sidebar">
          <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        </div>
        <div className="content">
          <TopBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          <Routes>
            <Route 
              path="/" 
              element={<Home 
                          user={user} 
                          leaveRequests={leaveRequests} 
                          acceptedLeave={acceptedLeave} 
                          rejectedLeave={rejectedLeave} 
                          attendanceData={attendanceData}
                        />} 
            />
            <Route path="employee" element={<Employee />} />
            <Route path="/department" element={<Department />} />
            <Route 
              path="/leave" 
              element={<Leave 
                          leaveRequests={leaveRequests}
                          onUpdateAcceptedRequests={handleUpdateAcceptedRequests}
                          onUpdateRejectedRequests={handleUpdateRejectedRequests}
                        />} 
            />
            <Route path="/attendance" element={<Attendance attendanceData={attendanceData}/>} />
            <Route path="/report" element={<Report />} />
            <Route
              path="/logout"
              element={<SignOut onLogOut={onLogOut} />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default ManagerDashboard;
