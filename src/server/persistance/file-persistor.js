import Persistor from './Persistor';
import fs        from 'mz/fs';
import path      from 'path';
import all       from 'all';

export default class FilePersistor extends Persistor {
  // constructor <<
  constructor(options) {
    super(options);

    var {
      basepath = './data'
    } = options;

    this.basepath = basepath;
  }
  // >>

  // make sure a dir exists <<
  _ensureDir(pth) {
    var dirs = pth.split(path.sep);

    var mkdir = async function(i) {
      if ( i === dirs.length ) {
        return;
      }

      var dir = dirs.slice(0, i+1).join(path.sep);
      if ( await fs.exists(dir) ) {
        return mkdir(i + 1);
      } else {
        await fs.mkdir(dir);
        return mkdir(i + 1)
      }

    };
    return mkdir(0);
  }
  // >>

  // create path for item of type with id <<
  _pathFor(type, id = '') {
    return path.join(this.basepath, type, id);
  }
  // >>

  // write an item <<
  async _writeItem(type, id, rev, item) {
    item._id       = id;
    item._modified = new Date();
    item._rev      = rev;

    var pth  = this._pathFor(type, id);
    var json = JSON.stringify(item, null, 2);

    // write the json
    try {
      await this._ensureDir(pth);
      await fs.writeFile(path.join(pth, `${rev}.json`), json);
    } catch( err ) {
      throw err;
    }

    return {
      _id:  id
    , _rev: rev
    };
  }
  // >>

  // read an item from disk <<
  async _readItem(type, id, rev) {
    var pth = this._pathFor(type, id);
    var revpth = path.join(pth, `${rev}.json`);

    if ( !(await fs.exists(pth) ) ) {
      throw new Persistor.errors.NotFoundError(type, id);
    }

    if ( !(await fs.exists(pth) ) ) {
      throw new Persistor.errors.BadRevError(type, id, rev);
    }

    var content = await fs.readFile(revpth);
    return JSON.parse(content.toString());
  }
  // >>

  // GET: get an item, possibly a specific rev <<
  async get(type, id, rev) {
    rev = rev || (await this._lastRev(type, id));

    return this._readItem(type, id, rev);
  }
  // >>

  // REVISIONS: get all revisions of an item <<
  async revisions(type, id) {
    var pth = this._pathFor(type, id);

    if ( await fs.exists(pth)) {
      var files = await fs.readdir(pth);
      var res =
        files
          .filter(function(filename) {
            return path.extname(filename) === '.json';
          })
          .map(function(filename) {
            return path.basename(filename, '.json');
          });

      return res;
    } else {
      throw new Persistor.NotFoundError(type, id);
    }
  }
  // >>

  // INSERT: insert a new item of a specific type <<
  async insert(type, item) {
    var id  = this._id();
    return this._writeItem(type, id, 0, item);
  }
  // >>

  // UPDATE: update/add an item <<
  async update(type, id, item) {
    var rev = (await this._lastRev(type, id)) + 1;
    return this._writeItem(type, id, rev, item);
  }
  // >>

  // REMOVE: remove item <<
  async remove(type, id) {
    var pth = this._pathFor(type, id);
    await fs.rmdir(pth);
    return {ok: true};
  }
  // >>

  // LIST: list items of type <<
  async list(type) {
    var pth = this._pathFor(type);
    if ( await fs.exists(pth)) {
      var ids = await fs.readdir(pth);

      var read =
        ids
          .map(id => this.get(type, id));

      return all(read);
    } else {
      return [];
    }
  }
  // >>

}