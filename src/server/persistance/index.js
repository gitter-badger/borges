import FilePersistor from './file-persistor';

export default function (options) {
  const {
    persistor: Persistor = FilePersistor
  } = options;

  const p   = new Persistor(options);
  const res = {};

  // exported api
  [
    'insert'
  , 'get'
  , 'update'
  , 'remove'
  , 'list'
  , 'revisions'
  ].forEach(function (key) {
    res[key] = p[key].bind(p);
  });

  return res;
}

export { FilePersistor };
