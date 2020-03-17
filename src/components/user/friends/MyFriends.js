import React, { useContext } from 'react';
import Friend from './Friend';
import { CounterContext, MessageContext } from '../../../utils/context';

const MyFriends = () => {
    const counter = useContext(CounterContext);
    const message = useContext(MessageContext);
    const friends = counter.registeredUsers.filter(user => user.relation === 'Friend');

    return (
        <div className = 'container-1'>
            <div id = 'my-friends-container'>
                <Friend friends = {friends} message = {message} />
            </div>
        </div>

    )
}

export default MyFriends;