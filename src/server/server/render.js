import React  from 'react';
import Router from 'react-router';
import fs     from 'fs';
import path   from 'path';
import hbs    from 'handlebars';
import routes from '../../app/routes';
import debug  from '../../lib/debug';

const templ    = path.join(__dirname, '../../app/views/main.hbs');
const template = hbs.compile(fs.readFileSync(templ).toString());

export default function (pth, koa) {
  pth = pth.replace(/\/$/, '');
  debug(`GET ${ pth }`);
  return new Promise(function (resolve, reject) {
    try {
      Router.run(routes, pth, function (Handler, state) {
        const notfound = state.routes
          .filter(router => router.name === '404')
          .length > 0;

        if ( notfound ) {
          debug(`route ${ pth } not found`);
          koa.status = 404;
        }

        try {
          const data = {};
          resolve(template({
            markup: React.renderToString(React.createElement(Handler, { data }))
          , data: JSON.stringify(data)
          }));
        } catch (err) {
          reject(err);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}
