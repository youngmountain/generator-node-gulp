'use strict';

var gulp   = require('gulp');
var jshint = require('gulp-jshint');<% if (jscsModule) { %>
var jscs = require('gulp-jscs');<% } %>
var mocha  = require('gulp-mocha');
<% if (releaseModule) { %>var bump   = require('gulp-bump');<% } %>

var paths = {
  lint: ['./gulpfile.js', './lib/**/*.js'],
  tests: ['./test/**/*.js', '!test/{temp,temp/**}']
};

gulp.task('lint', function () {
  return gulp.src(paths.lint)
    .pipe(jshint('.jshintrc'))<% if (jscsModule) { %>
    .pipe(jscs())<% } %>
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('mocha', function () {
  gulp.src(paths.tests)
    .pipe(mocha({ reporter: 'list' }));
});<% if (releaseModule) { %>

gulp.task('bump', ['test'], function () {
  var bumpType = process.env.BUMP || 'patch'; // major.minor.patch

  return gulp.src(['./package.json'])
    .pipe(bump({ type: bumpType }))
    .pipe(gulp.dest('./'));
});<% } %>

gulp.task('test', ['lint', 'mocha']);
<% if (releaseModule) { %>gulp.task('release', ['bump']);<% } %>
