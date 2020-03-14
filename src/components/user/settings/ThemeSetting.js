import React from 'react';
import ThemeModel from './ThemeModel';

const ThemeSetting = () => {
    return (
        <>
            <div className = 'model-container'>
                <h2>
                    Love classic? Try light themes
                </h2>
                <div className = 'model'>
                    <ThemeModel themeName = 'shy-red-model' />
                    <ThemeModel themeName = 'boring-blue-model' />
                    <ThemeModel themeName = 'grass-green-model' />
                </div>
            </div>
            <div className = 'model-container'>
                <h2>
                    You think night is better than day? Dark themes your choice
                </h2>
                <div className = 'model'>
                    <ThemeModel themeName = 'sexy-red-model' />
                    <ThemeModel themeName = 'cosmic-blue-model' />
                    <ThemeModel themeName = 'jungle-green-model' />
                </div>
            </div>
            <div>
                <h2>
                    Wow...Prefer something hot? I have a couple for you...
                </h2>
            </div>
        </>
    )
}

export default ThemeSetting;