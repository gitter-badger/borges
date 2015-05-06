import React  from 'react';
import Router from 'react-router';
import fs     from 'fs';
import path   from 'path';
import hbs    from 'handlebars';
import routes from '../../client/app/routes';

var template = hbs.compile(fs.readFileSync(path.join(__dirname, '../../client/app/views/main.hbs')).toString());

export default function(path) {
  path = path.replace(/\/$/, '');
  return new Promise(function(resolve, reject) {
    try {
      Router.run(routes, path, function(Handler, state) {
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
};
