import React from 'react';

const Messages = () => {
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