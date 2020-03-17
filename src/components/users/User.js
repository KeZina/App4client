import React from 'react';

const User = ({counter, message}) => {
    const data = counter.registeredUsers.map(user => {    
        return (
            <div className = 'user-in-list' key = {user.name}>
                <div>
                    <span>
                        <b>{user.name}</b>
                    </span>
                    <span>
                        {user.relation}
                    </span>
                </div>

                <div>
                    <span>
                        Date of registry: {user.dateOfRegistry}
                    </span>
                    <span>
                        {user.status}
                    </span>
                    <span>
                        Account type: {user.accountType}
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