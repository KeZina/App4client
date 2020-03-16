import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

const useCounter = (socket, data) => {
    const [siteUsers, setSiteUsers] = useState([]);
    const [roomUsers, setRoomUsers] = useState([]);
    const [registeredUsers, setRegisteredUsers] = useState([]);

    const history = useHistory();

    useEffect(() => {
        if(socket && history.location.pathname === '/users-list') {
            socket.emit('users', {
                type: 'getUsers',
                goal: 'getRegisteredUsers'
            })
        }
    }, [socket, history.location.pathname])

    useEffect(() => {
        const {type, users} = data;

        if(type === 'siteUsers') {
            setSiteUsers(users);
        } else if(type === 'roomUsers') {
            setRoomUsers(users);
        } else if(type === 'registeredUsers') {
            setRegisteredUsers(users);
        }
    }, [data])

    return {
        siteUsers,
        roomUsers,
        registeredUsers
    }
}

export default useCounter;