import React from 'react'
import './BadgeCss.css';
const Badge = ({value}) => {
  return (
    <div className='w-full snap-center'>
<div className="badge_container mx-5 shadow-light-2 grid place-content-center w-28 h-28 bg-opacity-20  bg-dark-3 shadow-xl">
      <div className="badge_container grid place-content-center w-24 h-24 bg-opacity-80  bg-black shadow-xl">
      <h1 className='text-center block text-lg font-bold text-light-1'>{value}</h1>
      <h1 className='text-center text-sm font-semibold text-light-2 tracking-wider'><span className='text-light-1'>Easy</span>Code</h1>
      </div>
    </div>
    </div>
    
  )
}

export default Badge