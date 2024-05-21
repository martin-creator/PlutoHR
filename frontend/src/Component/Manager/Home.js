import React, { useEffect, useState } from 'react'
import { FaHome } from 'react-icons/fa'
import axios from 'axios'

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/employee/list')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  let usersCount = users.length

  return (
    <div className='home'>
      <h3 className='home-heading'>
        <span><FaHome /></span>
        Home
      </h3>
      <div className='home-details'>
        <div className='item1'>
          <div>{usersCount}</div>
          <div>Number of employees</div>
        </div>
        <div className='item2'>
          <div>10</div>
          <div>Total hours worked</div>
        </div>
        <div className='item3'>
          <div>10</div>
          <div>Number of department</div>
        </div>
        <div className='item4'>
          <div>10</div>
          <div>Growth</div>
        </div>
      </div>
    </div>
  )
}

export default Home