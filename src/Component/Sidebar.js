import React, { useState } from 'react';
import { FaHome, FaUser, FaPaperPlane, FaSignOutAlt, FaTable } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div className='sidenav'>
      <Link className='logo-con' to='/'>
        <img className='logo' src='https://www.creativefabrica.com/wp-content/uploads/2021/03/20/Mountain-logo-Design-Graphics-9785421-1-580x435.png' alt='Logo' />
      </Link>
      <hr />
      <div className='nav-bar'>
        <Link className={`nav-link ${activeMenu === 'home' ? 'active' : ''}`} to='/' onClick={() => handleMenuClick('home')}><span><FaHome /></span>Home</Link>
        <Link className={`nav-link ${activeMenu === 'employee' ? 'active' : ''}`} to='employee' onClick={() => handleMenuClick('employee')}><span><FaHome /></span>Employee</Link>
        <Link className={`nav-link ${activeMenu === 'department' ? 'active' : ''}`} to='department' onClick={() => handleMenuClick('department')}><span><FaUser /></span> Department</Link>
        <Link className={`nav-link ${activeMenu === 'leave' ? 'active' : ''}`} to='leave' onClick={() => handleMenuClick('leave')}><span><FaPaperPlane /></span> Leave</Link>
        <Link className={`nav-link ${activeMenu === 'report' ? 'active' : ''}`} to='report' onClick={() => handleMenuClick('report')}><span><FaTable /></span> Report</Link>
      </div>
      <hr />
      <div className='sign-out-cont'>
        <Link to='signout' className='sign-out'><span><FaSignOutAlt /></span> SignOut </Link>
      </div>
    </div>
  );
};

export default Sidebar;
