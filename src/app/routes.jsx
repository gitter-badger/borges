import React  from 'react';
import Router from 'react-router';

const { Route
      , DefaultRoute
      , NotFoundRoute } = Router;

import App      from './components/app';
import Home     from './components/home';
import { e404 } from './components/error-page';

export default (
  <Route
    name    = 'home'
    path    = '/borges'
    handler = { App } >
    <DefaultRoute  handler={Home} />
    <NotFoundRoute handler={e404} />
  </Route>
);
