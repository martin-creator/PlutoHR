// App.js
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

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // When user signs out
  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  return isLoggedIn ? (
    <BrowserRouter>
      <div className="container">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="content">
          <TopBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="employee" element={<Employee />} />
            <Route path="/department" element={<Department />} />
            <Route path="/leave" element={<Leave />} />
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
