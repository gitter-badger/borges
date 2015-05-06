import React  from 'react';
import Router from 'react-router';

const { Route
      , DefaultRoute
      , NotFoundRoute } = Router;

import App from './components/app';

export default (
  <Route
    name    = 'home'
    path    = '/borges'
    handler = { App } >
  </Route>
);
