import React from 'react';
import { useNavigate } from 'react-router-dom';

function SignOut({ onLogOut }) {
  const navigate = useNavigate();

  const handleNoSignOut = () => {
    navigate('/'); 
  };

  const handleYesSignOut = () => {
    onLogOut(); 
    navigate('/login'); 
  };

  return (
    <div className='logout'>
      <div className='signout-container'>
        <p>Do you want to log out?</p>
        <div className='signout-btn-cont'>
          <button className='signout-button' onClick={handleYesSignOut}>Yes</button>
          <button className='signout-button' onClick={handleNoSignOut}>No</button>
        </div>
      </div>
    </div>
  );
}

export default SignOut;
