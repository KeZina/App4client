import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const useMessage = (socket, data, enterRoom, currentUser) => {
    const [privateMessages, setPrivateMessages] = useState([]);
    const [privateMessagesSenders, setPrivateMessagesSenders] = useState([]);
    const [privateMessagesTarget, setPrivateMessagesTarget] = useState('');

    const [roomMessages, setRoomMessages] = useState([]);
    const [notes, setNotes] = useState([]);

    const history = useHistory();

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

    const sendPrivateMessage = e => {
        e.preventDefault();

        socket.emit('message', {
            type: 'createPrivateMessage',
            currentUser,
            targetUser: e.target.recipient.value,
            title: e.target.title.value,
            content: e.target.content.value
        })
    }

    const getPrivateMessages = targetUser => {
        setPrivateMessagesTarget(targetUser);

        socket.emit('message', {
            type: 'getPrivateMessages',
            currentUser,
            targetUser
        })
    }

    useEffect(() => {
        if(socket && currentUser && history.location.pathname === '/profile/my-messages') {
            socket.emit('message', {
                type: 'getPrivateMessagesSenders',
                currentUser
            })
        }
    }, [socket, currentUser, history.location.pathname])

    useEffect(() => {
        const {type0, type1, content, current, target, roomUrl, messages, senders} = data;

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
        } else if(type0 === 'roomMessages') {
            setRoomMessages(messages);
        } else if(type0 === 'privateMessagesSenders') {
            setPrivateMessagesSenders(senders)
        } else if(type0 === 'privateMessages') { 
            setPrivateMessages(messages);
        } else if(type0 === 'updatePrivateMessages') {
            if(target === privateMessagesTarget) {
                getPrivateMessages(target);
            }
        }
    }, [data])

    return {
        notes,
        roomMessages,
        privateMessages,
        privateMessagesSenders,
        inviteToRoom,
        inviteToFriends,
        handleFriends,
        acceptInvite,
        refuseInvite,
        sendRoomMessage,
        sendPrivateMessage,
        getPrivateMessages
    }
}

export default useMessage;