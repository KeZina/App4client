import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import useUser from './useUser';
import useRoom from './useRoom';
import useMessage from './useMessage';
import useCounter from './useCounter';

const useWebSocket = () => {
    const [socket, setSocket] = useState();
 
    const [userData, setUserData] = useState({});
    const [roomData, setRoomData] = useState({});
    const [messageData, setMessageData] = useState({});
    const [counterData, setCounterData] = useState({});

    useEffect(() => {
        setSocket(io('http://localhost:3003'));
    }, [])

   // redirect server responses to correct hook
    useEffect(() => {
        if(socket) {
            socket.on('user', data => setUserData(data));
            socket.on('room', data => setRoomData(data));
            socket.on('message', data => setMessageData(data));
            socket.on('counter', data => setCounterData(data));
        }
    }, [socket])

    const user = useUser(socket, userData);
    const room = useRoom(socket, roomData, user.name);
    const message = useMessage(socket, messageData, room.enterRoom);
    const counter = useCounter(counterData);

    return {
        socket,
        user,
        room,
        message,
        counter
    }
}

export default useWebSocket;