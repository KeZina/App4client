import { useState, useEffect } from 'react';

const useMessage = (socket, data, enterRoom, currentUser) => {
    const [roomMessages, setRoomMessages] = useState([]);
    const [notes, setNotes] = useState([]);

    const inviteToRoom = (targetUser, room) => {
        socket.emit('message', {
            type: 'inviteToRoom',
            currentUser,
            targetUser,
            room
        })
    }

    const sendRoomMessage = e => {
        e.preventDefault();

        socket.emit('message', {
            type: 'createRoomMessage',
            content: e.target.message.value,
            currentUser,
            roomUrl: localStorage.getItem('roomUrl')
        })
    }

    const inviteToFriends = target => {
        socket.emit('message', {
            type: 'inviteToFriends',
            current: currentUser,
            target
        })
    }

    const handleFriends = (action, target, current = currentUser) => {
        socket.emit('message', {
            type: 'handleFriends',
            action,
            current,
            target
        })
    }


    const acceptInvite = note => {
        if(note.type1 === 'inviteToRoom') {
            const filteredNotes = notes.filter(item => item.id !== note.id);
            setNotes(filteredNotes);
            enterRoom(note.roomUrl);
        } else if(note.type1 === 'inviteToFriends') {
            const filteredNotes = notes.filter(item => item.id !== note.id);
            setNotes(filteredNotes);
            handleFriends('add', note.target, note.current);
        }
    }  

    const refuseInvite = note => {
        const filteredNotes = notes.filter(item => item.id !== note.id);
        setNotes(filteredNotes);
    }

    useEffect(() => {
        const {type0, type1, content, current, target, roomUrl, messages} = data;

        if(type0 === 'note') {
            setNotes([
                ...notes,
                {
                    type1,
                    content,
                    current,
                    target,
                    roomUrl,
                    id: Math.floor(Math.random() * 1e10)
                }
            ])
        } else if (type0 === 'roomMessages') {
            setRoomMessages(messages);
        }
    }, [data])

    return {
        notes,
        roomMessages,
        inviteToRoom,
        inviteToFriends,
        handleFriends,
        acceptInvite,
        refuseInvite,
        sendRoomMessage
    }
}

export default useMessage;