import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


const useUserHandler = (socket, data) => {
    const anonymous = {
        name: null,
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
            name: e.target.name,
            password: e.target.password
        })
    }

    // if user have temporary acc delete it, else only remove token
    const logout = e => {
        e.preventDefault();

        socket.emit('user', {
            type: 'logout',
            token: localStorage.getItem('token')
        })
        localStorage.removeItem('token');
    }

    // redirect no-auth user
    useEffect(() => {
        if(!localStorage.getItem('token')) history.push('/');
        else if(localStorage.getItem('token') && history.location.pathname === '/') history.push('/rooms');
    }, [localStorage.getItem('token'), history.location.pathname])

    // check if user auth
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
        const {type, auth, name, token, message} = data;

        if(type === 'auth') {
            if(token) localStorage.setItem('token', token);
            setUser({...user, auth, name});
        } else if(type === 'error') {
            if(message === 'jwt expired') {
                localStorage.removeItem('token');
                localStorage.removeItem('romUrl');
                setUser(anonymous);
            }
        }
    }, [data])

    return {
        ...user,
        createPermAcc,
        createTempAcc,
        login,
        logout
    }
}

export default useUserHandler;