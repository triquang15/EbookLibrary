import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { BrowserRouter} from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51MbbJvBUdqNU4WI9qKflMJkFZW8PhCpT33e5PhAvmB2t7HadVthnyBlHDnLTgF3jFv2Mfe0PgkFXVsVZDWiAhmJL0060GbpF9R');


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>   
  </BrowserRouter>
);


