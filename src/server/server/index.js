import koa    from 'koa';
import router from 'koa-router';
import mount  from 'koa-mount';

import assets from './assets';
import render from './render';

export default function (options = {}) {
  const {
    base = '/borges'
  } = options;

  const app = koa();

  // install router
  app.use(router(app));

  // install asset routes
  app.use(assets);

  // render route
  app.get(/^\/(?!.*assets)/, function * (next) {
    this.body = yield render('/borges' + this.request.path, this);
    yield next;
  });

  // create server and mount the borges dashboard at `base` path
  return mount(base, app);
}
