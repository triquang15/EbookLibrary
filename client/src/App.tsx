import React from 'react';
import './App.css';
import { Footer } from './layouts/Footer';
import { HomePage } from './layouts/HomePage/HomePage';
import { Navbar } from './layouts/Navbar';
import { SearchBookPage } from './layouts/SearchBooksPage/SearchBookPage';

export const App = () => {
  return (
    <div>
      <Navbar/>
      {/* <HomePage /> */}
      <SearchBookPage/>
      <Footer />
    </div>
  );
}

