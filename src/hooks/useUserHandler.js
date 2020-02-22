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

    // redirect no-auth user
    useEffect(() => {
        if(!localStorage.getItem('token')) history.push('/');
        else if(localStorage.getItem('token') && history.location.pathname === '/') history.push('/rooms');
    }, [localStorage.getItem('token'), history.location.pathname])

    // handle responses
    useEffect(() => {
        const {type, auth, name, token, message} = data;

        if(type === 'auth') {
            if(token) localStorage.setItem('token', token);

            setUser({...user, auth, name});
        } else if(type === 'error') {
            if(message === 'jwt expired') localStorage.removeItem('token');
        }
    }, [data])

    return {
        createPermAcc,
        createTempAcc,
        login
    }
}

export default useUserHandler;