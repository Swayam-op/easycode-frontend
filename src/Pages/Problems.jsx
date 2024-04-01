import React, { useEffect } from 'react'
import { BsCheck2Circle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { getAllQuestionsThunk, selectAllQuestion } from '../Redux/Reducers/QuestionReducer';
import { useDispatch, useSelector } from 'react-redux';
import { BiShieldAlt2 } from "react-icons/bi";
import { SelectIsAuthenticated } from '../Redux/Reducers/AuthReducer';
const Problems = () => {
    const dispatch = useDispatch();
    const allQuestions = useSelector(selectAllQuestion);
    const isUserAuthenticated = useSelector(SelectIsAuthenticated);
    useEffect(() => {
        dispatch(getAllQuestionsThunk()); // question api will be called based on user authentication
    }, [isUserAuthenticated, dispatch])

    return (
        <div className='w-full max-w-screen-xl mx-auto min-h-screen lg:px-10 md:px-8 sm:px-6 px-2 py-10'>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full table-fixed text-sm text-left text-light-1 ">
                    <thead className="text-xs  border border-transparent border-b-gray-600 uppercase  ">
                        <tr>
                            <th scope="col" colSpan={1} className="sm:px-6 px-2 py-3">
                                Status
                            </th>
                            <th scope="col" colSpan={5} className="sm:px-6 px-2 text-center py-3">
                                Title
                            </th>
                            <th scope="col" colSpan={3} className="sm:px-6 px-2 py-3">
                                Acceptance
                            </th>
                            <th scope="col" colSpan={3} className="sm:px-6 px-2 py-3">
                                Difficulty
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allQuestions && allQuestions.map((item, key) => {
                                return (
                                    <tr key={key} className={`${key % 2 === 0 ? "bg-black" : "bg-dark-2"}`}>
                                        <td colSpan={1} className="sm:px-6 px-2 py-4  font-medium text-gray-900 ">
                                            {
                                                item.hasSolved?
                                                <BsCheck2Circle className='text-green-500 text-xl' /> : <BiShieldAlt2 className='text-lg text-gray-4' />
                                            }
                                        </td>
                                        <td colSpan={5} className="px-6 py-4 cursor-pointer  truncate ">
                                            <Link to={`/problems/${item._id}`} target='_blank' className='hover:text-light-2'>{item.questionName}</Link>
                                        </td>
                                        <td colSpan={3} className="px-6 py-4">
                                            {item.acceptance || "70%"}
                                        </td>
                                        <td colSpan={3} className={`capitalize font-medium px-6 py-4 ${item.level === "easy" ? "text-green-500" : item.level === "medium" ? "text-yellow-500" : "text-red-600"}`}>
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