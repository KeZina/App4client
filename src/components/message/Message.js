import React from 'react';

const Message = ({message}) => {
    if(message.length === 0) {
        return null;
    } else {
        return message.map(message => {
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

export default Message;