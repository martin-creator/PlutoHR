import React, { useState } from "react";
import Sidebar from "./Component/Sidebar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Component/Home";
import Leave from "./Component/Leave";
import SignOut from "./Component/SignOut";
import Report from "./Component/Report";
import Login from "./Component/Login";
import TopBar from "./Component/TopBar";
import Department from "./Component/Department";
import Employee from "./Component/Employee";
import Attendance from "./Component/Attendance";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // When user signs out
  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  return isLoggedIn ? (
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
              path="/signout"
              element={<SignOut onSignOut={handleSignOut} />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  ) : (
    <Login onLogin={() => setIsLoggedIn(true)} />
  );
}