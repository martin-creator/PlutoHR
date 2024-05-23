import React from 'react'
import { FaHome } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Home = ({user}) => {
  const navigate = useNavigate();

  const handleOpenProfile = ()=>{
    navigate('/profile')
  }
  return (
    <div className='home'>
      <h3 className='home-heading'>
        <span><FaHome /></span>
        Home
      </h3>
      <div className='home-details'>
        <div className='home-profile'>
          <div className='home-profile-desc'>
            <div>Welcome back, {user.username}</div>
            <div>I wish you a great day 👍 </div>
            <button className='open-profile-button' onClick={handleOpenProfile}>View Profile</button>
          </div>
          <div className='home-profile-img'>
            <img src='https://avatars.githubusercontent.com/u/148610430?v=4' alt='Profile' />
          </div>
        </div>
        <div className='home-stats'>
          <div className='home-stat-heading'>
            <h3>Statistics</h3>
            <select for="day">
              <option id='day' className='day'>Today</option>
            </select>
          </div>
          <div className='home-stat-details'>
            <div className='home-stat-worktime'>
              <p>Work Time</p>
              <p>6 Hrs : 40 Mins</p>
            </div>
            <div className='home-stat-balance'>
              <div>
                <p>Remaining </p>
                <em>2 Hrs 20 Mins</em>
              </div>
              <div>
                <p>Overtime</p>
                <em>0 Hrs 00 Mins</em>
              </div>
              <div>
                <p>Break</p> 
                <em>1 Hrs 00 Mins</em>
              </div>
            </div>
          </div>
        </div>
        <div className='item3'>
          <div>10</div>
          <div>Growth</div>
        </div>
      </div>
    </div>
  )
}

export default Home