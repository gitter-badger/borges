import koa   from 'koa';
import mount from 'koa-mount';
import serve from 'koa-static';
import path  from 'path';

const assets = koa();
assets.use(serve(path.join(__dirname, '../../../public')));
export default mount('/assets', assets);
