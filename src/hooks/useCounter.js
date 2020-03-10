import { useState, useEffect } from "react";

const useCounter = (data) => {
    const [siteUsers, setSiteUsers] = useState([]);
    const [roomUsers, setRoomUsers] = useState([]);

    useEffect(() => {
        const {type, users} = data;

        console.log(data);

        if(type === 'siteUsers') {
            setSiteUsers(users);
        } else if(type === 'roomUsers') {
            setRoomUsers(users);
        } 
    }, [data])

    return {
        siteUsers,
        roomUsers
    }
}

export default useCounter;