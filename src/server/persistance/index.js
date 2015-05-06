import FilePersistor from './file-persistor';

export default function(options) {

  var {
    persistor: Persistor = FilePersistor
  } = options;
  var p = new Persistor(options);


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
    res[key] = p[key].bind(p);
  });

  return res;
}

export { FilePersistor };
