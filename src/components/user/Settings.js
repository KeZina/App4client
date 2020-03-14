import React, { useState } from 'react';

const Settings = () => {
    const [setting, setSetting] = useState('theme');

    return (
        <div className = 'container-1'>
            <div id = 'settings-container'>
                <div id = 'settings-list'>
                    <span onClick = {() => setSetting('theme')}>
                        Theme
                    </span>
                    <span onClick = {() => setSetting('profile')}>
                        Profile
                    </span>
                </div>
                <div id = 'settings'>

                </div> 
            </div>
        </div>
    )
}

export default Settings;