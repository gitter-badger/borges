import uuid from 'uuid';

export default class Persistor {
  constructor(options) {

  }

  _id() {
    return uuid.v1();
  }

  async _lastRev(type, id) {
    var revs = await this.revisions(type, id);
    return Number(revs[revs.length - 1]);
  }
};

class NotFoundError extends Error {
  constructor(type, id) {
    super();
    this.name    = 'NotFoundError';
    this.message = `item with id \`${id}\` of type \`${type}\` does not exist`;
    this.type    = type;
    this.id      = id
    this.status  = 404;
  }
};
Persistor.NotFoundError = NotFoundError;

class BadRevError extends Error {
  constructor(type, id, rev) {
    super();
    this.name    = 'BadRevError';
    this.message = `unknown revision \`${rev}\` for item with id \`${id}\` of type \`${type}\``;
    this.type    = type;
    this.id      = id
    this.rev     = rev;
    this.status  = 404;
  }
};

Persistor.BadRevError = BadRevError;
