import React, { useContext } from 'react';
import Messages from './Messages';
import { RoomContext } from '../../context';

const Room = () => {
    const room = useContext(RoomContext);
    console.log(room);

    return (
        <div className = 'container-1'>
            <div id = 'room'>
                <div className = 'sidebar left'>
                    <h3>
                        Users:
                    </h3>
                    <div>

                    </div>
                </div>
                <div className = 'sidebar right'>
                    <button>
                        Exit room
                    </button>
                    <button>
                        Invite user
                    </button>
                </div>
                {/* {
                    listVisible &&
                    <div className = 'user-list'>
                        <h3>
                            Users to invite:
                        </h3>
                    </div>
                } */}
                <h2>{room.name}</h2>
                <div className = 'chat'>
                    <div className = 'message-container'>
                        <Messages />
                    </div>
                    <form>
                        <input type = 'submit' value = 'Send message' />
                        <textarea name = 'message'></textarea>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Room;