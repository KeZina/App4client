import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


const useUserHandler = (data) => {
    const anonymous = {
        name: null,
        auth: {
            temp: false,
            perm: false
        },
        checkAuth() {
            return this.auth.temp || this.auth.perm;
        }
    }
    const [user, setUser] = useState(anonymous);

    const history = useHistory();

    // redirect no-auth user
    useEffect(() => {
        if(!localStorage.getItem('token')) {
            history.push('/');
        }
    }, [localStorage.getItem('token'), history.location.pathname])

    // handle responses
    useEffect(() => {
        const {type, auth, name, token, message} = data;

        if(type === 'auth') {
            console.log(data)
        }
    }, [data])
}

export default useUserHandler;