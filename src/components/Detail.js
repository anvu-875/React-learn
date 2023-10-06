import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';
import { Card, Row, Col, CardTitle } from 'react-materialize';
import { useParams } from 'react-router-dom';
import { Films } from '../share/FilmList';
import PopupDetail from './PopupDetail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import '../css/detail.css';

library.add( faYoutube );

export default function Detail ( { setImg = 0 } ) {
    const [popup, setPopup] = useState( false );
    const handleClick = () => {
        setPopup( !popup );
    };
    const { theme } = useContext( ThemeContext );
    const filmID = useParams();
    const film = Films.find( obj => {
        return obj.id === parseInt( filmID.id );
    } );
    useEffect( () => {
        const trailerBtn = document.querySelector( '.card-review .trailer-button' );
        trailerBtn.style = `--button-hover: ${theme.colorFP}; color: ${theme.color}`;

        const filmCol = document.querySelectorAll( '.film-detail_col' );
        const listFilmColClassListM = ['m6', 'm9', 'm12'];

        const handleReziseCard = () => {
            if ( window.matchMedia( '(max-width: 715px)' ).matches ) {
                filmCol.forEach( element => {
                    listFilmColClassListM.forEach( className => {
                        if ( element.classList.contains( className ) ) {
                            element.classList.remove( className );
                        }
                    } );
                    element.classList.add( 'm12' );
                } );
            } else if ( window.matchMedia( '(max-width: 1075px)' ).matches ) {
                filmCol.forEach( element => {
                    listFilmColClassListM.forEach( className => {
                        if ( element.classList.contains( className ) ) {
                            element.classList.remove( className );
                        }
                    } );
                    element.classList.add( 'm9' );
                } );
            } else {
                filmCol.forEach( element => {
                    listFilmColClassListM.forEach( className => {
                        if ( element.classList.contains( className ) ) {
                            element.classList.remove( className );
                        }
                    } );
                    element.classList.add( 'm6' );
                } );
            }
        };

        handleReziseCard();

        window.addEventListener( 'resize', handleReziseCard );
        return () => {
            window.removeEventListener( 'resize', handleReziseCard );
        };
    }, [theme] );
    return (
        <div className='detail-container' style={{ background: theme.backgroundFP }}>
            <Row className='row-review'>
                <Col
                    key={film.id}
                    className='film-detail_col'
                    m={6}
                    s={12}
                >
                    <Card
                        className='card-review'
                        actions={[
                            <div key={filmID} onClick={handleClick} style={{ width: 'fit-content', margin: '0 auto' }}>
                                <button className="waves-effect btn trailer-button">
                                    Trailer <FontAwesomeIcon icon={faYoutube} style={{ color: '#FF0000', fontSize: '3rem', marginLeft: '5px' }} />
                                    <div className="button__horizontal"></div>
                                    <div className="button__vertical"></div>
                                </button>
                            </div>
                        ]}
                        header={<CardTitle image={setImg === 0 ? `../${film.image}` : `../../${film.image}`} />}
                        horizontal
                    >
                        <h3 className="card-title" style={{ color: theme.color }}>{film.title}</h3>
                        <time className='card-time' style={{ color: theme.colorFP }}><span style={{ color: theme.color }}>Public year: </span>{film.year}</time>
                        <div className='card-nation'>
                            <p style={{ color: theme.colorFP }}><span style={{ color: theme.color }}>Nation: </span>{film.nation}</p>
                        </div>
                        <div className='card-describe'>
                            <p style={{ color: theme.colorFP }}><span style={{ color: theme.color }}>Description: </span>{film.description}</p>
                        </div>
                    </Card>
                </Col>
            </Row>
            {popup && <PopupDetail handleClick={handleClick} />}
        </div>
    );

}
