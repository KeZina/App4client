import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { RoomContext } from '../../utils/context';

const Rooms = () => {
    const [showRoomList, setShowRoomList] = useState(false);
    const room = useContext(RoomContext);

    const list = room.roomList.map((item, index, arr) => {
        return (
            <span key = {item._id} onClick = {() => room.enterRoom(item._id)}>
                {item.name}
            </span>
        )
    })

    const isListEmpty = () => {
        if(list.length === 0) {
            return (
                <span id = 'empty-list'>
                    There is no room 
                </span>
            )
        } else return (list)
    }

    const isListVisible = () => {
        setShowRoomList(!showRoomList);
        room.getRoomList();
    }

    return (
        <div className = 'container-1'>
            <div id = "rooms">
                <div className = 'buttons-container'>
                    <Link to = '/rooms/create-room'>
                        Create new room
                    </Link>
                    <button onClick = {isListVisible}>
                        Join existing room
                    </button>
                </div>
                {
                    showRoomList &&
                    <div className = 'room-list'>
                        {isListEmpty()}
                    </div>
                }
            </div>
        </div>
    )
}

export default Rooms;