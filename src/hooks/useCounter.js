import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

const useCounter = (socket, data, name) => {
    const [siteUsers, setSiteUsers] = useState([]);
    const [roomUsers, setRoomUsers] = useState([]);
    const [registeredUsers, setRegisteredUsers] = useState([]);

    const history = useHistory();

    useEffect(() => {
        if(socket && name && (history.location.pathname === '/users' || history.location.pathname === '/profile/my-friends')) {
            socket.emit('users', {
                type: 'getUsers',
                goal: 'getRegisteredUsers',
                name
            })
        }
    }, [socket, history.location.pathname, siteUsers])

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