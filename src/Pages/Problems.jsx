import React, { useEffect } from 'react'
import { BsCheck2Circle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { getAllQuestionsThunk, selectAllQuestion } from '../Redux/Reducers/QuestionReducer';
import { useDispatch, useSelector } from 'react-redux';
import { BiShieldAlt2 } from "react-icons/bi";
import { getIsAuthenticated } from '../Redux/Reducers/UserReducer';
const Problems = () => {
    const dispatch = useDispatch();
    const allQuestions = useSelector(selectAllQuestion);
    const isUserAuthenticated = useSelector(getIsAuthenticated);
    useEffect(() => {
        dispatch(getAllQuestionsThunk()); // question api will be called based on user authentication
    }, [isUserAuthenticated, dispatch])

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
                            allQuestions && allQuestions.map((item, key) => {
                                return (
                                    <tr className={`${key % 2 === 0 ? "bg-black" : "bg-dark-2"}`}>
                                        <td colSpan={1} class="px-6 py-4  font-medium text-gray-900 ">
                                            {
                                                item.hasSolved?
                                                <BsCheck2Circle className='text-green-500 text-xl' /> : <BiShieldAlt2 className='text-lg text-gray-4' />
                                            }
                                        </td>
                                        <td colSpan={5} class="px-6 py-4 cursor-pointer  truncate ">
                                            <Link to={`/problems/${item._id}`} target='_blank' className='hover:text-light-2'>{item.questionName}</Link>
                                        </td>
                                        <td colSpan={3} class="px-6 py-4">
                                            {item.acceptance || "70%"}
                                        </td>
                                        <td colSpan={3} class={`capitalize font-medium px-6 py-4 ${item.level === "easy" ? "text-green-500" : item.level === "medium" ? "text-yellow-500" : "text-red-600"}`}>
                                            {item.level}
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