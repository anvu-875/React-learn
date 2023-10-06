import React, { useEffect } from 'react';
import '../css/film.css';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-materialize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';

export default function FilmPresentation ( { films } ) {
    const { theme } = useContext( ThemeContext );
    useEffect( () => {
        const buttonDetail = document.querySelectorAll( '.openDetail' );
        const handleEnter = ( event ) => {
            event.target.style.color = theme.colorNavOpt;
        };
        const handleLeave = ( event ) => {
            event.target.style.color = theme.color;
        };
        buttonDetail.forEach( node => {
            node.style.setProperty( '--before-detail-background-color', theme.colorFP );
            node.addEventListener( 'mouseenter', handleEnter );
            node.addEventListener( 'mouseleave', handleLeave );
        } );

        const titleCards = document.querySelectorAll( '.card-title' );
        titleCards.forEach( node => {
            node.style.setProperty( '--card-hover-title', theme.titleCardPFHover );
        } );

        const filmCol = document.querySelectorAll( '.film_column' );
        const listFilmColClassListM = ['m3', 'm4', 'm6', 'm12'];
        const listFilmColClassListS = ['s6', 's10'];

        const handleReziseCard = () => {
            if ( window.matchMedia( '(max-width: 500px)' ).matches ) {
                filmCol.forEach( element => {
                    listFilmColClassListM.forEach( className => {
                        if ( element.classList.contains( className ) ) {
                            element.classList.remove( className );
                        }
                    } );
                    element.classList.add( 'm12' );
                    listFilmColClassListS.forEach( className => {
                        if ( element.classList.contains( className ) ) {
                            element.classList.remove( className );
                        }
                    } );
                    element.classList.add( 's10' );
                } );
            } else if ( window.matchMedia( '(max-width: 715px)' ).matches ) {
                filmCol.forEach( element => {
                    listFilmColClassListM.forEach( className => {
                        if ( element.classList.contains( className ) ) {
                            element.classList.remove( className );
                        }
                    } );
                    element.classList.add( 'm6' );
                    listFilmColClassListS.forEach( className => {
                        if ( element.classList.contains( className ) ) {
                            element.classList.remove( className );
                        }
                    } );
                    element.classList.add( 's6' );
                } );
            } else if ( window.matchMedia( '(max-width: 950px)' ).matches ) {
                filmCol.forEach( element => {
                    listFilmColClassListM.forEach( className => {
                        if ( element.classList.contains( className ) ) {
                            element.classList.remove( className );
                        }
                    } );
                    element.classList.add( 'm4' );
                    listFilmColClassListS.forEach( className => {
                        if ( element.classList.contains( className ) ) {
                            element.classList.remove( className );
                        }
                    } );
                    element.classList.add( 's10' );
                } );
            } else {
                filmCol.forEach( element => {
                    listFilmColClassListM.forEach( className => {
                        if ( element.classList.contains( className ) ) {
                            element.classList.remove( className );
                        }
                    } );
                    element.classList.add( 'm3' );
                    listFilmColClassListS.forEach( className => {
                        if ( element.classList.contains( className ) ) {
                            element.classList.remove( className );
                        }
                    } );
                    element.classList.add( 's10' );
                } );
            }
        };

        handleReziseCard();

        window.addEventListener( 'resize', handleReziseCard );

        return () => {
            buttonDetail.forEach( node => {
                node.removeEventListener( 'mouseenter', handleEnter );
                node.removeEventListener( 'mouseleave', handleLeave );
            } );

            window.removeEventListener( 'resize', handleReziseCard );
        };
    }, [theme] );

    return (
        <div className="film_container" style={{ background: theme.backgroundFP }}>
            <Row className="outline-card">
                {films.map( ( film ) => (
                    <Col key={film.id} m={6} s={10} className='film_column'>
                        <div className="card movie-card">
                            <figure className="card-banner card-image waves-effect waves-block waves-light activator">
                                <img src={film.image} alt="" />
                            </figure>
                            <div className="card-content">
                                <div className="title-wrapper">
                                    <p className="card-title activator" style={{ color: theme.color }}>{film.title}</p>
                                </div>
                                <div className='card-detail'>
                                    <Link to={`detail/${film.id}`} className='openDetail' style={{ outline: theme.outlineDtFP, color: theme.color }}>
                                        <span>Detail</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="card-reveal" style={{ background: theme.backgroundCardReveal }}>
                                <div className='card-title close-card' style={{ color: theme.color }}><FontAwesomeIcon icon={faAngleDoubleDown} /></div>
                                <h3 className="card-title" style={{ color: theme.color }}>{film.title}</h3>
                                <time className='card-time' style={{ color: theme.colorFP }}><span style={{ color: theme.color }}>Public year: </span>{film.year}</time>
                                <div className='card-nation'>
                                    <p style={{ color: theme.colorFP }}><span style={{ color: theme.color }}>Nation: </span>{film.nation}</p>
                                </div>
                                <div className='card-describe'>
                                    <p style={{ color: theme.colorFP }}><span style={{ color: theme.color }}>Description: </span>{film.description}</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                ) )}
            </Row>
        </div>
    );
}
