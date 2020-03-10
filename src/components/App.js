import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { UserContext, RoomContext, CounterContext, MessageContext } from '../utils/context';
import Notification from './Notification';
import Nav from './Nav';
import Login from './Login';
import Rooms from './rooms/Rooms';
import Room from './rooms/Room';
import CreateRoom from './rooms/CreateRoom';
import useSocket from '../hooks/useSocket';

const App = () => {
  const {user, room, message, counter} = useSocket();

  return (
    <UserContext.Provider value = {user}>
      <RoomContext.Provider value = {room}>
        <MessageContext.Provider value = {message}>
          <CounterContext.Provider value = {counter}>
            {
              message.notifications.length !== 0 &&
              <Notification />
            }
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
