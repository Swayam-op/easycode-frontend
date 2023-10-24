import React from 'react'

const DescriptionContainer = () => {
  return (
    <div className='w-full scrollbar h-90/100  overflow-y-scroll text-light-1 py-8 px-7'>
      <h1 className='text-2xl mb-10'>138. Copy List with Random Pointer</h1>
      {/* question section --------------------------- */}
      <div className='qsn'>
        <p className='mb-4'>
          Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
        </p>
        <p className='mb-4'>
          You may assume that each input would have exactly one solution, and you may not use the same element twice.
        </p>
        <p className='mb-4'>
          You can return the answer in any order.
        </p>
      </div>
      {/* example sections ------------------------------ */}
      <div className='examples mb-4'>
        <div className='py-2'>
          <h1 className='text-lg font-medium mb-2'>Example 1:</h1>
          <p className='border border-transparent border-l-dark-1'>
            <p className='px-4 font-medium'><h2 className=' inline'>Inputs: &nbsp; </h2> <span className='text-gray-4'>nums = [2,7,11,15], target = 9</span> </p>
            <p className='px-4 font-medium'><h2 className='font-medium inline'>Output : &nbsp; </h2> <span className='text-gray-4'> [0,1]</span></p>
            <p className='px-4 font-medium'><h2 className='font-medium inline'>Explanations :&nbsp; </h2> <span className='text-gray-4'>Because nums[0] + nums[1] == 9, we return [0, 1].</span></p>
          </p>
        </div>
        <div className='py-2' >
          <h1 className='text-lg font-medium mb-2'>Example 2:</h1>
          <p className='border border-transparent border-l-dark-1'>
            <p className='px-4 font-medium'><h2 className='font-medium inline'>Inputs : &nbsp;</h2> <span className='text-gray-4'>nums = [3,2,4], target = 6</span></p>
            <p className='px-4 font-medium'><h2 className='font-medium inline'>Output :&nbsp; </h2> <span className='text-gray-4'>[1,2]</span></p>
          </p>
        </div>
        <div className='py-2'>
          <h1 className='text-lg font-medium mb-2'>Example 3:</h1>
          <p className='border border-transparent border-l-dark-1'>
            <p className='px-4 font-medium'><h2 className='font-medium inline'>Inputs : &nbsp;</h2><span className='text-gray-4'> nums = [3,3], target = 6</span></p>
            <p className='px-4 font-medium'><h2 className='font-medium inline'>Output :&nbsp; </h2><span className='text-gray-4'> [0,1]</span></p>
          </p>
        </div>
      </div>
      {/* Contraint sectionv---------------------------------- */}
      <div className='w-full py-4'>
      <h1 className='font-medium mb-2 text-lg'>Contraints</h1>
      <ul className='list-disc list-inside'>
        <li className='py-2 text-sm'><span className='bg-gray-1 border border-gray-4 rounded-md p-1'>{"2 <= nums.length <= 104"}</span></li>
        <li className='py-2 text-sm'><span className='bg-gray-1 border border-gray-4 rounded-md p-1'>{"-109 <= nums[i] <= 109"}</span></li>
        <li className='py-2 text-sm'><span className='bg-gray-1 border border-gray-4 rounded-md p-1'>{"-109 <= target <= 109"}</span></li>
      </ul>
      </div>
      {/* acceptance, submission ---------------------------- */}
      <div className='w-full flex py-3'>
      <h1 className='text-sm pr-3 border border-transparent border-r-gray-4'>Accepted <span className='font-medium px-1'>11.2M</span></h1>
      <h1 className='text-sm px-3 border border-transparent border-r-gray-4'>Submissions <span className='font-medium px-1'>22.2M</span></h1>
      <h1 className='text-sm px-3 '>Acceptance Rate <span className='font-medium px-1'>50.19%</span></h1>
      </div>
    </div>
  )
}

export default DescriptionContainer