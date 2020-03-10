import { useEffect } from "react";


const useError = (data) => {
    useEffect(() => {
        const {type, message} = data;

        if(type === 'user') {
            if(message === 'jwt expired') {
                localStorage.removeItem('token');
                localStorage.removeItem('romUrl');
            } else {
                console.log(message);
            }
        } else if(type === 'room') {
            if(message) {
                console.log(message);
            }
        }


    }, [data])
}

export default useError;