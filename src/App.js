import { useState } from "react";
import Sidebar from "./Component/Sidebar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Component/Home";
import Account from "./Component/Account";
import Leave from "./Component/Leave";
import SignOut from "./Component/SignOut";
import Report from "./Component/Report";
import Login from "./Component/Login";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //When user signout
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="/leave" element={<Leave />} />
            <Route path="/report" element={<Report />} />
            <Route path="/signout" element={<SignOut  onSignOut={handleSignOut}/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  ) : (
    <Login onLogin={() => setIsLoggedIn(true)} />
  );
}