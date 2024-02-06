import React from 'react'
import './BadgeCss.css';
const Badge = ({value}) => {
  return (
    <div className='w-full snap-center'>
<div className="badge_container mx-5 overflow-hidde flex justify-center p-1 w-24 h-24 bg-opacity-40 bg-dark-3  ">
   <div className='badge_container w-full h-full overflow-hidden bg-center bg-cover ' style={{backgroundImage : "url('/itachi.jpg')"}}>
    {/* <img src="/itachi.jpg" className='w-full h-full' alt="" /> */}
   </div>
    </div>
    </div>
    
  )
}

export default Badge