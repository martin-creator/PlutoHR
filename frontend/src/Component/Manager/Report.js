import React from 'react'
import { FaTable } from 'react-icons/fa'

const Report = () => {
  return (
    <div className='report'>
      <h3 className='report-heading'>
        <span><FaTable /></span>
        Report
      </h3>
      <div className='report-display'>
         <a href='https://plutohr-yh2n.onrender.com/api/v1/manager/company-overview/'>Download Company Overview</a>
        <a href='https://plutohr-yh2n.onrender.com/api/v1/manager/attendance/report/'>Download Attendance Report</a>
        <a href='https://plutohr-yh2n.onrender.com/api/v1/manager/leave/report/'>Download Leave Report</a>
      </div>
    </div>
  )
}

export default Report;