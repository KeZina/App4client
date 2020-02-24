import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

const useRoomHandler = (socket, data) => {
    const initialRoom = {
        name: null,
        messages: [],
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

    const getRoomList = () => {
        socket.emit('room', {
            type: 'roomList',
        })
    }

    // get room data when user enter of the <Rooms />
    const enterRoom = roomUrl => {
        socket.emit('room', {
            type: 'enterRoom',
            roomUrl
        })
        localStorage.setItem('roomUrl', roomUrl);
        history.push(`/rooms/${roomUrl}`)
    }

    const exitRoom = () => {
        socket.emit('room', {
            type: 'exitRoom',
            roomUrl: localStorage.getItem('roomUrl')
        })
        localStorage.removeItem('roomUrl');
        history.push('/rooms');
    }

    // get room data when user reload page
    useEffect(() => {
        socket && localStorage.getItem('roomUrl') &&
        socket.emit('room', {
            type: 'enterRoom',
            roomUrl: localStorage.getItem('roomUrl')
        })
    }, [socket])

    // handleResponse
    useEffect(() => {
        const {type, name, messages, roomUrl, roomList, message} = data;
        
        if(type === 'createRoom') {
            setRoom({...room, name});
            localStorage.setItem('roomUrl', roomUrl);
            history.push(`/rooms/${roomUrl}`);
        } else if(type === 'roomList') {
            setRoom({...room, roomList});
        } else if(type === 'enterRoom') {
            setRoom({...room, name, messages});
        } else if(type ==='exitRoom') {
            setRoom(initialRoom);
        } else if(type === 'error') {
            console.log(message)
        }
    }, [data])

    return {
        ...room,
        createRoom,
        getRoomList,
        enterRoom,
        exitRoom
    }
}

export default useRoomHandler;