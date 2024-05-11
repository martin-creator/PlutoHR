import React, { useState } from "react";
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

const ManagerDashboard=({onLogOut})=> {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 

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
            <Route path="/" element={<Home />} />
            <Route path="employee" element={<Employee />} />
            <Route path="/department" element={<Department />} />
            <Route path="/leave" element={<Leave />} />
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