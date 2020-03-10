import React, { useContext, useState } from 'react';
import Messages from './Messages';
import { RoomContext, CounterContext, MessageContext, UserContext } from '../../utils/context';

const Room = () => {
    const [showUserList, setShowUserList] = useState(false);
    const handleUserList = () => setShowUserList(!showUserList);

    const user = useContext(UserContext);
    const room = useContext(RoomContext);
    const message = useContext(MessageContext);
    const counter = useContext(CounterContext);

    const roomUsers = counter.roomUsers.map(user => {
        return (
            <span key = {user}>
                {user}
            </span>
        )
    })

    const siteUsers = counter.siteUsers.map(siteUser => {
        return (
            <span key = {siteUser} onClick = {() => message.inviteUser(siteUser, user.name, room.name)}>
                {siteUser}
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