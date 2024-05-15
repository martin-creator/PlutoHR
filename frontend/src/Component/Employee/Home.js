import React from 'react'
import { FaHome } from 'react-icons/fa'

const Home = () => {
  return (
    <div className='home'>
      <h3 className='home-heading'>
        <span><FaHome /></span>
        Home
      </h3>
      <div className='home-details'>
        <div className='item1'>
          <div>20</div>
          <div>Number of years</div>
        </div>
        <div className='item2'>
          <div>1000</div>
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