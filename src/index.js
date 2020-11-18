import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import { MovingdayProvider } from './context/MovingdayContext';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <MovingdayProvider>
      <App />
    </MovingdayProvider>
  </BrowserRouter>,
  document.getElementById('root')
);