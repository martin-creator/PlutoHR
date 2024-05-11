import React, { useState } from 'react';
import { FaHome, FaPaperPlane, FaSignOutAlt, FaCalendarCheck, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = ( { toggleSidebar, isSidebarOpen }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const handleLinkClick = () => {
    if (isSidebarOpen) {
      toggleSidebar();
    }
  };

  const links = [
    {
      name: 'Home',
      icon: <FaHome />,
      path: '/',
    },
    {
      name: 'Leave',
      icon: <FaPaperPlane />,
      path: 'leave',
    },
    {
      name: 'Attendance',
      icon: <FaCalendarCheck />,
      path: 'attendance',
    },
    {
      name: 'Profile',
      icon: <FaUser />,
      path: 'profile',
    },
  ];

  return (
    <div className={`sidenav ${isSidebarOpen ? "active" : ""}`}>
      <Link className='logo-con' to='/'>
        <img className='logo' src='https://www.creativefabrica.com/wp-content/uploads/2021/03/20/Mountain-logo-Design-Graphics-9785421-1-580x435.png' alt='Logo' />
      </Link>
      <hr />
      <div className='nav-bar'>
          {
            links.map((link)=>(
              <Link 
                key={link.name}
                className={`nav-link ${activeMenu === link.name ? 'active' : ''}`}
                to={link.path}
                onClick={() => {
                  handleLinkClick();
                  handleMenuClick(link.name);
                }}              
              >
                <span>{link.icon}</span>
                {link.name}
              </Link>
            ))
          }
      </div>
      <hr />
      <div className='sign-out-cont'>
        <Link to='logout' className='sign-out'><span><FaSignOutAlt /></span> LogOut </Link>
      </div>
    </div>
  );
};

export default Sidebar;
