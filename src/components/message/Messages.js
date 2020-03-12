import React, { useContext } from 'react';
import { MessageContext } from '../../utils/context';

const Messages = () => {
    const message = useContext(MessageContext);

    if(message.roomMessages.length === 0) {
        return null;
    } else {
        return message.roomMessages.map(message => {
            return (
                <div className = 'message' key = {Math.round(Math.random() * 1e5)}>
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

export default Messages;