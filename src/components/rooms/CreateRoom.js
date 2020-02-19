import React from 'react';

const CreateRoom = () => {
    return(
        <div className = 'container-1'>
            <div id = 'create-room'>
                <form>
                    <label>
                        <span>Name:</span>
                        <input name = 'name' type = 'text' minLength = "3" maxLength = "20" />
                    </label>
                    <input type = 'submit' value = "create" />
                </form>
            </div>
        </div>
    )
}

export default CreateRoom;