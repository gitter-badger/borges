import Borges from '../src/server';
import koa    from 'koa';

var library = Borges({
  // base: '/borges'  // this is the default location of borges ui
});

// create server
var srv = koa();

// use the Borges backend ui
srv.use(library.server);

// start server
var port = process.env.PORT || 3000;
srv.listen(port);
console.log(`listening on port ${port}...`);
