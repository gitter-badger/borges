import FilePersistor from './file-persistor';

export default function(options) {

  var {
    persistor = FilePersistor
  } = options;

  var p = new persistor(options);

  var res = {};

  // exported api
  [
    'insert'
  , 'get'
  , 'update'
  , 'remove'
  , 'list'
  , 'revisions'
  ].forEach(function(key) {
    return res[key] = p[key].bind(p);
  });

  return res;
};

export { FilePersistor };
