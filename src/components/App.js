import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { UserContext, RoomContext, CounterContext, MessageContext } from '../utils/context';
import Notification from './message/Notification';
import Nav from './nav/Nav';
import Login from './user/Login';
import Rooms from './room/Rooms';
import Room from './room/Room';
import CreateRoom from './room/CreateRoom';
import useSocket from '../hooks/useSocket';
import UsersList from './users/UsersList';
import MySettings from './user/settings/MySettings';
import MyMessages from './user/messages/MyMessages';
import MyFriends from './user/friends/MyFriends';
import MyFavoriteRooms from './user/rooms/MyFavoriteRooms';

const App = () => {
  const {user, room, message, counter} = useSocket();

  return (
    <div className = {user.theme}>
      <UserContext.Provider value = {user}>
        <RoomContext.Provider value = {room}>
          <MessageContext.Provider value = {message}>
            <CounterContext.Provider value = {counter}>
              <Notification message = {message} />
              <Nav />
              <Switch>
                <Route exact path = '/' component = {Login} />
                <Route exact path = '/rooms' component = {Rooms} />
                <Route exact path = '/rooms/create-room' component = {CreateRoom} />
                <Route exact path = {`/rooms/${localStorage.getItem('roomUrl')}`} component = {Room} />
                <Route exact path = '/users' component = {UsersList} />
                <Route exact path = '/profile/my-settings' component = {MySettings} />
                <Route exact path = '/profile/my-messages' component = {MyMessages} />
                <Route exact path = '/profile/my-friends' component = {MyFriends} />
                <Route exact path = '/profile/my-favorite-rooms' component = {MyFavoriteRooms} />
              </Switch>
            </CounterContext.Provider>
          </MessageContext.Provider>
        </RoomContext.Provider>
      </UserContext.Provider>
    </div>
  )
}

export default App;
