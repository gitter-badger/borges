# Borges.js

[![Build Status](https://img.shields.io/travis/romeovs/borges.svg?style=flat-square)][travis]
[![Coverage Status](https://img.shields.io/coveralls/romeovs/borges.svg?style=flat-square)][coveralls]
[![Dependencies](https://img.shields.io/david/romeovs/borges.svg?style=flat-square)][david]
[![devDependencies](https://img.shields.io/david/dev/romeovs/borges.svg?style=flat-square)][david-dev]
[![license](https://img.shields.io/badge/license-ISC-373737.svg?style=flat-square)][license]
[![gitter](https://img.shields.io/badge/GITTER-join%20chat%20→-00d86e.svg?style=flat-square)][gitter]

*this repo is a stub where we want to park our ideas
and begin writing the pre 0.0.1 code for borges.js*

`Borges.js` is a cms *library* for node.  It aims to provide
all the functionality your users need but also allows complete
developer freedom.

The idea is simple: a developer creates the models for the editable
content.  `Borges.js` provides a nice backend UI for users to create
and edit this content, as well as a simepl API for developers to acces
the created content.  The rest is up to the developer.

## Vision:
  - the persistence layer is interchangeable (allows use of SQL, MongoDB, Couch,
    ...)
  - rendering engine is interchangeable (allows use of any one of the multitude
    of javascript rendering engines)
  - the developer specifies data models
  - the user gets a nice ui for editing content based on these data models
  - be as heroku-ready as possible
  - be open source and free forever
  - stay simple, borges is a library not a framework, should be easy to install
    and set up.
  - Borges.js is pluggable
  - be state-of-the art. Borges.js is written and tested in ES6-compliant
    javascript.
  - embrace new web technology to allow for offline, realtime, ... apps fluently
  - embrace open standards, such as json-schema, json-api, ...

## Roadmap
  - Decide on a modelling language or library.  Let's not reinvent the wheel
    here, but let's also choose something that's extensible.  I'm thinking of
    going with an extended version json-schema.

  - Get a basic architecture going so we have something to experiment
    with.  This will clarify what future steps need to be taken.

## Development
To contribute, fork the repo and clone it.  You can start the dev server
by doing:
```sh
npm run dev
```
this starts the example server that's located in the `dev/` directory.

When you're editing the UI files and want it to restart when changes happen:
```sh
gulp --watch
```
provided you have `gulp` installed.  This will rebuild the frontend files
as well as restart the server any time something has changed.

## Architecture
Borges constists of several layers:

```
  +-----+---------+
  | CMS | Backend |
  +---------------+
  |      API      |
  +---------------+
  |  Persistance  |
  +---------------+
```

Everything is stored by the Persistance layer.  The Persistance layer is simple
and interchangeable to allow for the use of any of the myriad of solutions
that's already available (SQL, mongodb, plain files, ...).

On top of this, the Borges API is built, this API is exposed to the
developer to allow him to build a website in any way he chooses
(using React + koa, Angular + express, ... anything is possible).

The Borges frontend itself is built on top of this API.  The CMS is available as
a simple http route handler.  This way it can be easily hooked into the existing
backend infrastructure.  A big plus of dogfooding the API for the CMS is that it
keeps Borges honest: the CMS cannot play any special tricks behind the scenes or
use parts of the api that are hidden.  Since a CMS is generally one of the more
complex applications one can build, this ensures that the API has enough
features to build any kind website on top of it.

### License
This code is licensed under the [ISC license][license]

[travis]:    https://travis-ci.org/romeovs/borges
[coveralls]: https://coveralls.io/r/romeovs/borges?branch=master
[david]:     https://david-dm.org/romeovs/borges#info=dependencies
[david-dev]: https://david-dm.org/romeovs/borges#info=devDependencies
[gitter]:    https://gitter.im/romeovs/borges?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[license]:   ./LICENSE
