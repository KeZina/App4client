import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

const useRoom = (socket, data, user) => {
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

    // get room data when user enter in the <Rooms />
    const enterRoom = roomUrl => {
        socket.emit('room', {
            type: 'enterRoom',
            roomUrl
        })
        localStorage.setItem('roomUrl', roomUrl);
        history.push(`/rooms/${roomUrl}`)
    }

    const exitRoom = () => {
        socket.emit('users', {
            type: 'updateUser',
            reason: 'exit',
            goal: 'getRoomUsers',
            name: user,
            roomUrl: localStorage.getItem('roomUrl')
        })

        localStorage.removeItem('roomUrl');
        setRoom(initialRoom);
        history.push('/rooms');
    }

    // get room data when user reload page
    useEffect(() => {
        if(socket && localStorage.getItem('roomUrl')) {
            socket.emit('room', {
                type: 'enterRoom',
                roomUrl: localStorage.getItem('roomUrl')
            })
            history.push(`/rooms/${localStorage.getItem('roomUrl')}`);
        }
    }, [socket])

    // handleResponse
    useEffect(() => {
        const {type, name, messages, roomUrl, roomList} = data;
        
        if(type === 'createRoom') {
            setRoom({...room, name});
            localStorage.setItem('roomUrl', roomUrl);
            socket.emit('users', {
                type: 'updateUser',
                reason: 'enter',
                goal: 'getRoomUsers',
                name: user,
                roomUrl: localStorage.getItem('roomUrl')
            })
            history.push(`/rooms/${roomUrl}`);
        } else if(type === 'roomList') {
            setRoom({...room, roomList});
        } else if(type === 'enterRoom') {
            socket.emit('users', {
                type: 'updateUser',
                reason: 'enter',
                goal: 'getRoomUsers',
                name: user,
                roomUrl: localStorage.getItem('roomUrl')
            })
            setRoom({...room, name, messages});
        }
    }, [data])

    // return useMemo(() => {
    //     return {
    //         ...room,
    //         createRoom,
    //         getRoomList,
    //         enterRoom,
    //         exitRoom
    //     }
    // },  [room, createRoom, getRoomList, enterRoom, exitRoom])



    return {
        ...room,
        createRoom,
        getRoomList,
        enterRoom,
        exitRoom
    }
}

export default useRoom;