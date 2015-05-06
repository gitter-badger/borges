var gulp   = require('gulp')
  , heim   = require('heimlich')
  , watch  = require('gulp-watch')
  , rename = require('gulp-rename')
  , babelify = require('babelify')
  ;

// we need to remove the polyfill
// from hemilich
require("babel/polyfill");

var watching = heim.flag('watch');
var rebundle;

gulp.task('app:js', function() {
  rebundle =
    heim.browserify({
      entries: './src/client/app/index.jsx'
    , debug: true
    })
    .configure(function() {
      this.options.extensions = ['.jsx'].concat(this.options.extensions);
      this.bundler.transform(babelify.configure({
        stage: 0
      , optional: [ 'runtime' ]
      }));
    })
    .done(function(strm) {
      strm
        .pipe(rename('app.js'))
        .pipe(heim.dest(heim.config.dest.js));
    });
});

gulp.task('app:css',
  heim.tasks.stylus({
    rename: true
  , filename: 'app.css'
  }));

var restart;
var nodemon = require('gulp-nodemon');

gulp.task('node', function() {
  var nm =
    nodemon({
      script: 'dev/start.js'
    , nodeArgs: [ '--harmony' ]
    , restartable: false
    });

  restart = function() { nm.restart() };
});

gulp.task('default', ['app:css', 'app:js'], function() {

  if ( watching ) {
    // watch css files
    watch(heim.config.watch.css, function() {
      gulp.start('app:css');
    });

    gulp.start('node');

    watch(heim.config.watch.js, function() {
      restart();
    });
  }
});
