import React from 'react';
import './App.css';
import { Carousel } from './layouts/HomePage/Carousel';
import { ExploreTopBooks } from './layouts/HomePage/ExploreTopBooks';
import { Navbar } from './layouts/Navbar';

function App() {
  return (
    <div>
      <Navbar/>
      <ExploreTopBooks />
      <Carousel />
    </div>
  );
}

export default App;
