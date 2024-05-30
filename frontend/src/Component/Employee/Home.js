import React, { useEffect, useState } from 'react'
import { FaHome } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Home = ({user}) => {
  const navigate = useNavigate();
  const [timeDifference, setTimeDifference] = useState(null);
  const workHours = 9; // Define the total work hours

  useEffect(() => {
    const calculateTimeDifference = () => {
      const userTimein = new Date(user.timein);
      const currentTime = new Date();
      const differenceInMilliseconds = currentTime - userTimein;

      // Convert milliseconds to hours and minutes
      const hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
      const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

      setTimeDifference({ hours, minutes });
    };

    // Initial calculation
    calculateTimeDifference();

    // Update time difference every minute
    const intervalId = setInterval(calculateTimeDifference, 60000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [user.timein]);

  const calculateRemainingTime = () => {
    if (timeDifference) {
      const totalMinutesWorked = timeDifference.hours * 60 + timeDifference.minutes;
      const remainingMinutes = workHours * 60 - totalMinutesWorked;
      const remainingHours = Math.floor(remainingMinutes / 60);
      const remainingMinutesPart = remainingMinutes % 60;
      return `${remainingHours} Hrs ${remainingMinutesPart} Mins`;
    }
    return '';
  };

  const handleOpenProfile = ()=>{
    navigate('/profile')
  }

  const handleOpenLeaveForm = ()=>{
    navigate('/leave')
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
              <option name="day" id='day' className='day'>Today</option>
              <option name="day" id='week' className='week'>Today</option>
            </select>
          </div>
          <div className='home-stat-details'>
            <div className='home-stat-worktime'>
              <p>Work Time</p>
              <p>
                {timeDifference && `${timeDifference.hours} hours : ${timeDifference.minutes} minutes`}
              </p>
            </div>
            <div className='home-stat-balance'>
              <div>
                <p>Remaining </p>
                <em>{calculateRemainingTime()}</em>
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
        <div className='attendance-stat'>
          <div className='attendance-stat-heading'>
            <h3>Attendance & Leaves</h3>
            <select>
              <option id='day' className='day'>Today</option>
              <option id='week' className='week'>Today</option>
            </select>
          </div>
          <div className='attendance-stat-detail'>
            <div>
              <p>21</p>
              <p>Total Leaves</p>
            </div>
            <div>
              <p>0</p>
              <em>Leaves Taken</em>
            </div>
            <div>
              <p>0</p>
              <em>Pending Approval</em>
            </div>
            <div>
              <p>0</p> 
              <em>Worked Days</em>
            </div>
            <div>
              <p>0</p> 
              <em>Worked Hours</em>
            </div>
          </div>
          <div>
            <button className='home-leave-apply-button' onClick={handleOpenLeaveForm}>Apply for Leave</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home