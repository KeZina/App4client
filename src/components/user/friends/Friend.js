import React from 'react';

const Friend = ({friends, message, setRecipient, setShowWriteMessage}) => {
    const handleWriteMessage = name => {
        setRecipient(name);
        setShowWriteMessage(true);
    }

    if(friends.length === 0) {
        return null;
    } else {
        return friends.map(friend => {
            return (
                <div className = 'user-in-friends' key = {friend.name}>
                    <div>
                        <span>
                            <b>{friend.name}</b>
                        </span>
                        <span>
                            {friend.status}
                        </span>
                    </div>
                    <div>
                        <button onClick = {() => handleWriteMessage(friend.name)}>
                            Send a message
                        </button>
                        <button onClick = {() => message.handleFriends('remove', friend.name)}>
                            Remove friend
                        </button>
                    </div>
                </div>
            )
        })
    }

}

export default Friend;