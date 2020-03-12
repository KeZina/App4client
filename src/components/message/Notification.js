import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { MessageContext } from '../../utils/context';

const Notification = () => {
    const [note, setNote] = useState({});
    const message = useContext(MessageContext);

    useEffect(() => {
        if(message.notes.length !== 0) setNote(message.notes[0]);
    }, [message.notes])

    if(message.notes.length === 0 ) return null;

    const accept = () => message.acceptInvite(note.id, note.roomUrl);
    const refuse = () => message.refuseInvite(note.id);

    return (
        <div id = 'notification'>
            <div className = "notification-container">
                <h3>
                    {note.content}
                </h3>
                <div className = 'links'>
                    <Link onClick = {accept}>
                        Accept
                    </Link>
                    <Link onClick = {refuse}>
                        Refuse
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Notification;