import React from 'react';
import ReactDOM from 'react-dom';
import { MovingdayProvider } from '../../context/MovingdayContext';
import SignupFormPage from './SignupFormPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MovingdayProvider>
      <SignupFormPage />
    </MovingdayProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});