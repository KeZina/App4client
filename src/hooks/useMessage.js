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

    useEffect(() => {
        const {type0, type1, content} = data;

        if(type0 === 'notification') {
            setNotifications([
                ...notifications,
                {
                    type: type1,
                    content
                }
            ])
        }
    }, [data])

    return {
        notifications,
        inviteUser
    }
}

export default useMessage;