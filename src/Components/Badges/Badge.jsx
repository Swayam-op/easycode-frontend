import React from 'react'
import './BadgeCss.css';
const Badge = ({value}) => {
  return (
    <div className='w-full snap-center cursor-pointer'>

   <div className='p-6 shadow-md shadow-dark-5 w-full h-full overflow-hidden bg-center bg-cover '>
    <img src="https://res.cloudinary.com/dxwmsl1s7/image/upload/v1710697323/Badges/oqz2y2hrmdzys7uvgxtq.png" className='w-full h-full' alt="" />

    </div>
    </div>
    
  )
}

export default Badge