import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <>
            <nav id = "navigation">
                <Link to = '/rooms'>Rooms</Link>
                <>
                    <div id = "center-side">
                        <div>
                            <span>
                                Total users in site:
                            </span>
                        </div>
                    </div>
                    <div id = "right-side">
                        <div>
                            <button>
                                Logout
                            </button>
                        </div>
                        <span>
                            Your name: 
                        </span>
                    </div>
                </>
            </nav>
        </>

    )
}

export default Nav;