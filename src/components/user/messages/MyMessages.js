import React, { useContext } from 'react';
import PrivateMessage from '../../message/PrivateMessage';
import { MessageContext } from '../../../utils/context';

const MyMessages = () => {
    const message = useContext(MessageContext);
    
    const sendersList = message.privateMessagesSenders.map(sender => {
        return (
            <span 
                key = {sender}
                onClick = {() => message.getPrivateMessages(sender)}
            >
                {sender}
            </span>
        )
    })

    return (
        <div className = 'container-1'>
            <div id = 'my-messages-container'>
                <div className = 'friends-list'>
                    {sendersList}
                </div>
                <div className = 'messages-list'>
                    <PrivateMessage message = {message.privateMessages} />
                </div>
            </div>
        </div>
    )
}

export default MyMessages;