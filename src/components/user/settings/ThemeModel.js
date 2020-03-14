import React, { useContext } from 'react';
import { UserContext } from '../../../utils/context';

const ThemeModel = ({themeName}) => {
    const user = useContext(UserContext);

    return(
        <div className = {themeName} onClick = {() => user.setTheme(themeName.replace('-model', ''))}>
            <span>{themeName.replace(/-/g, ' ').replace(' model', '')}</span>
            <div className = 'theme-model'>
                <nav className = 'navigation-model' />
                <div className = 'container-model-1'>
                    <div className = 'container-model-2' />
                </div>
            </div>
        </div>
    )
}

export default ThemeModel;