import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import store from "./store/index.js";

test('renders learn react link', () => {
  let appComponent;
  appComponent = (
      <Provider store={store}>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </Provider>
  );
  render(appComponent);
  expect(screen.getByText('Henry Countries')).toBeInTheDocument();
});
 