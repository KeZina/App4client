import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { RoomContext } from '../../context';

const Rooms = () => {
    const [showRoomList, setShowRoomList] = useState(false);
    const room = useContext(RoomContext);

    const handleRoomList = () => {
        setShowRoomList(!showRoomList);
        room.getRoomList();
    }
    const list = room.roomList.map(item => {
        return (
            <span key = {item._id} onClick = {() => room.enterRoom(item._id)}>
                {item.name}
            </span>
        )

    })

    console.log(room.roomList)

    return (
        <div className = 'container-1'>
            <div id = "rooms">
                <div className = 'buttons-container'>
                    <Link to = '/rooms/create-room'>
                        Create new room
                    </Link>
                    <button onClick = {handleRoomList}>
                        Join existing room
                    </button>
                </div>
                {
                    showRoomList &&
                    <div className = 'room-list'>
                        {list}
                    </div>
                }
            </div>
        </div>
    )
}

export default Rooms;