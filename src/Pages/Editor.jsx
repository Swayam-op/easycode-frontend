'use client';

import React, { useState } from 'react'
import { TbFileDescription } from 'react-icons/tb'; // description icon
import { MdOutlineScience } from 'react-icons/md'; // solutions icon
import { PiClockClockwiseBold } from 'react-icons/pi'; // submission icon

import DescriptionContainer from '../Components/DescriptionContainer';
import CodeSpace from '../Components/CodeSpace';

const Editor = () => {
    const [leftContainer, setLeftContainer] = useState("description");
    function h(){
        setLeftContainer("description");
    }
    return (
        <div className='relative w-full sm:h-screen  bg-black text-light-1'>
            <div className='w-full h-full flex md:flex-row flex-col justify-between'>
                <div id='left_container' className='h-full w-full mr-1 md:basis-1/2 '>
                    <div className='bg-dark-2 text-sm w-full px-5 py-2.5 flex justify-start'>
                        <div onClick={h} className={`flex items-center ${leftContainer === "description" ? '' : 'text-gray-400'} px-3 border border-transparent border-r-gray-600`}><TbFileDescription className='text-dark-1 mx-1' /> Description</div>
                        <div className={`flex items-center ${leftContainer === "solutions" ? '' : 'text-gray-400'} px-3 border border-transparent border-r-gray-600`}><MdOutlineScience className='text-blue-800 mx-1' /> Solutions</div>
                        <div className={`flex items-center ${leftContainer === "submissions" ? '' : 'text-gray-400'} px-3 `}><PiClockClockwiseBold className='text-orange-600 mx-1' /> Submission</div>
                    </div>
                    <DescriptionContainer />
                </div>
                <div id='right_container' className=' w-full h-full  md:basis-1/2  '>
                    
                    <CodeSpace />
                </div>
            </div>


        </div>
    )
}

export default Editor