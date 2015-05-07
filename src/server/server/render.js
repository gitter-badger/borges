import React  from 'react';
import Router from 'react-router';
import fs     from 'fs';
import path   from 'path';
import hbs    from 'handlebars';
import routes from '../../client/app/routes';
import debug  from '../../lib/debug';

var template = hbs.compile(fs.readFileSync(path.join(__dirname, '../../client/app/views/main.hbs')).toString());

export default function(pth) {
  pth = pth.replace(/\/$/, '');
  debug(`GET ${pth}`)
  return new Promise(function(resolve, reject) {
    try {
      Router.run(routes, pth, function(Handler) { // todo: add state
        try {
          var data = {};
          resolve(template({
            markup: React.renderToString(React.createElement(Handler, {data}))
          , data: JSON.stringify(data)
          }));
        } catch (err) {
          reject(err);
        }
      });
    } catch ( err ) {
      reject(err);
    }
  });
}
