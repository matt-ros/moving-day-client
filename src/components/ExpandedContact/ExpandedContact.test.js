import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { MovingdayProvider } from '../../context/MovingdayContext'
import ExpandedContact from './ExpandedContact';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <MovingdayProvider>
        <ExpandedContact />
      </MovingdayProvider>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});