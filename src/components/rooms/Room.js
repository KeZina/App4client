import React, { useContext, useState } from 'react';
import Messages from './Messages';
import { RoomContext, CounterContext, MessageContext } from '../../context';

const Room = () => {
    const [showUserList, setShowUserList] = useState(false);
    const handleSiteUsers = () => setShowUserList(!showUserList);
    const handleInvite = user => message.inviteUser(user);

    const room = useContext(RoomContext);
    const message = useContext(MessageContext);
    const counter = useContext(CounterContext);

    console.log(counter.roomUsers)

    const roomUsers = counter.roomUsers.map(user => {
        return (
            <span key = {user}>
                {user}
            </span>
        )
    })

    const siteUsers = counter.siteUsers.map(user => {
        return (
            <span key = {user} onClick = {() => handleInvite(user)}>
                {user}
            </span>
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
                    <button onClick = {room.exitRoom}>
                        Exit room
                    </button>
                    <button onClick = {handleSiteUsers}>
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
                        <Messages />
                    </div>
                    <form>
                        <input type = 'submit' value = 'Send message' />
                        <textarea name = 'message'></textarea>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Room;