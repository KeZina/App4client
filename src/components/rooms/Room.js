import React, { useContext, useState } from 'react';
import Messages from './Messages';
import { RoomContext } from '../../context';

const Room = () => {
    const [showUserList, setShowUserList] = useState(false);
    const handleUserList = () => setShowUserList(!showUserList);

    const room = useContext(RoomContext);

    return (
        <div className = 'container-1'>
            <div id = 'room'>
                <div className = 'sidebar left'>
                    <h3>
                        Users:
                    </h3>
                    <div>

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