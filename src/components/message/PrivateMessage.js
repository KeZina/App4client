import React from 'react';

const PrivateMessage = ({message}) => {
    if(message.length === 0) {
        return null;
    } else {
        return message.map(message => {
            return (
                <div id = 'private-message' key = {message.date}>
                    <h3>{message.title}</h3>
                    <span>{message.date}</span>
                    <p>
                        {message.content}
                    </p>
                </div>
            )
        })
    }
}

export default PrivateMessage;