import React from 'react'
import { FaCodeMerge } from 'react-icons/fa6'
const Footer = () => {
  return (
    

<footer className="bg-dark-3 w-full rounded-lg shadow">
    <div className="w-full flex justify-between items-center max-w-screen-xl mx-auto p-4 ">
    <div className='flex basis-1/3 items-center font-bold uppercase'><FaCodeMerge className="text-light-2 text-xl font-bold inline mr-2"/> <span className='sm:text-lg text-sm text-light-2 -tracking-tight'>EASy</span><span className='sm:text-lg text-sm text-light-1'>CODE</span></div>
    <span className="block sm:text-sm text-xs text-gray-500 sm:text-center ">© 2024 <a href="https://swayam-op.web.app" className="hover:underline">Swayam_Op™</a>. All Rights Reserved.</span>
    </div>
</footer>


  )
}

export default Footer