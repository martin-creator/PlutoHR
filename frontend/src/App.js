import React, { useState } from "react";
import Login from "./Component/Login";
import EmployeeDashboard from "./Component/Employee/EmployeeDashboard";
import ManagerDashboard from "./Component/Manager/ManagerDashboard";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (user) => {
    setUser(user);
    setIsLoggedIn(true);
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return isLoggedIn ? (
    <>
      {user.role === "Manager" ? (
        <ManagerDashboard user={user} onLogOut={handleLogOut} />
      ) : (
        <EmployeeDashboard user={user} onLogOut={handleLogOut} />
      )}
    </>
  ) : (
    <Login onLogin={handleLogin} />
  );
}
