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
          <img className='employee-profile-photo' src='https://avatars.githubusercontent.com/u/148610430?v=4' alt='Profile ' />
          <p className='employee-name'>{user.username}</p>
          <p>{user.job_title}</p>
          <a href='mailto:{user.email}'>{user.email}</a>
          <p>PlutoHR Services Limted</p>
        </div>
      </div>
    </div>
  );
}

export default EmployeeProfile;