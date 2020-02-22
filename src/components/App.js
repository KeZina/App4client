import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { UserContext, RoomContext } from '../context';
import Notification from './Notification';
import Nav from './Nav';
import Login from './Login';
import Rooms from './rooms/Rooms';
import Room from './rooms/Room';
import CreateRoom from './rooms/CreateRoom';
import useWebSocket from '../hooks/useWebSocket';

const App = () => {
  const {user, room} = useWebSocket();

  return (
    <UserContext.Provider value = {user}>
      <RoomContext.Provider value = {room}>
        {/* {
          room.notification.exists &&
          <Notification />
        } */}
        <Nav />
        <Switch>
          <Route exact path = '/' component = {Login} />
          <Route exact path = '/rooms' component = {Rooms} />
          <Route exact path = '/rooms/create-room' component = {CreateRoom} />
          <Route exact path = {`/rooms/${localStorage.getItem('roomUrl')}`} component = {Room} />
        </Switch>
      </RoomContext.Provider>
 
    </UserContext.Provider>
  )
}

export default App;
