import React from 'react';

const RoomMessage = ({message}) => {
    if(message.length === 0) {
        return null;
    } else {
        return message.map(message => {
            return (
                <div id = 'room-message' key = {message.sender}>
                    <span>Send by: {message.sender}</span>
                    <span>{message.date}</span>
                    <p>
                        {message.content}
                    </p>
                </div>
            )
        })
    }
}

export default RoomMessage;