
import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';


const TopBar = ({ toggleSidebar, isSidebarOpen}) => {
  return (
    <div className='topbar'>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>
      <h2 className='topbar-title'>PlutoHR</h2>
    </div>
  );
};

export default TopBar;
