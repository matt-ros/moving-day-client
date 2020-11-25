import React from 'react';
import ReactDOM from 'react-dom';
import { MovingdayProvider } from '../../context/MovingdayContext';
import Nav from './Nav';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MovingdayProvider>
      <Nav />
    </MovingdayProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});