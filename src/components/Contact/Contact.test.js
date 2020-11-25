import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Contact from './Contact';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <Contact contact={{ id: 1, contact_name: 'test contact_name' }} />
  </BrowserRouter>,
  div
);
  ReactDOM.unmountComponentAtNode(div);
});