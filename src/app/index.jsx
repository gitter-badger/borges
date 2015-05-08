import React from 'react';
import Router from 'react-router';
import fetch  from 'fetch';

import routes from './routes';

const render = function (Handler, data) {
  React.render(<Handler data={data}/>, document.getElementById('app'));
};

// initialize react
const router = Router.create({
  routes:   routes
, location: Router.HistoryLocation
, scrollBehaviour: 'browser'
});

// else get state from server
router.run(async function (Handler, state) {
  const data = await fetch(state);
  render(Handler, data);
});
