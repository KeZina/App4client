import React from 'react';
import { Link } from 'react-router-dom';

const Rooms = () => {
    return (
        <div className = 'container-1'>
            <div id = "rooms">
                <div className = 'buttons-container'>
                    <Link to = '/rooms/create-room'>
                        Create new room
                    </Link>
                    <button>
                        Join existing room
                    </button>
                </div>
                <div className = 'room-list'>

                </div>
            </div>
        </div>
    )
}

export default Rooms;