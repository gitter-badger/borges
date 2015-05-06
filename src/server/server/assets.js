import koa   from 'koa';
import mount from 'koa-mount';
import serve from 'koa-static';
import path  from 'path';


// import router from 'koa-router';
// import cache  from 'koa-cash';
//
// import browserify from 'browserify';
// import babelify   from 'babelify';
// import uglifyify  from 'uglifyify';
//
// import gulp       from 'gulp';
// import myth       from 'gulp-myth';
// import styl       from 'gulp-stylus';
// import csso       from 'gulp-csso';
// import map        from 'map-stream';
//
// var assets = koa();
//
// // bundle into single js file <<
// var opts = {
//   mangle: true
// , global: true
// , compress: {
//     sequences:     true   // join consecutive statemets with the "comma operator"
//   , properties:    true   // optimize property access: a["foo"] -> a.foo
//   , dead_code:     true   // discard unreachable code
//   , drop_debugger: true   // discard "debugger" statements
//   , unsafe:        false  // some unsafe optimizations (see below)
//   , conditionals:  true   // optimize if-s and conditional expressions
//   , comparisons:   true   // optimize comparisons
//   , evaluate:      true   // evaluate constant expressions
//   , booleans:      true   // optimize boolean expressions
//   , loops:         true   // optimize loops
//   , unused:        true   // drop unused variables/functions
//   , hoist_funs:    true   // hoist function declarations
//   , hoist_vars:    true   // hoist variable declarations
//   , if_return:     true   // optimize if-s followed by return/continue
//   , join_vars:     true   // join var declarations
//   , cascade:       true   // try to cascade `right` into `left` in sequences
//   , side_effects:  true   // drop side-effect-free statements
//   , warnings:      true   // warn about potentially dangerous optimizations/code
//   , global_defs:   {}     // global definitions
//   }
// };
//
// var bundle = function(entry) {
//   var strm =
//     browserify(entry, { extensions: ['.js', '.jsx'] })
//       .transform(babelify.configure({
//         stage: 0,
//         optional: ['runtime']
//       }))
//       .transform(opts, 'uglifyify')
//       .bundle()
//       .on('error', function(err) {
//         console.log(err);
//       });
//   return strm;
// };
// // >>
//
// // set up cache <<
// var CACHE = {};
// assets.use(cache({
//   get: function (key, maxAge) {
//     return CACHE[key] || {};
//   }
//
// , set: function (key, value) {
//     CACHE[key] = value;
//     return value;
//   }
// }));
// // >>
//
// assets.use(router(assets));
//
// // get app.js <<
// assets.get('/app.js', function * (next) {
//   if (yield* this.cashed()) {
//      return;
//   }
//
//   this.type = 'application/javascript';
//   this.body = bundle(path.join(__dirname, '../../client/app/index.jsx'));
//
//   yield next;
// });
// // >>
//
// // get lib.js <<
// assets.get('/lib.js', function * (next) {
//   if (yield* this.cashed()) {
//      return;
//   }
//
//   this.type = 'application/javascript';
//   this.body = bundle(path.join(__dirname, '../../client/lib/index.js'));
//
//   yield next;
// });
// // >>
//
// // get
// assets.get('/app.css', function * (next) {
//   // if (yield* this.cashed()) {
//   //    return;
//   // }
//
//   this.type = 'text/css';
//   this.body =
//     gulp.src(path.join(__dirname, '../../client/styles/main.styl'))
//       .pipe(styl())
//       .pipe(myth())
//       .pipe(csso())
//       .pipe(map(function(data, done) {
//         done(null, data.contents);
//       }));
//
//   yield next;
// });
//
//
// export default mount('/assets', assets);

var assets = koa();
assets.use(serve(path.join(__dirname, '../../../public')));
export default mount('/assets', assets);
