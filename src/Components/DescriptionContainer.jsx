import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectQuestion } from '../Redux/Reducers/QuestionReducer'

const DescriptionContainer = () => {
  const question = useSelector(selectQuestion);
  useEffect(()=>{
    //console.log("contraint", question)
  },[question])
  return (
    <>
    {
    question && 
    <div className='w-full'>
      <h1 className='text-2xl mb-10'>{question.questionNo}. {question.questionName}</h1>
      {/* question section --------------------------- */}
      <div className='qsn'>
      {
        question.description.map((paragraph, index)=>{
          return (
            <p key={index} className='mb-4'>
          {paragraph}
        </p>
          )
        })
      }
      </div>
      {/* example sections ------------------------------ */}
      <div className='examples mb-4'>
      {
        question.examples.map((testCase, index)=>{
          return(
            <div key={index} className='py-2'>
          <h1 className='text-lg font-medium mb-2'>Example {index+1}:</h1>
          <div className='border border-transparent border-l-gray-4 border-opacity-30'>
            <p className='px-4 font-medium'><h2 className=' inline'>Inputs: &nbsp; </h2> <span className='text-gray-4'>{testCase.input}</span> </p>
            <p className='px-4 font-medium'><h2 className='font-medium inline'>Output : &nbsp; </h2> <span className='text-gray-4'> {testCase.output}</span></p>
            <p className='px-4 font-medium'><h2 className='font-medium inline'>Explanations :&nbsp; </h2> <span className='text-gray-4'>{testCase.explanation}</span></p>
          </div>
        </div>
          )
          
        })
      }
      </div>
      {/* Contraint sectionv---------------------------------- */}
      <div className='w-full py-4'>
      <h1 className='font-medium mb-2 text-lg'>Contraints</h1>
      <ul className='list-disc list-inside'>
      {
        question.constraint.map((cons)=>{
          return(
            <li className='py-2 text-sm'><span className='bg-gray-1 border border-gray-4 rounded-md p-1'>{cons}</span></li>
          )
        })
      }
      </ul>
      </div>
      {/* acceptance, submission ---------------------------- */}
      <div className='w-full flex py-3'>
      <h1 className='text-sm pr-3 border border-transparent border-r-gray-4'>Accepted <span className='font-medium px-1'>11.2M</span></h1>
      <h1 className='text-sm px-3 border border-transparent border-r-gray-4'>Submissions <span className='font-medium px-1'>22.2M</span></h1>
      <h1 className='text-sm px-3 '>Acceptance Rate <span className='font-medium px-1'>50.19%</span></h1>
      </div>
    </div>
  }
    </>
  )
}

export default DescriptionContainer