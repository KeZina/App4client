import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import useUserHandler from './useUserHandler';
import useRoomHandler from './useRoomHandler';
import useCounter from './useCounter';

const useWebSocket = () => {
    const [socket, setSocket] = useState();
 
    const [userData, setUserData] = useState({});
    const [roomData, setRoomData] = useState({});
    const [counterData, setCounterData] = useState({});

    useEffect(() => {
        setSocket(io('http://localhost:3003'));
    }, [])

   // redirect server responses to correct hook
    useEffect(() => {
        if(socket) {
            socket.on('user', data => setUserData(data));
            socket.on('room', data => setRoomData(data));
            socket.on('counter', data => setCounterData(data));
        }
    }, [socket])


    const user = useUserHandler(socket, userData);
    const room = useRoomHandler(socket, roomData, user.name);
    const counter = useCounter(counterData);

    return {
        user,
        room,
        counter
    }
}

export default useWebSocket;