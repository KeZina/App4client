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

    const inviteToFriends = targetUser => {
        socket.emit('message', {
            type: 'inviteToFriends',
            currentUser,
            targetUser
        })
    }

    const addToFriends = (currentUser, targetUser) => {
        socket.emit('message', {
            type: 'inviteToFriends',
            currentUser,
            targetUser,
            result: 'accept'
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
            addToFriends(note.currentUser, note.targetUser);
        }
    }  

    const refuseInvite = note => {
        const filteredNotes = notes.filter(item => item.id !== note.id);
        setNotes(filteredNotes);
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

    useEffect(() => {
        const {type0, type1, content, currentUser, targetUser, roomUrl, messages} = data;

        if(type0 === 'note') {
            setNotes([
                ...notes,
                {
                    type1,
                    content,
                    currentUser,
                    targetUser,
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
        acceptInvite,
        refuseInvite,
        sendRoomMessage
    }
}

export default useMessage;