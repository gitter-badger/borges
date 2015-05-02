# Borges.js

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

## Roadmap
  - Decide on a modelling language or library.  Let's not reinvent the wheel
    here, but let's also choose something that's extensible.
  - Get a basic architecture going so we have something to experiment
    with.  This will clarify what future steps need to be taken.
