import React, { useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { updateUserDetails } from '../../Redux/Reducers/UserReducer';
const EditProfile = ({closeProfileEditTab, closeEditProfile, userInformation}) => {
    const [state, setState] = useState(userInformation.userDetails);
    const [shouldSubmit, setShouldSubmit] = useState(false); // onSubmit was executing function while closing the tab, so this state ensure whther any field is changed. If true then allow submit
    const dispatch = useDispatch();
    function handleSubmit(e){
        e.preventDefault();
        if(shouldSubmit){
            //console.log(e.target);
            dispatch(updateUserDetails(state));
            setShouldSubmit(false);
        }
    }
    function handleChange(e){
        e.preventDefault();
        //console.log(e);
        setShouldSubmit(true);
        setState({...state, [e.target.name]:e.target.value});
    }
    useEffect(()=>{
        //console.log("state is : ", state);
    },[state])
  return (
    <div className={`${closeProfileEditTab ? "hidden" : "block"} fixed h-screen sidebar overflow-y-auto scrollbar inset-0 w-full top-0 bg-dark-4 z-50 rounded-md`}>
    

    
<form onChange={handleChange}  className='max-w-6xl  mx-auto  w-full bg-dark-4 p-4 ' onSubmit={handleSubmit}>
<div className='mb-5 flex justify-between'>
    <h1 className='text-md md:text-xl font-semibold text-dark-1 '>Edit Profile</h1>
    <button onClick={()=>closeEditProfile('close')} className='p-3 bg-dark-5 rounded-full text-light-3 group'>
    <IoMdClose className='text-lg group-hover:text-red-500'/>
    </button>
    
    </div>
    <div className="grid gap-6 mb-6 md:grid-cols-2 ">
        <div>
            <label for="fullname" className="block mb-2 text-sm font-medium text-light-3 ">Full Name</label>
            <input value={state.fullname} name="fullname" type="text" id="fullname" className="bg-dark-5  text-light-3 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="John" />
        </div>
        <div>
            <label for="bio" className="block mb-2 text-sm font-medium text-light-3">Bio</label>
            <input value={state.bio} name="bio" type="text" id="bio" className="bg-dark-5  text-light-3 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Doe" />
        </div>
        <div>
            <label for="location" className="block mb-2 text-sm font-medium text-light-3">Location</label>
            <input value={state.location} name="location" type="text" id="location" className="bg-dark-5  text-light-3 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Flowbite" />
        </div>  
        <div>
            <label for="college" className="block mb-2 text-sm font-medium text-light-3">College</label>
            <input value={state.college} name="college" type="text" id="college" className="bg-dark-5  text-light-3 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="College Name"  />
        </div>
        <div>
            <label for="portfolio" className="block mb-2 text-sm font-medium text-light-3">Portfolio URL</label>
            <input value={state.portfolio} name="portfolio" type="url" id="portfolio" className="bg-dark-5  text-light-3 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="flowbite.com" />
        </div>
        <div>
            <label for="company" className="block mb-2 text-sm font-medium text-light-3">Company</label>
            <input value={state.company} name="company" type="text" id="company" className="bg-dark-5  text-light-3 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" />
        </div>
        <div>
            <label for="linkdin" className="block mb-2 text-sm font-medium text-light-3">Linkdin</label>
            <input value={state.linkdin} name="linkdin" type="url" id="linkdin" className="bg-dark-5  text-light-3 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" />
        </div>
        <div>
            <label for="twitter" className="block mb-2 text-sm font-medium text-light-3">Twitter</label>
            <input value={state.twitter} name="twitter" type="url" id="twitter" className="bg-dark-5  text-light-3 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" />
        </div>
        <div>
            <label for="github" className="block mb-2 text-sm font-medium text-light-3">Github</label>
            <input value={state.github} name="github" type="url" id="github" className="bg-dark-5  text-light-3 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" />
        </div>
        

    </div>
    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>

    </div>
  )
}

export default EditProfile