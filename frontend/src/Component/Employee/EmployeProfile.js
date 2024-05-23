import React from 'react';
import { FaUser } from 'react-icons/fa';

function EmployeeProfile( { user} ) {
  return (
    <div className='profile'>
      <h3 className='profile-heading'>
        <span><FaUser /></span>
        Profile
      </h3>
      <div className='profile-container'>
        <div>
          <img src='/' alt='Profile ' />
          <p>{user.username}</p>
          <p>{user.job_title}</p>
          <p>{user.email}</p>
          <p>Tunga Tech Impact Academy</p>
        </div>
      </div>
    </div>
  );
}

export default EmployeeProfile;