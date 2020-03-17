import React, { useState } from 'react';
import ThemeSetting from './ThemeSetting';
import ProfileSetting from './ProfileSetting';

const MySettings = () => {
    const [setting, setSetting] = useState('theme');

    const visibleSetting = () => {
        if(setting === 'theme') {
            return <ThemeSetting />
        } else if(setting === 'profile') {
            return <ProfileSetting />
        }
    }

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
                    {visibleSetting()}
                </div> 
            </div>
        </div>
    )
}

export default MySettings;