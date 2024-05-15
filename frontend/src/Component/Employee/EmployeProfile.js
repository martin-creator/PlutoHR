import React from 'react';
import { FaUser } from 'react-icons/fa';

function EmployeeProfile() {
  return (
    <div className='profile'>
      <h3 className='home-heading'>
        <span><FaUser /></span>
        Profile
      </h3>
      <div>
        <img src='/' alt='Profile ' />
        <p>Steph</p>
        <p>Fullstack Developer</p>
        <p>Tunga Tech Impact Academy</p>
      </div>
    </div>
  );
}

export default EmployeeProfile;