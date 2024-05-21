import React, { useState } from "react";
import Login from "./Component/Login";
import EmployeeDashboard from "./Component/Employee/EmployeeDashboard";
import ManagerDashboard from "./Component/Manager/ManagerDashboard";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  const handleLogin = async (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setUserRole("");
  };

  return isLoggedIn ? (
    <>
      {userRole === "Manager" ? (
        <ManagerDashboard onLogOut={handleLogOut} />
      ) : (
        <EmployeeDashboard onLogOut={handleLogOut} />
      )}
    </>
  ) : (
    <Login onLogin={handleLogin} />
  );
}
