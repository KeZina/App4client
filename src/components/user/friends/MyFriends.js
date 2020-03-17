import React, { useState, useContext } from 'react';
import Friend from './Friend';
import { CounterContext, MessageContext } from '../../../utils/context';
import WriteMessage from '../../message/WriteMessage';

const MyFriends = () => {
    const [recipient, setRecipient] = useState(null);
    const [showWriteMessage, setShowWriteMessage] = useState(false);

    const counter = useContext(CounterContext);
    const message = useContext(MessageContext);

    const friends = counter.registeredUsers.filter(user => user.relation === 'Friend');
    return (
        <>
            <div className = 'container-1'>
                <div id = 'my-friends-container'>
                    <Friend 
                        friends = {friends}
                        message = {message}
                        setRecipient = {setRecipient}
                        setShowWriteMessage = {setShowWriteMessage} 
                    />
                </div>
            </div>
            <WriteMessage
                recipient = {recipient}
                setRecipient = {setRecipient}
                showWriteMessage = {showWriteMessage}
                setShowWriteMessage = {setShowWriteMessage}
                sendPrivateMessage = {message.sendPrivateMessage}
            />
        </>
    )
}

export default MyFriends;