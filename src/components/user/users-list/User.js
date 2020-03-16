import React from 'react';

const User = ({counter, message}) => {
    const data = counter.registeredUsers.map(user => {    
        return (
            <div id = 'user' key = {user.name}>
                <span>
                    {user.name}
                </span>
                <div>
                    <span>
                        Date of registry: {user.dateOfRegistry}
                    </span>
                    <span>
                        Account type:
                    </span>
                </div>
                <div>
                    <button onClick = {() => message.inviteToFriends(user.name)}>
                        Add to friends
                    </button>
                    <button>
                        Send a message
                    </button>
                </div>
            </div>
        )
    })

    if(data.lenght === 0) return null;
    else return data;
}

export default User;