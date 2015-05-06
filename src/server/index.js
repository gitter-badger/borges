import server      from './server';
import persistance from './persistance';

export default function(options = {}) {
  return {
    server: server(options)
  , data:   persistance(options)
  };
};
