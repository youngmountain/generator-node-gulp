'use strict';

var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var istanbul = require('gulp-istanbul');
var mocha  = require('gulp-mocha');
var bump   = require('gulp-bump');

var paths = {
  lint: ['./gulpfile.js', './app/index.js', './config.js'],
  tests: ['./test/**/*.js', '!./test/temp/**/*.js'],
  watch: ['./gulpfile.js', './app/**', './config.js', './test/**/*.js', '!./test/temp/**/*.js'],
  source: ['./lib/*.js', './app/index.js', './config.js']
};

gulp.task('lint', function () {
  return gulp.src(paths.lint)
    .pipe(jshint('.jshintrc'))
    .pipe(jscs())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('istanbul', function (cb) {
  gulp.src(paths.source)
    .pipe(istanbul()) // Covering files
    .on('end', function () {
      gulp.src(paths.tests, {cwd: __dirname})
        .pipe(mocha())
        .pipe(istanbul.writeReports()) // Creating the reports after tests runned
        .on('end', cb);
    });
});

gulp.task('bump', ['test'], function () {
  var bumpType = process.env.BUMP || 'patch'; // major.minor.patch

  return gulp.src(['./package.json'])
    .pipe(bump({ type: bumpType }))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
  gulp.run('istanbul');
  gulp.watch(paths.watch, ['istanbul']);
});

gulp.task('test', ['lint', 'istanbul']);
gulp.task('release', ['bump']);
