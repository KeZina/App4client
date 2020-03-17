import React from 'react';

const WriteMessage = ({recipient, setRecipient, showWriteMessage, setShowWriteMessage, sendPrivateMessage}) => {
    const send = e => {
        sendPrivateMessage(e);
        setShowWriteMessage(false);
    }

    if(!showWriteMessage) {
        return null;
    }
    return(
        <div id = 'write-message'>
            <div className = 'write-message-container'>
                <button onClick = {() => setShowWriteMessage(false)}>&#10006;</button>
                <form onSubmit = {send}>
                    <label><h2>Recipient</h2><input type = 'text' name = 'recipient' value = {recipient} onChange = {e => setRecipient(e.target.value)} /></label>
                    <label><h2>Title</h2><input type = 'text' name = 'title' /></label>
                    <label><h2>Message</h2><textarea name = 'content' /></label>
                    <input type = 'submit' value = 'Send!'/>
                </form>
            </div>
        </div>
    )
}

export default WriteMessage;