import React from 'react';
import Message from '../../message/Message';

const MyMessages = () => {

    return (
        <div className = 'container-1'>
            <div id = 'my-messages-container'>
                <Message message = {[]} />
            </div>
        </div>
    )
}

export default MyMessages;