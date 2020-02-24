import React, { useContext } from 'react';
import { RoomContext } from '../../context';

const Messages = () => {
    const room = useContext(RoomContext);

    if(room.messages.length === 0) return null;

    return (
        <div className = 'message' key = {Math.round(Math.random() * 1e5)}>
            <span>Send by:</span>
            <span></span>
            <p>
                
            </p>
        </div>
    )
}

export default Messages;