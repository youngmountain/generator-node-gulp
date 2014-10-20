'use strict';

var gulp   = require('gulp');
var plugins = require('gulp-load-plugins')();

var paths = {
  lint: ['./gulpfile.js', './app/index.js', './config.js'],
  tests: ['./test/**/*.js', '!./test/temp/**/*.js'],
  watch: ['./gulpfile.js', './app/**', './config.js', './test/**/*.js', '!./test/temp/**/*.js'],
  source: ['./lib/*.js', './app/index.js', './config.js']
};

var onError = function(err) {
  plugins.util.beep();

  if (process.env.CI) {
    throw new Error(err);
  }
};

gulp.task('lint', function () {
  return gulp.src(paths.lint)
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.plumber({
      errorHandler: onError
    }))
    .pipe(plugins.jscs())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('istanbul', function (cb) {
  gulp.src(paths.source)
    .pipe(plugins.istanbul()) // Covering files
    .on('finish', function () {
      gulp.src(paths.tests, {cwd: __dirname})
        .pipe(plugins.plumber({
          errorHandler: onError
        }))
        .pipe(plugins.mocha())
        .pipe(plugins.istanbul.writeReports()) // Creating the reports after tests runned
        .on('finish', function() {
          process.chdir(__dirname);
          cb();
        });
    });
});

gulp.task('bump', ['test'], function () {
  var bumpType = plugins.util.env.type || 'patch'; // major.minor.patch

  return gulp.src(['./package.json'])
    .pipe(plugins.bump({ type: bumpType }))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', ['istanbul'], function () {
  gulp.watch(paths.watch, ['istanbul']);
});

gulp.task('test', ['lint', 'istanbul']);

gulp.task('release', ['bump']);

gulp.task('default', ['test']);
