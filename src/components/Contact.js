import React, { useEffect, useState } from 'react';
import { Button, Select, TextInput } from 'react-materialize';
import { Films } from '../share/FilmList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import '../css/contact.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Typography } from '@mui/material';

export default function Contact () {
    const [films] = useState( Films );
    const { theme } = useContext( ThemeContext );
    const formik = useFormik( {
        initialValues: {
            name: "",
            email: "",
            phone: "",
            program: "",
            message: "",
            agree: false

        },
        onSubmit: ( values ) => { alert( JSON.stringify( formik.values ) ); },

        validationSchema: Yup.object( {
            name: Yup.string().required( "Required." ).min( 2, "Must be 2 characters or more" ),
            email: Yup.string().required( "Required." ).email( "Invalid email" ),
            phone: Yup.number().required( "Required." ).integer().typeError( "Please enter a valid number" ),
            program: Yup.string().required( "Please select a program." ),
            message: Yup.string().required( "Required." ).min( 10, "Must be 10 characters or more" ),
            agree: Yup.boolean().oneOf( [true], "The terms and conditions must be accepted." )
        } ),

    } );

    useEffect( () => {
        const inputs = document.querySelectorAll( '.contact-container input' );
        inputs.forEach( node => {
            node.style = `--color-label-contact: ${theme.colorFP}; color: ${theme.color} !important`;
        } );
        const labels = document.querySelectorAll( '.contact-container label' );
        labels.forEach( node => {
            node.style = `--color-label-contact: ${theme.colorFP}`;
        } );
        const textarea = document.querySelector( '.contact-container textarea' );
        textarea.style = `--color-label-contact: ${theme.colorFP}; color: ${theme.color} !important; margin-top: 0 !important`;
        const optionUl = document.querySelectorAll( '.contact-container .select-wrapper .dropdown-content li>span' );
        optionUl.forEach( node => {
            if ( node.innerHTML !== 'Choose your favorite movie' ) {
                node.style = `color: ${theme.colorFP}; font-weight: 600`;
            } else {
                node.style = `color: ${theme.color}; opacity: 0.4`;

            }
        } );
        const selectFilm = document.querySelector( '.select-wrapper input.select-dropdown' );
        selectFilm.style = `--color-label-contact: ${theme.colorFP}`;
        const svgSelect = document.querySelector( '.contact-container .select-wrapper .caret' );
        svgSelect.style.fill = theme.colorFP;
        const inputTrigger = document.querySelector( '.contact-container .select-wrapper input.select-dropdown' );
        inputTrigger.style.color = theme.colorFP;
        const ulOptions = document.querySelector( '.dropdown-content.select-dropdown' );
        ulOptions.style.background = theme.backgroundCardReveal;

        const labelContent = document.querySelector( '.label_content' );
        labelContent.style = 'margin-top: 0 !important';

        const toggle = document.querySelector( '.toggler-slider' );
        toggle.style = `--background-toggle: ${theme.backgroundNavHover}`;

        const inputCheck = document.querySelector( '.toggler-wrapper div input[type="checkbox"]' );
        const spanTerns = document.querySelector( '.toggler-wrapper span' );
        const handleInputCheck = () => {
            if ( inputCheck.checked ) {
                spanTerns.style.color = theme.colorFP;
                spanTerns.style.fontWeight = 'bold';
            } else {
                spanTerns.style.color = theme.color;
                spanTerns.style.fontWeight = 'normal';
            }
        };
        handleInputCheck();
        inputCheck.addEventListener( 'click', handleInputCheck );

        return () => {
            inputCheck.removeEventListener( 'click', handleInputCheck );
        };
    } );


    return (
        <div className='contact-container' style={{ background: theme.backgroundFP }}>
            <div className='contact-content' style={{ color: theme.colorFP }}>
                <h3>Contact us</h3>
                <form onSubmit={formik.handleSubmit}>
                    <TextInput
                        style={{ color: theme.color }}
                        id='TextInput-38'
                        label='Your Name'
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.name && ( <Typography variant="caption" color="red" style={{ fontSize: '1.35rem' }}>{formik.errors.name}</Typography> )}
                    <TextInput
                        style={{ color: theme.color }}
                        id='TextInput-39'
                        label='Your Phone'
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}

                    />
                    {formik.errors.phone && ( <Typography variant="caption" color="red" style={{ fontSize: '1.35rem' }}>{formik.errors.phone}</Typography> )}
                    <TextInput
                        style={{ color: theme.color }}
                        id='TextInput-41' label='Email'
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.email && ( <Typography variant="caption" color="red" style={{ fontSize: '1.35rem' }}>{formik.errors.email}</Typography> )}
                    <Select
                        id='Select-46'
                        multiple={false}
                        name="program"
                        value={formik.values.program}
                        onChange={formik.handleChange}

                    >
                        <option disabled value=''>
                            Choose your favorite movie
                        </option>
                        {films.map( film => (
                            <option value={`${film.id}`} key={film.id}>
                                {film.title}
                            </option>
                        ) )}
                    </Select>
                    {formik.errors.program && ( <Typography variant="caption" color="red" style={{ fontSize: '1.35rem' }}>{formik.errors.program}</Typography> )}
                    <div style={{ display: 'flex' }}>
                        <FontAwesomeIcon icon={faEdit} style={{ fontSize: '3rem' }} />
                        <div className="input-field col s6" style={{ width: '100%', marginLeft: '1rem' }}>
                            <textarea
                                id="Textarea-28"
                                className="materialize-textarea"
                                name='message'
                                rows={4}
                                value={formik.values.message}
                                onChange={formik.handleChange}

                            >
                            </textarea>
                            <label className='label_content' htmlFor="Textarea-28">Your content</label>
                            {formik.errors.message && ( <Typography variant="caption" color="red" style={{ fontSize: '1.35rem' }}>{formik.errors.message}</Typography> )}
                        </div>
                    </div>
                    <label className="toggler-wrapper style-4" value={formik.values.agree} onClick={formik.handleChange} >
                        <div>
                            <input type="checkbox" name='agree' />
                            <div id='slider' className="toggler-slider">
                                <div id='knob' className="toggler-knob" style={{ background: theme.backgroundNav, boxShadow: theme.boxShadowContact }}></div>
                            </div>
                        </div>
                        <span>Agree to terms and conditions.</span>
                    </label>
                    {formik.errors.agree && ( <Typography variant="caption" color="red" style={{ fontSize: '1.35rem' }}>{formik.errors.agree}</Typography> )}
                    <Button type='submit' style={{ background: theme.colorFP, color: theme.color, fontWeight: '700' }}>Submit</Button>
                </form>
            </div>
        </div>
    );
}