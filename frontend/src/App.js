import { useState } from "react";
import EmployeeDashboard from "./Component/Employee/EmployeeDashboard";
// import ManagerDashboard from "./Component/Manager/ManagerDashboard";
import Login from "./Component/Login";

export default function App(){
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogOut = () => {
    setIsLoggedIn(false);
  };

  return isLoggedIn ?(
    <>
      <EmployeeDashboard onLogOut = {handleLogOut} />
      {/* <ManagerDashboard onLogOut = {handleLogOut}/> */}
    </>
  ): (
    <Login onLogin={() => setIsLoggedIn(true)} />
  )  
}