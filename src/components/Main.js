import React, { useState } from 'react';
import Navigation from './Navigation';
import { Films } from '../share/FilmList';
import FilmPresentation from './FilmPresentation';
import Footer from './Footer';
import { Routes, Route } from "react-router-dom";
import Detail from './Detail';
import New from './New';
import About from './About';
import Contact from './Contact';

export default function Main () {
    const [films] = useState( Films );
    return (
        <main>
            <Navigation />
            <Routes>
                <Route path='/' element={<FilmPresentation films={films} />} />
                <Route path='/new' element={<New />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/detail/:id' element={<Detail />} />
                <Route path='new/detail/:id' element={<Detail setImg={1} />} />
            </Routes>
            <Footer />
        </main>
    );
};