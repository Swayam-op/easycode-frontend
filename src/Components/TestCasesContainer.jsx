import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectQuestion } from '../Redux/Reducers/QuestionReducer'

const TestCasesContainer = () => {
    const question = useSelector(selectQuestion);
    const [testCases, setTestCases] = useState([]);
    const [index, setIndex] = useState(0);
    useEffect(()=>{
        if(question){
            setTestCases(question.testCasesToDisplay);
        }
    },[question])
    
    function alterTestCase(ind){
        setIndex(ind);
    }

    return (
        <div className='w-full'>
        {
            testCases && 
            <div className='w-full flex py-3'>
                {testCases.map((testCase, ind)=>{
                    return(
                        <>
                        <button onClick={()=>alterTestCase(ind)} key={ind} className={`${index === ind ? "bg-light-3 text-dark-2":"bg-dark-2 text-light-3"} border border-black px-4 py-1.5 mx-2 rounded-md  tracking-wider hover:bg-black hover:text-white`}>Case-{ind+1}</button>
                        </>
                    )
                })}
            </div>
        }
            
            <div>
            {
                testCases &&
                <>
                <h1 className='text-light-3 tracking-wide mb-2'>Input: </h1>
                <div className='w-full bg-dark-2 py-4 px-3 rounded-md '>{testCases[index]}</div>
                </>
            }
                
            </div>
        </div>
    )
}

export default TestCasesContainer