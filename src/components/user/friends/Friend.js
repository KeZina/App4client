import React from 'react';

const Friend = ({friends, message}) => {
    console.log(message)

    if(friends.length === 0) {
        return null;
    } else {
        return friends.map(friend => {
            return (
                <div className = 'user-in-friends' key = {friend}>
                    <div>
                        <span>
                            <b>{friend.name}</b>
                        </span>
                        <span>
                            {friend.status}
                        </span>
                    </div>
                    <div>
                        <button>
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