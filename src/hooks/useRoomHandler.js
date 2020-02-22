import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

const useRoomHandler = (socket, data) => {
    const initialRoom = {
        name: null,
        messages: null,
        roomList: []
    }
    const [room, setRoom] = useState(initialRoom);
    const history = useHistory()

    // just creating new room
    const createRoom = e => {
        e.preventDefault();

        socket.emit('room', {
            type: 'createRoom',
            name: e.target.name.value
        })
    }

    // get list of rooms
    const getRoomList = () => {
        socket.emit('room', {
            type: 'roomList',
        })
    }

    // get room data
    useEffect(() => {
        socket &&
        socket.emit('room', {
            type: 'roomData',
            roomUrl: localStorage.getItem('roomUrl')
        })
    }, [localStorage.getItem('roomUrl')])

    // handleResponse
    useEffect(() => {
        const {type, name, messages, roomUrl, roomList, message} = data;
        
        if(type === 'createRoom') {
            localStorage.setItem('roomUrl', roomUrl);
            setRoom({...room, name});
            history.push(`/rooms/${roomUrl}`);
        } else if(type === 'roomList') {
            setRoom({...room, roomList});
        } else if(type === 'roomData') {
            setRoom({...room, name, messages});
        } else if(type === 'error') {
            console.log(message)
        }
    }, [data])

    return {
        ...room,
        createRoom,
        getRoomList
    }
}

export default useRoomHandler;