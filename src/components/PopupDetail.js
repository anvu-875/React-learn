import React from 'react';
import { Films } from '../share/FilmList';
import { ThemeContext } from './ThemeContext';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';

export default function PopupDetail ( { handleClick } ) {
    const { theme } = useContext( ThemeContext );
    const filmID = useParams();
    const film = Films.find( obj => {
        return obj.id === parseInt( filmID.id );
    } );
    return (
        <div>
            <div id="modal1" className="modal" style={{ display: 'block', zIndex: '999', position: 'fix', top: '50%', transform: 'translateY(-50%)', background: theme.backgroundNav }}>
                <div className="modal-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem 0' }}>
                    <iframe width="90%" style={{ aspectRatio: '9/5', userSelect: 'none' }} src={film.trailer} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
                <div className="modal-footer" style={{ background: theme.backgroundFP }}>
                    <div key={filmID} onClick={handleClick} style={{ width: 'fit-content', margin: '0 auto' }}>
                        <button className="waves-effect btn" style={{ color: theme.color, background: theme.colorFP, fontWeight: '700' }}>Close</button>
                    </div>
                </div>
            </div>
            <div style={{ zIndex: '998', position: 'absolute', background: 'black', top: '0', bottom: '-7rem', right: '0', left: '0', opacity: '0.7' }} onClick={handleClick}></div>
        </div>
    );
}
