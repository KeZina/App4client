import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import useUserHandler from './useUserHandler';
import useRoomHandler from './useRoomHandler';

const useWebSocket = () => {
    const [socket, setSocket] = useState();
 
    const [userData, setUserData] = useState({});
    const [roomData, setRoomData] = useState({});

    useEffect(() => {
        setSocket(io('http://localhost:3003'));
    }, [])

   // redirect server responses to correct hook
    useEffect(() => {
        if(socket) {
            socket.on('user', data => setUserData(data));
            socket.on('room', data => setRoomData(data));
        }
    }, [socket])

    const user = useUserHandler(socket, userData);
    const room = useRoomHandler(socket, roomData);

    return {
        user,
        room,
    }
}

export default useWebSocket;