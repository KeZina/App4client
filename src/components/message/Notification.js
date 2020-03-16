import React, { useState, useEffect } from 'react';

const Notification = ({message}) => {
    const [note, setNote] = useState({});

    useEffect(() => {
        if(message.notes.length !== 0) setNote(message.notes[0]);
    }, [message.notes])

    if(message.notes.length === 0 ) return null;

    console.log(message);

    const accept = () => message.acceptInvite(note);
    const refuse = () => message.refuseInvite(note);

    return (
        <div id = 'notification'>
            <div className = "notification-container">
                <h3>
                    {note.content}
                </h3>
                <div className = 'buttons-deciders'>
                    <button onClick = {accept}>
                        Accept
                    </button>
                    <button onClick = {refuse}>
                        Refuse
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Notification;