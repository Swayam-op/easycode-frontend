'use client';
import { Dropdown } from 'flowbite-react';
import React, { useState } from 'react'
import { TbFileDescription } from 'react-icons/tb'; // description icon
import { MdOutlineScience } from 'react-icons/md'; // solutions icon
import { PiClockClockwiseBold } from 'react-icons/pi'; // submission icon
import {HiOutlineCodeBracket} from 'react-icons/hi2'; // code icon
import DescriptionContainer from '../Components/DescriptionContainer';

const Editor = () => {
    const [leftContainer, setLeftContainer] = useState("description");
    const [programmingLanguage, setProgrammingLanguage] = useState("C++");
    const changeProgrammingLanguage = (value)=>{
        setProgrammingLanguage(()=>value);
    }
    return (
        <div className='relative w-full h-screen  bg-black text-light-1'>
            <div className='w-full h-full flex md:flex-row flex-col justify-between'>
                <div id='left_container' className='h-full w-full mr-1 md:basis-1/2 '>
                    <div className='bg-dark-2 text-sm w-full px-5 py-2.5 flex justify-start'>
                        <div className={`flex items-center ${leftContainer === "description" ? '' : 'text-gray-400'} px-3 border border-transparent border-r-gray-600`}><TbFileDescription className='text-dark-1 mx-1' /> Description</div>
                        <div className={`flex items-center ${leftContainer === "solutions" ? '' : 'text-gray-400'} px-3 border border-transparent border-r-gray-600`}><MdOutlineScience className='text-blue-800 mx-1' /> Solutions</div>
                        <div className={`flex items-center ${leftContainer === "submissions" ? '' : 'text-gray-400'} px-3 `}><PiClockClockwiseBold className='text-orange-600 mx-1' /> Submission</div>
                    </div>
                    <DescriptionContainer/>
                </div>
                <div id='right_container' className=' w-full h-full  md:basis-1/2  '>
                    <div className='bg-dark-2 text-sm w-full px-3 py-2 flex justify-start'>
                        <div className={`flex items-center ${leftContainer === "description" ? '' : 'text-gray-400'} pr-3 border border-transparent border-r-gray-600 font-medium`}><HiOutlineCodeBracket className='text-lg text-green-600 mx-1' /> Code</div>
                        <div className={`flex items-center ${leftContainer === "solutions" ? '' : 'text-gray-400'} px-3 border border-transparent border-r-gray-600`}><MdOutlineScience className='text-blue-800 mx-1 text-lg' /> <Dropdown label="Dropdown button" dismissOnClick={false} renderTrigger={() => <button className='px-2 py-1 text-xs bg-black shadow-lg rounded-md text-light-1 font-medium'>{programmingLanguage}</button>}>
      <Dropdown.Item onClick={()=>changeProgrammingLanguage("c++")} >C++</Dropdown.Item>
      <Dropdown.Item onClick={()=>changeProgrammingLanguage("java")}>Java</Dropdown.Item>
      <Dropdown.Item onClick={()=>changeProgrammingLanguage("python")}>Python</Dropdown.Item>
      <Dropdown.Item onClick={()=>changeProgrammingLanguage("C")}>C</Dropdown.Item>
    </Dropdown></div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Editor