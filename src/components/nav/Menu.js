import React, { useState, useRef, useContext } from "react";
import { Link } from 'react-router-dom';
import { UserContext } from "../../utils/context";

const Menu = () => {
    const [showMenu, setShowMenu] = useState(false);
    const menu = useRef();
    const user = useContext(UserContext);

    const handleMenu = () => {
        if(showMenu === false) {
            menu.current.classList.add('visible');
        } else if(showMenu === true) {
            menu.current.classList.remove('visible');
        }
        setShowMenu(!showMenu);
    }

    return (
        <>
            <span id = 'menu-indicator' onClick = {handleMenu}>
                &#9776;
            </span>
            <div ref = {menu} className = 'menu'>
                <div className = 'general-list'>
                    <Link to = '/users-list'>
                        Users
                    </Link>
                    <Link to = '/rooms'>
                        Rooms
                    </Link> 
                </div>
                <div className = 'user-data-list'>
                    <Link to = '/profile/messages'>
                        My messages
                    </Link>
                    <Link to = '/profile/friends'>
                        My friends
                    </Link>
                    <Link to = '/profile/favorite-rooms'>
                        My favorite rooms
                    </Link>
                </div>
                <div className = 'private-list'>
                    <Link to = '/settings'>
                        Settings
                    </Link>
                    <button onClick = {user.logout}>
                        Logout
                    </button> 
                </div>

            </div>
        </>
    )
}

export default Menu;