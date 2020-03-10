import { useState, useEffect } from 'react';

const useMessage = (socket, data, enterRoom) => {
    const [notes, setNotes] = useState([]);

    const inviteUser = (name, sender, room) => {
        socket.emit('message', {
            type: 'inviteUser',
            name,
            sender,
            room
        })
    }

    const accept = (id, roomUrl) => {
        const filteredNotes = notes.filter(note => note.id !== id);
        setNotes(filteredNotes);
        enterRoom(roomUrl);
    }  

    const refuse = id => {
        const filteredNotes = notes.filter(note => note.id !== id);
        setNotes(filteredNotes);
    }

    useEffect(() => {
        const {type, content, roomUrl} = data;

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
        }
    }, [data])

    return {
        notes,
        inviteUser,
        accept,
        refuse,
    }
}

export default useMessage;