import React from 'react'

const HomeBG = () => {
  return (
    <div className='absolute inset-0'>
        <div className='absolute top-10 right-40'>
            <img className='w-12' src="/images/cpp.png" alt="" />
        </div>
        <div className='absolute bottom-1/2 right-1/4'>
            <img className='w-12' src="/images/js.png" alt="" />
        </div>
        <div className='absolute bottom-16 left-1/4'>
            <img className='w-16' src="/images/nodejs.png" alt="" />
        </div>
        <div className='absolute top-10 left-10'>
            <img className='w-12' src="/images/python.png" alt="" />
        </div>
    </div>
  )
}

export default HomeBG