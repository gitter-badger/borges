import Borges from '../src/server';
import koa    from 'koa';
import router from 'koa-router';

var library = Borges({
  // base: '/borges'  // this is the default location of borges ui
});

// create server
var srv = koa();

srv.use(router(srv));

// use the Borges backend ui
srv.use(library.server);

srv.get('/', function * (next) {
  this.response.set('refresh', '1;/borges');
  this.body = 'Nothing here, redirecting you to Borges...';
  yield next;
});

// start server
var port = process.env.PORT || 3000;
srv.listen(port);
console.log(`listening on port ${port}...`);
