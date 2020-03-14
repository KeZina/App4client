import React, { useContext, useState } from 'react';
import { UserContext } from '../../utils/context';

const Login = () => {
    const initialHandler = {
        temp: false,
        perm: false,
        log: false
    }
    const [handler, setHandler] = useState(initialHandler);

    const user = useContext(UserContext);

    const changeHandler = e => {
        const id = e.target.id;
        if(id === 'perm') setHandler({...initialHandler, perm: true});
        else if(id === 'log') setHandler({...initialHandler, log: true});
        else if(id === 'temp') setHandler({...initialHandler, temp: true});
    }

    const handleForm = e => {
        if(handler.perm) user.createPermAcc(e);
        else if(handler.log) user.login(e);
        else user.createTempAcc(e);
    }

    const handleTitle = () => {
        if(handler.perm) return <h2>Create permanent account</h2>;
        else if(handler.log) return <h2>Log In</h2>;
        else return <h2>Create temporary account</h2>;
    }

    const isPassField = () => {
        if(handler.perm || handler.log) return (
            <label>
                <h3>Password:</h3>
                <input type = "password" name = "password" minLength = "6" maxLength = "15" />
            </label>
        )
    }

    return (
        <div className = 'container-1'>
            <div id = "login">
                <div>
                    {handleTitle()}
                    <h4>
                        Don't want to waste your time?
                        <span id = 'temp' onClick = {changeHandler}> Get temporary registry...</span>
                    </h4>
                    <h4>
                        {/* add e-mail confirm */}
                        Want to hold your name?
                        <span id = 'perm' onClick = {changeHandler}> Get permanent regisrty...</span>
                    </h4>
                    <h4>
                        Already have permanent registry?
                        <span id = 'log' onClick = {changeHandler}> Log In...</span>
                    </h4>
                    <form onSubmit = {handleForm}>
                        <label>
                            <h3>Name:</h3>
                            <input type = "text" name = "name" minLength = "3" maxLength = "15" />
                        </label>
                        {isPassField()}
                        <input type = "submit" value = "&#10004;" />
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login;