import React, { useContext } from 'react';
import { UserContext, CounterContext } from '../../utils/context';
import Menu from './Menu';

const Nav = () => {
    const user = useContext(UserContext);
    const counter = useContext(CounterContext);

    return (
        <nav id = 'navigation'>
            {
                user.checkAuth() &&
                <>
                    <div className = 'users-amount'>
                        <div>
                            <span>
                                Total users in site: {counter.siteUsers.length}
                            </span>
                        </div>
                    </div>
                    <div className = 'user-data'>
                        <span className = 'username'>
                            {user.name}
                        </span>
                        <Menu />
                    </div>
                </>
            }
        </nav>
    )
}

export default Nav;