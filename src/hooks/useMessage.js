import { useState, useEffect } from 'react';

const useMessage = (socket, data, enterRoom) => {
    const [roomMessages, setRoomMessages] = useState([]);
    const [notes, setNotes] = useState([]);

    const inviteUser = (name, sender, room) => {
        socket.emit('message', {
            type: 'inviteUser',
            name,
            sender,
            room
        })
    }

    const acceptInvite = (id, roomUrl) => {
        const filteredNotes = notes.filter(note => note.id !== id);
        setNotes(filteredNotes);
        enterRoom(roomUrl);
    }  

    const refuseInvite = id => {
        const filteredNotes = notes.filter(note => note.id !== id);
        setNotes(filteredNotes);
    }

    const sendMessage = (e, sender) => {
        e.preventDefault();

        socket.emit('message', {
            type: 'createMessage',
            content: e.target.message.value,
            sender,
            roomUrl: localStorage.getItem('roomUrl')
        })
    }

    useEffect(() => {
        const {type, content, roomUrl, messages} = data;

        if(type === 'note') {
            setNotes([
                ...notes,
                {
                    type,
                    content,
                    roomUrl,
                    id: Math.floor(Math.random() * 1e10)
                }
            ])
        } else if (type === 'roomMessages') {
            console.log(data)
            setRoomMessages(messages);
        }
    }, [data])

    return {
        notes,
        roomMessages,
        inviteUser,
        acceptInvite,
        refuseInvite,
        sendMessage
    }
}

export default useMessage;