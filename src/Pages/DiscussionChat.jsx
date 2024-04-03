import React, { useCallback, useEffect, useState, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { AiOutlineTeam } from "react-icons/ai";
import { FaLaptopCode } from "react-icons/fa";
import { LuSendHorizonal } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { SelectIsAuthenticated } from "../Redux/Reducers/AuthReducer";
import { useNavigate, useParams } from "react-router";
import { getSocketInstance } from "../Services/socket";
import { clearDiscussionDetails, get_User_Room_PreviousMessages, selectPreviousMessages, selectRoomDetails, selectUserChatDetails,  setPreviousMessages } from "../Redux/Reducers/DiscussionReducer";



const DiscussionChat = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(SelectIsAuthenticated);
    const { roomId } = useParams();
    const navigate = useNavigate();

    const userDetails = useSelector(selectUserChatDetails);
    const roomDetails = useSelector(selectRoomDetails);
    const messages = useSelector(selectPreviousMessages);
    const [text, setText] = useState("");

    const [activeUsers, setActiveUsers] = useState([]);
    const [sideBarState, setSideBarState] = useState('closed');
    const messagesEndRef = useRef(null);
    // it get disconnected socket instance
    const socket = getSocketInstance();
    

    const scrollToBottom = useCallback(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollBy({
                top: messagesEndRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, []);

    const handleActiveUsers = (data) => {
        //console.log("active team member", data);
        setActiveUsers(data);
    };

    const recieveMessage = useCallback((data) => {
        dispatch(setPreviousMessages(data))
        setTimeout(() => {
            scrollToBottom();
        }, 50);
    }, [dispatch, scrollToBottom])

    function sendMessege() {
        if (text) {
            const newMessage = {
                text: text,
                userName: userDetails.userName,
                createdAt: new Date().toLocaleString(),
                file: ""
            };

            dispatch(setPreviousMessages(newMessage))
            // setMessages(prevMessages => [...prevMessages, newMessage]);
            socket.emit("message_to_room", {
                text: text,
                roomId: roomId,
                file: ""
            })
        }
        setTimeout(() => {
            scrollToBottom();
        }, 50);
        setText("");
    }
    
    function handleSideBar(option){
        if(option === 'close')
        setSideBarState("closed");
        else
        setSideBarState("opened");
    }



    useEffect(() => {
        console.log(userDetails, socket)
        if (isAuthenticated && !userDetails) { // 
            dispatch(get_User_Room_PreviousMessages({ roomId }));
        }
        // //console.log("after connect & before emit join team", userDetails, roomDetails, messages)
        if (userDetails && socket && !socket.connected) {

            //after messages are loaded, scroll to bottom
            setTimeout(() => {
                scrollToBottom();
            }, 50);

            socket.connect();

            socket.emit('join_room', {
                roomId: roomId,
                userId: userDetails && userDetails._id
            })

            socket.on('activeUsers', handleActiveUsers);

            socket.on('message_from_room', recieveMessage);
            
            socket.on('confirm_disconnect',(check)=>{
                if(check === true){
                    socket.disconnect();
                    socket.off('confirm_disconnect');
                }
            })
        }

        const handleWindowClose = (event) => {
            if (userDetails && socket.connected) {
                socket.emit('discussion_disconnect', roomId); // custome disconnect for only discussion socket
                console.log("socket is disconnecting before")
         
                
                //to prevent multiple triggering of same socket-event. That causes repeatation of messages.
                socket.off('activeUsers', handleActiveUsers);
                socket.off('message_from_room', recieveMessage);
    
                //clearing discussionDetails to make api-call everytime user comes to this page
                dispatch(clearDiscussionDetails());
                // socket.disconnect();
                console.log("socket is disconnecting after")
            }
        };
    
        window.addEventListener('beforeunload', handleWindowClose);
    
        return () => {
            window.removeEventListener('beforeunload', handleWindowClose);
            handleWindowClose();
        };
    }, [userDetails, isAuthenticated])

    

    return (
        <>
            {
                userDetails && roomDetails && messages && (
                    <div className="w-full sm:px-2 bg-black h-screen">

                        {/* Sidebar for small screen to show active usera */}
                        <div className={`${sideBarState === 'closed' ? "invisble opacity-0 -translate-x-full" : "visible opacity-100 translate-x-0"} p-4 bg-black w-full h-full absolute inset-0 z-50 transition-all duration-200 ease-in-out`}>
                            <div className="flex item-center justify-between text-light-1 mb-4">
                                <h3 className=" text-md font-semibold">Active Users</h3>
                                <button onClick={()=>handleSideBar("close")} className="p-2 rounded-full bg-dark-5 hover:dark-5/80"><IoMdClose className="text-md text-light-1 group-hover:text-red-500"/></button>
                            </div>

                            {
                                activeUsers && activeUsers.map((user, index) => (
                                    <div key={index} className="w-full sm:p-4 p-2 flex items-center border border-light-1/35 transition-all duration-150 ease-in-out hover:bg-dark-5 rounded-md sm:mb-2 mb-1">
                                        <div className="w-6 h-6 rounded-full overflow-hidden flex justify-center items-center">
                                            <div
                                                className="w-full h-full bg-cover bg-center"
                                                style={{
                                                    backgroundImage: `url(${user.profilePicture ? user.profilePicture : "/Profile.JPG"})`,
                                                }}
                                            ></div>
                                        </div>
                                        <div className="pl-4 text-sm flex grow text-light-3 justify-between items-center">
                                            <span>
                                                {user.userName}{" "}
                                                <span className="inline-block ml-2 w-1 h-1 rounded-full bg-green-500"></span>
                                            </span>

                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="w-full grid grid-cols-10 gap-4 h-full">
                            <div className="col-span-0 p-1 hidden overflow-y-auto lg:block lg:col-span-2">

                                <div className="p-4 flex justify-between text-light-1 mb-2">
                                    <h3 className=" text-md font-semibold">Active Users</h3>
                                </div>

                                {
                                    activeUsers && activeUsers.map((user, index) => (
                                        <div key={index} className="w-full p-4 flex items-center border border-light-1/35 transition-all duration-150 ease-in-out hover:bg-dark-5 rounded-md mb-2">
                                            <div className="w-6 h-6 rounded-full overflow-hidden flex justify-center items-center">
                                                <div
                                                    className="w-full h-full bg-cover bg-center"
                                                    style={{
                                                        backgroundImage: `url(${user.profilePicture ? user.profilePicture : "/Profile.JPG"})`,
                                                    }}
                                                ></div>
                                            </div>
                                            <div className="pl-4 text-sm flex grow text-light-3 justify-between items-center">
                                                <span>
                                                    {user.userName}{" "}
                                                    <span className="inline-block ml-2 w-1 h-1 rounded-full bg-green-500"></span>
                                                </span>

                                            </div>
                                        </div>
                                    ))
                                }



                            </div>
                            <div className="col-span-10 lg:col-span-8 overflow-hidden flex border border-dark-2 shadow-md shadow-gray-1 flex-col  w-full h-full relative  rounded-sm">
                                <div className="fixed z-40 top-0 left-0 right-0 flex  bg-black rounded-sm">
                                    <div className="w-full py-2 flex justify-between items-center sm:px-4 px-2">

                                        <div className="w-full flex items-center text-light-1">
                                            <FaLaptopCode className="text-md md:text-2xl lg:text-3xl" />
                                            <h1 className="mx-4 text-md font-semibold tracking-wide">
                                                {roomDetails.title}
                                            </h1>
                                        </div>
                                        <div className="flex">
                                            <button className="lg:hidden p-3 bg-dark-5 hover:bg-dark-5/80 rounded-md mr-4" onClick={()=>handleSideBar('open')} ><AiOutlineTeam className="text-lg text-gray-4 hover:text-light-1 " /></button>
                                            <button onClick={() => navigate(-1)} className="p-3 bg-dark-5 hover:bg-dark-5/80 shadow-sm rounded-md">
                                            <MdOutlineKeyboardBackspace className="text-light-1 text-lg" />
                                            </button>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div ref={messagesEndRef} className="flex-1 overflow-y-auto bg-dark-4 scrollbar pt-16 px-4 pb-4">
                                    {
                                        messages && messages.map((item, index) => {
                                            if (item.userName === userDetails.userName) {
                                                return (
                                                    <div key={index} className="bg-dark-5 px-2 z-10 pb-2 max-w-sm ml-auto lg:max-w-lg w-fit rounded-md rounded-tr-none shadow-sm shadow-green-400 border border-green-500 mb-2">
                                                        <div className="w-full flex justify-between items-center py-2 border border-transparent border-b-light-3/40 border-dashed">

                                                            <h5 className="text-light-3/50 text-xs ml-8">{new Date(item.createdAt).toLocaleString()}</h5>
                                                        </div>

                                                        <p className="text-xs text-light-3 py-2 text-pretty break-words">{item.text}</p>
                                                    </div>
                                                )
                                            }
                                            else {
                                                return (
                                                    <div key={index} className="px-2 z-10 pb-2 max-w-sm  lg:max-w-lg w-fit rounded-md bg-dark-5 rounded-tl-none shadow-sm shadow-dark-4 mb-2">
                                                        <div className="w-full flex justify-between items-center py-2 border border-transparent border-b-light-3/40 border-dashed">
                                                            <h5 className=" text-green-500 text-xs">{item.userName}</h5>
                                                            <h5 className="text-light-3/50 text-xs ml-8">{new Date(item.createdAt).toLocaleString()}</h5>
                                                        </div>

                                                        <p className="text-xs text-light-3 py-2 text-pretty break-words">{item.text}</p>
                                                    </div>
                                                )
                                            }
                                        })
                                    }


                                </div>

                                <div className="sticky z-40 bottom-0 left-0 right-0 flex  bg-black rounded-sm">
                                    <textarea onChange={(e) => setText(e.target.value)} value={text} placeholder="Type something ...." className="px-4 pt-2 border-none bg-transparent resize-none  grow text-light-3 focus:outline-none focus:ring-0" />
                                    <button onClick={sendMessege} className="px-5 border-transparent rounded-lg text-sm transition-all duration-200 ease-out hover:bg-light-3 hover:text-black text-light-3 cursor-pointer"><LuSendHorizonal className=" text-xl" /></button>
                                </div>
                            </div>
                        </div>



                    </div>
                )
            }
        </>

    );
};

export default DiscussionChat;
