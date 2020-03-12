import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { UserContext, RoomContext, CounterContext, MessageContext } from '../utils/context';
import Notification from './message/Notification';
import Nav from './Nav';
import Login from './Login';
import Rooms from './room/Rooms';
import Room from './room/Room';
import CreateRoom from './room/CreateRoom';
import useSocket from '../hooks/useSocket';

const App = () => {
  const {user, room, message, counter} = useSocket();

  return (
    <UserContext.Provider value = {user}>
      <RoomContext.Provider value = {room}>
        <MessageContext.Provider value = {message}>
          <CounterContext.Provider value = {counter}>
            <Notification />
            <Nav />
            <Switch>
              <Route exact path = '/' component = {Login} />
              <Route exact path = '/rooms' component = {Rooms} />
              <Route exact path = '/rooms/create-room' component = {CreateRoom} />
              <Route exact path = {`/rooms/${localStorage.getItem('roomUrl')}`} component = {Room} />
            </Switch>
          </CounterContext.Provider>
        </MessageContext.Provider>
      </RoomContext.Provider>
    </UserContext.Provider>
  )
}

export default App;
