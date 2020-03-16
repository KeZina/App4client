import React, { useContext } from 'react';
import User from './User';
import { CounterContext, MessageContext } from '../../../utils/context';

const Users = () => {
    const counter = useContext(CounterContext);
    const message = useContext(MessageContext);

    return (
        <div className = 'container-1'>
            <div className = 'container-2'>
                <User counter = {counter} message = {message} />
            </div>
        </div>
    )
}

export default Users;