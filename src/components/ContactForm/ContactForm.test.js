import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { MovingdayProvider } from '../../context/MovingdayContext';
import ContactForm from './ContactForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <MovingdayProvider>
        <ContactForm match={{ params: { id: 1 } }} history={{ goBack: () => {} }} />
      </MovingdayProvider>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});