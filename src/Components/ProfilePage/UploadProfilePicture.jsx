import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { uplaodProfilePictureThunk } from '../../Redux/Reducers/UserReducer';
import { IoMdClose } from 'react-icons/io';

const UploadProfilePicture = ({closeUploadPicture,closeUploadPictureTab, currentImage}) => {
    const dispatch = useDispatch();
    const [profileImage, setProfileImage] = useState(currentImage);
    const profileImageHandle = (e)=>{
        e.preventDefault();
        const file = e.target.files[0]; // Get the selected file
        const imageUrl = URL.createObjectURL(file); // Create a URL for the file
        setProfileImage(imageUrl);
    }

    const handleProfileImageUpload = ()=>{
        const file = document.getElementById('dropzone-file').files && document.getElementById('dropzone-file').files[0];
        // //console.log(file);
        if(!file)return ;

        //console.log("file is about to upload")
        const formData = new FormData();
        formData.append('profile_image', file);
        //console.log("form data", formData)
        dispatch(uplaodProfilePictureThunk(formData));
    }
    return (
        <div className={`${closeUploadPictureTab ? "hidden" : "flex"} fixed z-50 left-0 top-0 w-full bg-black h-screen justify-center items-center`}>
        <button onClick={()=>closeUploadPicture('close')} className='p-3 absolute top-5 right-4 bg-dark-5 rounded-full text-light-3 group'>
    <IoMdClose className='text-lg group-hover:text-red-500'/>
    </button>
            <div className='sm:basis-1/2 w-full p-5 shadow-md border border-dark-5 flex flex-col justify-center items-center'>
                <div className='w-40 h-40 rounded-md shadow-md bg-center bg-cover shadow-dark-5 mb-6' style={
                    {
                       backgroundImage: `url(${profileImage})`
                    }
                }>

                    

                </div>
                <div className="flex items-center justify-center w-full mb-6">
                        <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-2 border-dashed rounded-lg cursor-pointer bg-dark-5 ">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor"  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG (Max Size 5 MB)</p>
                            </div>
                            <input onChange={profileImageHandle} id="dropzone-file" type="file" name='profile_image' className="hidden" />
                        </label>
                    </div>
                    <button onClick={handleProfileImageUpload} className='py-2.5 px-6 text-center rounded-md font-semibold text-xs text-light-1 bg-black hover:bg-dark-4 bg-gradient-to-br from-bg-dark-5 to-bg-dark-4 shadow-shadow-inset-2'>Upload</button>
            </div>


        </div>
    )
}

export default UploadProfilePicture 