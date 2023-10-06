import React from 'react';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import '../css/footer.css';

export default function Footer () {
    const { theme } = useContext( ThemeContext );
    return (
        <div id='footer' style={{ background: theme.backgroundNav }}><span style={{ color: theme.color }}>Copyright &copy; 2022</span></div>
    );
};

