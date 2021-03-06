import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const useUser = (socket, data) => {
    const anonymous = {
        name: null,
        theme: 'boring-blue',
        auth: {
            temp: false,
            perm: false
        },
        checkAuth() {
            if(this.auth.temp) {
                return 'temp';
            } else if (this.auth.perm) {
                return 'perm';
            } else return false;
        }
    }
    const [user, setUser] = useState(anonymous);
    const history = useHistory();

    // if user choose permanent acc
    const createPermAcc = e => {
        e.preventDefault();

        socket.emit('user', {
            type: 'createPermAcc',
            name: e.target.name.value,
            password: e.target.password.value
        })
    }

    // if user prefer to create temporary acc
    const createTempAcc = e => {
        e.preventDefault();

        socket.emit('user', {
            type: 'createTempAcc',
            name: e.target.name.value
        })
    }

    // if user have permanent acc
    const login = e => {
        e.preventDefault();

        socket.emit('user', {
            type: 'login',
            name: e.target.name.value,
            password: e.target.password.value
        })
    }

    // if user have temporary acc delete it, else only remove token
    const logout = e => {
        e.preventDefault();

        socket.emit('user', {
            type: 'logout',
            token: localStorage.getItem('token')
        })
        socket.emit('users', {
            type: 'removeUser',
            goal: 'getAllUsers',
            name: user.name
        })
        localStorage.removeItem('token');
        localStorage.removeItem('roomUrl');

        setUser(anonymous);
    }

    const setTheme = theme => {
        socket.emit('user', {
            type: 'setTheme',
            name: user.name,
            theme
        })

        setUser({...user, theme});
    }

    // redirect no-auth user
    useEffect(() => {
        if(!localStorage.getItem('token')) history.push('/');
        else if(localStorage.getItem('token') && history.location.pathname === '/') history.push('/rooms');
    }, [localStorage.getItem('token'), history.location.pathname])

    // check if user have token
    useEffect(() => {
        if(socket && localStorage.getItem('token')) {
            socket.emit('user', {
                type: 'auth',
                token: localStorage.getItem('token')
            })
        }
    }, [socket])
    
    // handle responses
    useEffect(() => {
        const {type, auth, name, theme, token} = data;

        if(type === 'auth') {
            if(token) localStorage.setItem('token', token);

            if(auth.temp || auth.perm) {
                socket.emit('users', {
                    type: 'addUser',
                    goal: 'getSiteUsers',
                    name
                })
            } else if(!(auth.temp || auth.perm)) {
                socket.emit('users', {
                    type: 'removeUser',
                    goal: 'getAllUsers',
                    name: user.name
                })

                setUser(anonymous);
                localStorage.removeItem('token');
                localStorage.removeItem('roomUrl');
            }
            setUser({...user, auth, name, theme: theme || user.theme});
        } else if(type === 'theme') {
            setUser({...user, theme});
        }

    }, [data])

    return {
        ...user,
        createPermAcc,
        createTempAcc,
        login,
        logout,
        setTheme
    }
}

export default useUser;