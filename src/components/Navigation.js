import React, { useEffect } from 'react';
import { Navbar } from 'react-materialize';
import '../css/nav.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { faSun, faMoon, faBars, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactDOM from 'react-dom/client';

export default function Navigation () {
    const { theme, toggle, dark } = useContext( ThemeContext );
    useEffect( () => {
        const sideNav = document.querySelector( '.sidenav' );
        sideNav.style.setProperty( 'padding-top', '6.5rem' );
        sideNav.style.setProperty( 'opacity', '0.85' );
        sideNav.style.setProperty( 'background', theme.colorNavOpt );

        const handleNavEnter = ( event ) => {
            event.target.style.background = theme.backgroundNavHover;
            event.target.style.transition = '0.5s';
        };
        const handleNavLeave = ( event ) => {
            event.target.style.background = 'none';
            event.target.style.transition = '0.5s';
        };

        if ( !document.querySelector( '.closeNav' ) ) {
            const closeSideBar = (
                <FontAwesomeIcon
                    icon={faAngleDoubleLeft}
                    className="sidenav-close"
                    style={{
                        color: theme.color,
                        fontSize: '5rem',
                        padding: '5px',
                        borderLeft: `2.5px groove  ${theme.color}`,
                        borderBottom: `2.5px groove  ${theme.color}`,
                    }}
                />
            );
            const closeBtn = document.createElement( 'div' );
            closeBtn.classList.add( 'closeNav' );
            closeBtn.style.setProperty( 'position', 'absolute' );
            closeBtn.style.setProperty( 'top', '0' );
            closeBtn.style.setProperty( 'right', '0' );
            ReactDOM.createRoot( closeBtn ).render( closeSideBar );
            sideNav.appendChild( closeBtn );
        }

        const closeIcon = document.querySelector( '.closeNav svg' );
        if ( closeIcon ) {
            closeIcon.style.setProperty( 'color', theme.color );
            closeIcon.style.setProperty( 'border-left', `2.5px groove  ${theme.color}` );
            closeIcon.style.setProperty( 'border-bottom', `2.5px groove  ${theme.color}` );
        }

        const svgEl = document.querySelector( '.sidenav-close' );
        if ( svgEl ) {
            svgEl.addEventListener( 'mouseenter', handleNavEnter );
            svgEl.addEventListener( 'mouseleave', handleNavLeave );
        }


        sideNav.childNodes.forEach( ( node ) => {
            if ( node !== sideNav.lastChild ) {
                node.childNodes.forEach( ( childNode ) => {
                    childNode.style.width = 'auto';
                    childNode.style.height = '5rem';
                    childNode.style.display = 'flex';
                    childNode.style.fontSize = '1.6rem';
                    childNode.style.justifyContent = 'center';
                    childNode.style.alignItem = 'center';
                } );
            }
        } );

        const navItem = document.querySelectorAll( '.nav_item' );
        navItem.forEach( node => {
            node.addEventListener( 'mouseenter', handleNavEnter );
            node.addEventListener( 'mouseleave', handleNavLeave );
        } );

        const notiSwitch = document.querySelector( '.noti_switch' );
        const notiSwitchSvg = document.querySelector( '.noti_switch svg' );
        const spanNotiSwitchAfterAdd = document.createElement( 'span' );
        spanNotiSwitchAfterAdd.classList.add( 'text_noti' );
        const root = ReactDOM.createRoot( spanNotiSwitchAfterAdd );

        const deleteNotiSwitchSpan = () => {
            const notiSwitchSpan = document.querySelector( '.text_noti' );
            if ( notiSwitchSpan ) {
                notiSwitchSpan.remove();
            }
        };

        const handleSwitchLightDark = () => {
            deleteNotiSwitchSpan();
            if ( window.matchMedia( '(max-width: 715px)' ).matches ) {
                notiSwitch.parentElement.style = 'width: auto !important';
                notiSwitchSvg.style = 'margin-right: 0';
            } else {
                notiSwitch.parentElement.style = 'width: 120px !important';
                notiSwitchSvg.style = 'margin-right: 4px';
                const modeText = `Mode: ${dark ? 'Dark'.toUpperCase() : 'Light'.toUpperCase()}`;
                root.render( <> {modeText} </> );
                if ( !notiSwitch.contains( spanNotiSwitchAfterAdd ) ) {
                    notiSwitch.appendChild( spanNotiSwitchAfterAdd );
                }
            }
        };

        handleSwitchLightDark();

        window.addEventListener( 'resize', handleSwitchLightDark );

        return () => {
            navItem.forEach( node => {
                node.removeEventListener( 'mouseenter', handleNavEnter );
                node.removeEventListener( 'mouseleave', handleNavLeave );
            } );
            if ( svgEl ) {
                svgEl.removeEventListener( 'mouseenter', handleNavEnter );
                svgEl.removeEventListener( 'mouseleave', handleNavLeave );
            }
            window.removeEventListener( 'resize', handleSwitchLightDark );
        };
    }, [theme, dark] );

    return (
        <div className='navigation'>
            <Navbar
                style={{ background: theme.backgroundNav }}
                className='main_nav'
                alignLinks="left"
                id="mobile-nav"
                fixed
                menuIcon={<FontAwesomeIcon icon={faBars} color={theme.color} style={{ fontSize: '3rem', position: 'absolute', top: '50%', transform: 'translateY(-50%)' }} />}
                options={{
                    draggable: true,
                    edge: 'left',
                    inDuration: 250,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    outDuration: 200,
                    preventScrolling: true
                }}
            >
                <Link className='nav_item' to='/'><span style={{ color: theme.color }}>Home</span></Link>
                <Link className='nav_item' to='/new'><span style={{ color: theme.color }}>New</span></Link>
                <Link className='nav_item' to='/about'><span style={{ color: theme.color }}>About</span></Link>
                <Link className='nav_item' to='/contact'><span style={{ color: theme.color }}>Contact</span></Link>
            </Navbar>
            <div className='mode'>
                <input type='checkbox' className='switch_mode' id='switch' onClick={toggle} data-testid="toggle-theme-btn" />
                <label className="noti_switch" htmlFor="switch" style={{ color: theme.color, border: `3px solid ${theme.colorFP}` }}>
                    {dark ? <FontAwesomeIcon color='#B8AEA3' icon={faMoon}></FontAwesomeIcon> : <FontAwesomeIcon color='#FDB813' icon={faSun}></FontAwesomeIcon>}
                </label>
            </div>
        </div>
    );
}
