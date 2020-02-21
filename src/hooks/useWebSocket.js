import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import useUserHandler from './useUserHandler';

const useWebSocket = () => {
    const [socket, setSocket] = useState();
 
    const [userData, setUserData] = useState({});

    useEffect(() => {
        setSocket(io('http://localhost:3003'));
    }, [])

   // redirect server responses to correct hook
    useEffect(() => {
       socket && 
       socket.on('user', data => setUserData(data))
    }, [socket])

    useUserHandler(userData);
}

export default useWebSocket;