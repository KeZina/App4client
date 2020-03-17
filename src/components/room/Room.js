import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Message from '../message/Message';
import { RoomContext, CounterContext, MessageContext } from '../../utils/context';

const Room = () => {
    const [showUserList, setShowUserList] = useState(false);

    const room = useContext(RoomContext);
    const message = useContext(MessageContext);
    const counter = useContext(CounterContext);

    const handleUserList = () => setShowUserList(!showUserList);
    const exitRoom = () => room.exitRoom();

    const roomUsers = counter.roomUsers.map(user => {
        return (
            <span key = {user}>
                {user}
            </span>
        )
    })

    const siteUsers = counter.siteUsers.map(siteUser => {
        return (
            <button key = {siteUser} onClick = {() => message.inviteToRoom(siteUser, room.name)}>
                {siteUser}
            </button>
        )
    })

    return (
        <div className = 'container-1'>
            <div id = 'room'>
                <div className = 'sidebar left'>
                    <h3>
                        Users:
                    </h3>
                    <div>
                        {roomUsers}
                    </div>
                </div>
                <div className = 'sidebar right'>
                    <Link to = '/rooms' onClick = {exitRoom}>
                        Exit room
                    </Link>
                    <button onClick = {handleUserList}>
                        Invite user
                    </button>
                </div>
                {
                    showUserList &&
                    <div className = 'user-list'>
                        <h3>
                            Users to invite:
                        </h3>
                        {siteUsers}
                    </div>
                }
                <h2>{room.name}</h2>
                <div className = 'chat'>
                    <div className = 'message-container'>
                        <Message message = {message.roomMessages} />
                    </div>
                    <form onSubmit = {message.sendRoomMessage}>
                        <input type = 'submit' value = 'Send message' />
                        <textarea name = 'message'></textarea>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Room;