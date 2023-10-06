import React from 'react';
import { useState, useEffect } from 'react';

const themes = {
    dark: {
        backgroundNav: 'linear-gradient(109.6deg, rgb(72, 200, 160) 11.2%, rgb(32, 40, 48) 91.3%)',
        backgroundNavHover: 'linear-gradient(177.9deg, rgb(58, 62, 88) 3.6%, rgb(119, 127, 148) 105.8%)',
        color: 'white',
        titleCardPFHover: 'rgb(0, 255, 255)',
        backgroundFP: 'radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%)',
        outlineDtFP: '2px solid rgb(72, 200, 160)',
        colorFP: 'rgb(72, 200, 160)',
        colorNavOpt: 'black',
        border: '1px solid white',
        backgroundCardReveal: 'radial-gradient(circle at 10% 20%, rgb(0, 0, 0) 0%, rgb(14, 39, 34) 90%)',
        boxShadowContact: '0 2px 6px rgba(153, 153, 153, 0.75)'
    },
    light: {
        backgroundNav: 'radial-gradient(circle at 10% 20%, rgb(130, 205, 221) 0%, rgb(255, 247, 153) 90%)',
        backgroundNavHover: 'linear-gradient(135deg, rgb(255, 168, 168) 10%, rgb(252, 255, 0) 100%)',
        color: 'black',
        titleCardPFHover: 'rgb(255,0,0)',
        backgroundFP: 'linear-gradient(113.5deg, rgb(234, 234, 234) 22.3%, rgb(201, 234, 211) 56.6%, rgb(255, 180, 189) 90.9%)',
        outlineDtFP: '2px solid rgb(193, 50, 126)',
        colorFP: 'rgb(193, 50, 126)',
        colorNavOpt: 'white',
        border: '1px solid black',
        backgroundCardReveal: 'radial-gradient(circle at 10% 20%, rgb(130, 205, 221) 0%, rgb(255, 247, 153) 90%)',
        boxShadowContact: 'rgb(0, 0, 0) 0px 2px 6px 0.5px'
    }
};
let dardMode = localStorage.getItem( 'dark' );
const initialState = {
    dark: dardMode ? false : dardMode === 'true',
    theme: themes.light,
    toggle: () => { }
};

const ThemeContext = React.createContext( initialState );

function ThemeProvider ( { children } ) {
    const [dark, setDark] = useState( false ); // Default theme is light
    // On mount, read the preferred theme from the persistence
    useEffect( () => {
        const isDark = localStorage.getItem( 'dark' ) === 'true';
        setDark( isDark );
    }, [dark] );
    // To toggle between dark and light modes
    const toggle = () => {
        const isDark = !dark;
        localStorage.setItem( 'dark', JSON.stringify( isDark ) );
        setDark( isDark );
    };
    const theme = dark ? themes.dark : themes.light;
    return (
        <ThemeContext.Provider value={{ theme, dark, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
}
export { ThemeProvider, ThemeContext };
