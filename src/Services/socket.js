import { io } from "socket.io-client";
const SOCKET_URL = process.env.SOCKET_URL;



let socketInstance = null;

export function getSocketInstance() {
    if (!socketInstance) {
        // Create your socket instance here
        socketInstance = createSocketInstance();
    }
    return socketInstance;
}

function createSocketInstance() {
     const socket = io(
        process.env.REACT_APP_SOCKET_URL || "http://localhost:5000/", 
        {
        withCredentials: true,}
    ); // Replace with your socket library instantiation
    // Additional configurations or event listeners can be added here

    // Disconnect initially
    socket.disconnect();

    return socket;
}