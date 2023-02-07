import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { CheckoutPage } from './layouts/CheckoutPage/CheckoutPage';
import { Footer } from './layouts/Footer';
import { HomePage } from './layouts/HomePage/HomePage';
import { Navbar } from './layouts/Navbar';
import { SearchBookPage } from './layouts/SearchBooksPage/SearchBookPage';

export const App = () => {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
      <div className='flex-grow-1'>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/home' />
            <HomePage />
          </Route>
          <Route path='/home'>
            <HomePage />
          </Route>
          <Route path='/search'>
            <SearchBookPage />
          </Route>
          <Route path='/checkout/:bookId'>
            <CheckoutPage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

