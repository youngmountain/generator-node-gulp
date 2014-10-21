'use strict';

var gulp   = require('gulp');
var $ = require('gulp-load-plugins')();

var paths = {
  lint: ['./gulpfile.js', './lib/**/*.js'],
  watch: ['./gulpfile.js', './lib/**', './test/**/*.js', '!test/{temp,temp/**}'],
  tests: ['./test/**/*.js', '!test/{temp,temp/**}']<% if (istanbulModule) { %>,
  source: ['./lib/*.js']<% } %>
};

var onError = function(err) {
  $.util.beep();

  if (process.env.CI) {
    throw new Error(err);
  };
}

gulp.task('lint', function () {
  return gulp.src(paths.lint)
    .pipe($.jshint('.jshintrc'))<% if (jscsModule) { %>
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe($.jscs())<% } %>
    .pipe($.jshint.reporter('jshint-stylish'));
});<% if (istanbulModule) { %>

gulp.task('istanbul', function (cb) {
  gulp.src(paths.source)
    .pipe($.istanbul()) // Covering files
    .on('finish', function () {
      gulp.src(paths.tests)
        .pipe($.plumber({
          errorHandler: onError
        }))<% if (testFramework === 'jasmine') { %>
        .pipe($.jasmine())<% } %><% if (testFramework === 'mocha') { %>
        .pipe($.mocha())<% } %>
        .pipe($.istanbul.writeReports()) // Creating the reports after tests runned
        .on('finish', function() {
          process.chdir(__dirname);
          cb();
        });
    });
});<% } else { %>

gulp.task('unitTest', function () {
  gulp.src(paths.tests, {cwd: __dirname})
    .pipe($.plumber({
      errorHandler: onError
    }))<% if (testFramework === 'jasmine') { %>
    .pipe($.jasmine());<% } %><% if (testFramework === 'mocha') { %>
    .pipe($.mocha({ reporter: 'list' }));<% } %>
});<% } %><% if (releaseModule) { %>

gulp.task('bump', ['test'], function () {
  var bumpType = $.util.env.type || 'patch'; // major.minor.patch

  return gulp.src(['./package.json'])
    .pipe($.bump({ type: bumpType }))
    .pipe(gulp.dest('./'));
});<% } %>

gulp.task('watch', ['test'], function () {
  gulp.watch(paths.watch, ['test']);
});

gulp.task('test', ['lint', <% if (istanbulModule) { %>'istanbul'<% } else { %>'unitTest'<% } %>]);<% if (releaseModule) { %>

gulp.task('release', ['bump']);<% } %>

gulp.task('default', ['test']);
