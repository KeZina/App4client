import React from 'react';
import { Link } from 'react-router-dom';

const Notification = () => {
    return (
        <div id = 'notification'>
            <div className = "notification-container">
                <h3>
                    Other users want to see you in the room.
                </h3>
                <div className = 'links'>
                    <Link>
                        Accept
                    </Link>
                    <Link>
                        Refuse
                    </Link>
                </div>

            </div>
        </div>
    )

}

export default Notification;