'use client';

import React, { useEffect, useState } from 'react'
import { TbFileDescription } from 'react-icons/tb'; // description icon
import { MdOutlineScience } from 'react-icons/md'; // solutions icon

import DescriptionContainer from '../Components/DescriptionContainer';
import CodeSpace from '../Components/CodeSpace';
import SubmissionContainer from '../Components/SubmissionContainer';
import TestCasesContainer from '../Components/TestCasesContainer';
import TestResultContainer from '../Components/TestResultContainer';
import { BiCodeAlt } from "react-icons/bi";
import { AiFillTrophy } from "react-icons/ai";
import { AiOutlineReconciliation } from "react-icons/ai";
import { useParams } from 'react-router';
import { getQuestionByIdThunk } from '../Redux/Reducers/QuestionReducer';
import { useDispatch } from 'react-redux';
import SolutionContianer from '../Components/SolutionContianer';


const Editor = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [leftContainer, setLeftContainer] = useState("description");
    const [isShowSolutionVisible, setIsShowSolutionVisible] = useState("hidden");

    const switchContainer = (currentContainer)=>{
        setLeftContainer(currentContainer);
    }
    
    function alterSolutionVisibility(){
        if(isShowSolutionVisible === "hidden"){
            setIsShowSolutionVisible("block");
        }
        else{
            setIsShowSolutionVisible("hidden");
        }
    }

    useEffect(()=>{
        //console.log(id);
        dispatch(getQuestionByIdThunk({questionId : id}));
    },[id, dispatch])

    return (
        <div className='relative w-full sm:h-screen  bg-black text-light-1'>

            <div className='w-full h-full flex md:flex-row flex-col justify-between'>
                <div id='left_container' className='h-full w-full flex flex-col mr-1 md:basis-5/12 '>
                    <div className='bg-dark-2 text-sm w-full px-5 py-2.5 flex justify-start scrollbar overflow-x-auto'>
                        <button onClick={()=>switchContainer("description")} className={`flex items-center ${leftContainer === "description" ? '' : 'text-gray-400'} px-3 border border-transparent border-r-gray-600`}><TbFileDescription className='text-dark-1 mx-1 text-lg' /> Description</button>
                        <button onClick={()=>switchContainer("solutions")} className={`flex items-center ${leftContainer === "solutions" ? '' : 'text-gray-400'} px-3 border border-transparent border-r-gray-600`}><MdOutlineScience className='text-lg text-blue-800 mx-1' /> Solutions</button>
                        <button onClick={()=>switchContainer("submissions")}  className={`flex items-center ${leftContainer === "submissions" ? '' : 'text-gray-400'} px-3 border border-transparent border-r-gray-600`}><AiFillTrophy className='text-yellow-500 text-lg mx-1' /> Submission</button>
                        <button onClick={()=>switchContainer("testcase")} className={`flex items-center ${leftContainer === "testcase" ? '' : 'text-gray-400'} px-3 border border-transparent border-r-gray-600`}>< BiCodeAlt className='text-green-500 text-lg mx-1' /> Testcase</button>
                        <button onClick={()=>switchContainer("testresult")} className={`flex items-center ${leftContainer === "testresult" ? '' : 'text-gray-400'} px-3 `}><AiOutlineReconciliation className='text-orange-500 text-lg mx-1' /> Test Result</button>

                    </div>
                    <div className='w-full h-full grow scrollbar  overflow-y-scroll text-light-1 py-8 px-1 md:px-7'>

                    {
                        leftContainer === "description" ? <DescriptionContainer/> :
                        (leftContainer === "solutions" ? <SolutionContianer alterSolutionVisibility = {alterSolutionVisibility}/> : 
                        (leftContainer === "submissions" ? <SubmissionContainer/> :
                        (leftContainer === "testcase" ? <TestCasesContainer/> : 
                        <TestResultContainer/>)))
                    }
                  
                    </div>
                    
                </div>
                <div id='right_container' className='w-full relative  overflow-hidden h-full  md:basis-7/12  '>
                    
                    <CodeSpace switchContainer={switchContainer} />
                </div>
            </div>


        </div>
    )
}

export default Editor