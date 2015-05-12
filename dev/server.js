import Borges from '../src/server';
import koa    from 'koa';
import router from 'koa-router';

const library = Borges({
  // base: '/borges'  // this is the default location of borges ui
});

// create server
const srv = koa();

// install routers
srv.use(router(srv));

// use the Borges backend ui
srv.use(library.server);

// refresh to borges
srv.get('/', function * (next) {
  this.response.set('refresh', '1;/borges');
  this.body = 'Nothing here, redirecting you to Borges...';
  yield next;
});

// start server
const port = process.env.PORT || 3000;
srv.listen(port);
console.log(`listening on port ${port}...`);
