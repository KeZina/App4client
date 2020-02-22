import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context';

const Nav = () => {
    const user = useContext(UserContext);

    return (
        <nav id = "navigation">
            {
                user.checkAuth() &&
                <>
                    <Link to = '/rooms'>Rooms</Link>
                    <div id = "center-side">
                        <div>
                            <span>
                                Total users in site:
                            </span>
                        </div>
                    </div>
                    <div id = "right-side">
                        <button onClick = {user.logout}>
                            Logout
                        </button>
                        <span>
                            Your name: {user.name}
                        </span>
                    </div>
                </>
            }
        </nav>
    )
}

export default Nav;