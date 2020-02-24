import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext, CounterContext } from '../context';

const Nav = () => {
    const user = useContext(UserContext);
    const counter = useContext(CounterContext);

    return (
        <nav id = "navigation">
            {
                user.checkAuth() &&
                <>
                    <Link to = '/rooms'>Rooms</Link>
                    <div id = "center-side">
                        <div>
                            <span>
                                Total users in site: {counter.siteUsers.length}
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