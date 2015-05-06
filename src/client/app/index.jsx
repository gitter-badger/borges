import React from 'react';
import Router from 'react-router';
import fetch  from 'fetch';

import routes from './routes';

var render = function(Handler, data) {
  React.render(<Handler data={data}/>, document.getElementById('app'));
};

// initialize react
var router = Router.create({
  routes:   routes
, location: Router.HistoryLocation
, scrollBehaviour: 'browser'
});

router.run(async function (Handler, state) {
  // else get state from server
  var data = await fetch(state)
  render(Handler, data);
});
