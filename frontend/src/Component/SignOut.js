import React from 'react'
import { useNavigate } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();

  const handleNoSignOut = () => {
    navigate('/'); 
  };

  return (
    <div>
      <button className='signout-button' onClick={handleNoSignOut}>No</button>
    </div>
  );
}

const SignOut = ({onSignOut, onNoSignOut}) => {
  return (
    <div className='logout'>
      <div className='signout-container'>
        <p>Do you want to log out?</p>
        <div className='signout-btn-cont'>
          <button className='signout-button' onClick={onSignOut}>Yes</button>
          <Navigation onNoSignOut={onNoSignOut}/>
        </div>
      </div>
    </div>
  )
}

export default SignOut