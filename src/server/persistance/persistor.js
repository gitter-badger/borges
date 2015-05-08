// This file contains the Persistor class
// which all Persistors should extend.
//
// A Persistor is the driver behind
// the Borges persistance layer.
//
// It should have the following methods:
//
// - get(type, id[, rev])
//   get an item of the specified type,
//   possibly a specific rev of that item.
//   If no rev is given, return the last rev.
//
// - revisions(type, id)
//   returns a list of revisions for the item
//
// - insert(type, item)
//   add a new item to the collection of items
//   of type
//
// - update(type, id, item)
//   updates the item
//
// - remove(type, id)
//   removes the item
//
// - list(type)
//   list all items of specific type
//
// and can optionally override these methods:
// - revert(type, id, rev)
//   revert an item to a previous revision
//
// - lastRev(type, id)
//   returns the last made revision identifier
//   of the item (not the item itself)

import uuid from 'uuid';

export default class Persistor {
  constructor() {
  }

  // create a new id
  _id() {
    return uuid.v1();
  }

  // get the last revision of an item
  async lastRev(type, id) {
    const revs = await this.revisions(type, id);
    return revs[revs.length - 1];
  }

  // revert and item to a previous revision
  async revert(type, id, rev) {
    const old = await this.get(type, id, rev);
    return this.update(type, id, old);
  }

}

class NotFoundError extends Error {
  constructor(type, id) {
    super();
    this.name    = 'NotFoundError';
    this.message = `item with id \`${id}\` of type \`${type}\` does not exist`;
    this.type    = type;
    this.id      = id;
    this.status  = 404;
  }
}

Persistor.NotFoundError = NotFoundError;

class BadRevError extends Error {
  constructor(type, id, rev) {
    super();
    this.name    = 'BadRevError';
    this.message = `unknown revision \`${rev}\` for item`
                 + `with id \`${id}\` of type \`${type}\``;
    this.type    = type;
    this.id      = id;
    this.rev     = rev;
    this.status  = 404;
  }
}

Persistor.BadRevError = BadRevError;
