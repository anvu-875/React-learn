import React, { useState } from 'react';
import { Carousel } from 'react-materialize';
import { useContext, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';
import '../css/new.css';
import '../css/film.css';
import { Films } from '../share/FilmList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function New () {
    const [movies] = useState( Films.filter( film => film.new === true ) );
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

        return () => {
            buttonDetail.forEach( node => {
                node.removeEventListener( 'mouseenter', handleEnter );
                node.removeEventListener( 'mouseleave', handleLeave );
            } );
        };
    }, [theme] );
    return (
        <div className='new-container' style={{ background: theme.backgroundFP }}>
            <Carousel
                carouselId="Carousel-45"
                options={{
                    dist: -100,
                    duration: 200,
                    fullWidth: false,
                    indicators: false,
                    noWrap: false,
                    numVisible: 3,
                    onCycleTo: null,
                    padding: 0,
                    shift: 0
                }}
            >
                {movies.map( ( movie ) => (
                    <div className="card movie-card" key={movie.id}>
                        <figure className="card-banner card-image waves-effect waves-block waves-light activator">
                            <img src={movie.image} alt="" />
                        </figure>
                        <div className="card-content">
                            <div className="title-wrapper">
                                <p className="card-title activator" style={{ color: theme.color }}>{movie.title}</p>
                            </div>
                            <div className='card-detail'>
                                <Link to={`detail/${movie.id}`} className='openDetail' style={{ outline: theme.outlineDtFP, color: theme.color }}>
                                    <span>Detail</span>
                                </Link>
                            </div>
                        </div>
                        <div className="card-reveal" style={{ background: theme.backgroundCardReveal }}>
                            <div className='card-title close-card' style={{ color: theme.color }}><FontAwesomeIcon icon={faAngleDoubleDown} /></div>
                            <h3 className="card-title" style={{ color: theme.color }}>{movie.title}</h3>
                            <time className='card-time' style={{ color: theme.colorFP }}><span style={{ color: theme.color }}>Public year: </span>{movie.year}</time>
                            <div className='card-nation'>
                                <p style={{ color: theme.colorFP }}><span style={{ color: theme.color }}>Nation: </span>{movie.nation}</p>
                            </div>
                            <div className='card-describe'>
                                <p style={{ color: theme.colorFP }}><span style={{ color: theme.color }}>Description: </span>{movie.description}</p>
                            </div>
                        </div>
                    </div>
                ) )}
            </Carousel>
        </div>
    );
}
