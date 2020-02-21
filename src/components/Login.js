import React, { useContext, useEffect, useState } from 'react';

const Login = () => {
    return (
        <div className = 'container-1'>
            <div id = "login">
                <div>
                    {/*                     
                    {formType.permanent && <h2>Create permanent account</h2>}
                    {formType.login && <h2>Login</h2>}
                    {(!formType.permanent && !formType.login) && <h2>Create temporary account</h2>}
                     */}
                    <h4>
                        Don't want to waste your time?
                        <span> Get temporary registry...</span>
                    </h4>
                    <h4>
                        {/* add e-mail confirm */}
                        Want to hold your name?
                        <span> Get permanent regisrty...</span>
                    </h4>
                    <h4>
                        Already have permanent registry?
                        <span> Log In...</span>
                    </h4>
                    <form>
                        <label>
                            <h3>Name:</h3>
                            <input type = "text" name = "name" minLength = "3" maxLength = "15" />
                        </label>
                        {/* {
                            (formType.permanent || formType.login) &&
                            <label>
                                <h3>Password:</h3>
                                <input type = "password" name = "password" minLength = "6" maxLength = "15" />
                            </label>
                        } */}
                        <input type = "submit" value = "&#10004;" />
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login;