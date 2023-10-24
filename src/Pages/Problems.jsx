import React from 'react'
import { problemsApi } from '../Api/ProblemsApi';
import {BsCheck2Circle} from 'react-icons/bs';
import {FaRegCircleXmark} from 'react-icons/fa6';
import {FiEdit} from 'react-icons/fi';
import { Link } from 'react-router-dom';
const Problems = () => {
  return (
    <div className='w-full lg:px-48 py-10'>
    
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full table-fixed text-sm text-left text-light-1 ">
        <thead class="text-xs  border border-transparent border-b-gray-600 uppercase  ">
            <tr>
                <th scope="col" colSpan={1} class="px-6 py-3">
                    Status
                </th>
                <th scope="col" colSpan={5} class="px-6 py-3">
                    Title
                </th>
                <th scope="col" colSpan={3} class="px-6 py-3">
                    Acceptance
                </th>
                <th scope="col" colSpan={3} class="px-6 py-3">
                    Difficulty
                </th>
            </tr>
        </thead>
        <tbody>
        {
            problemsApi && problemsApi.map((item, key)=>{
                return (
                    <tr className={`${key%2 === 0?"bg-black":"bg-dark-2"}`}>
                <td colSpan={1} class="px-6 py-4  font-medium text-gray-900 ">
                {item.status === "solved"?<BsCheck2Circle className='text-green-500 text-xl'/>:item.status === "attempted"? <FaRegCircleXmark className="text-lg text-red-600"/>:<FiEdit className='text-lg text-yellow-500'/>}
                </td>
                <td colSpan={5} class="px-6 py-4 cursor-pointer  truncate ">
                <Link to={`/editor/${key}`} className='hover:text-dark-1'>{item.title}</Link>
                </td>
                <td colSpan={3} class="px-6 py-4">
                {item.acceptance}
                </td>
                <td colSpan={3} class={`capitalize font-medium px-6 py-4 ${item.difficulty === "easy"?"text-green-500":item.difficulty === "medium"?"text-yellow-500":"text-red-600"}`}>
                {item.difficulty}
                </td>
            </tr>
                )
            })
        }
            

        </tbody>
    </table>
</div>

    </div>
  )
}

export default Problems