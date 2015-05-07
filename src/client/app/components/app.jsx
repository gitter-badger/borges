import React  from 'react';
import Router from 'react-router';

import Menu   from './menu';

const App = React.createClass({
  render() {
    return (
      <div className="borges">
        <Menu />
        <main>
          <Router.RouteHandler/>
        </main>
      </div>
    );
  }
});

export default App;
