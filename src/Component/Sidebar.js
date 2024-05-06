import React from 'react'
import {FaHome,FaUser, FaPaperPlane, FaSignOutAlt, FaTable} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidenav'>
        <Link className='logo-con' to='/'>
            <img className='logo' src='https://www.creativefabrica.com/wp-content/uploads/2021/03/20/Mountain-logo-Design-Graphics-9785421-1-580x435.png' alt='Logo' />
        </Link>
        <hr />
        <div className='nav-bar'>
                <Link className='nav-link' to='/'><span><FaHome /></span>Home</Link>
                <Link className='nav-link' to='employee'><span><FaHome /></span>Employee</Link>
                <Link className='nav-link' to='department'> <span><FaUser /></span> Department</Link>
                <Link className='nav-link' to='leave'><span><FaPaperPlane /></span> Leave</Link>
                <Link className='nav-link' to='report'><span><FaTable /></span> Report</Link>
        </div>
        <hr />
        <div className='sign-out-cont'>           
            <Link to='signout' className='sign-out'><span><FaSignOutAlt /></span> SignOut </Link>                     
        </div>
    </div>
  )
}

export default Sidebar