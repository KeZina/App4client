import React, { useContext, useState } from 'react';
import User from './User';
import { CounterContext, MessageContext } from '../../utils/context';
import WriteMessage from '../message/WriteMessage';

const UsersList = () => {
    const [recipient, setRecipient] = useState(null);
    const [showWriteMessage, setShowWriteMessage] = useState(false);

    const counter = useContext(CounterContext);
    const message = useContext(MessageContext);

    return (
        <>
            <div className = 'container-1'>
                <div className = 'container-2'>
                    <User 
                        counter = {counter} 
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

export default UsersList;