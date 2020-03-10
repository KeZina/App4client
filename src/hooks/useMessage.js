import { useState, useEffect } from "react";

const useMessage = (socket, data) => {
    const [roomMessages, setRoomMessages] = useState([]);
    const [notifications, setNotifications] = useState([]);

    const inviteUser = name => {
        socket.emit('message', {
            type: 'inviteUser',
            name
        })
    }

    // const acceptInvite = () => {

    // }

    // const refuseInvite = () => {

    // }

    useEffect(() => {
        const {type, content} = data;

        if(type === 'inviteToRoom') {
            setNotifications([
                ...notifications,
                {
                    type,
                    content
                }
            ])
        }
    }, [data])

    return {
        notifications,
        inviteUser,
        // acceptInvite,
        // refuseInvite
    }
}

export default useMessage;