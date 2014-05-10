'use strict';

var gulp   = require('gulp');
var jshint = require('gulp-jshint');<% if (jscsModule) { %>
var jscs = require('gulp-jscs');<% } %><% if (istanbulModule) { %>
var istanbul = require('gulp-istanbul');<% } %>
var mocha  = require('gulp-mocha');
<% if (releaseModule) { %>var bump   = require('gulp-bump');<% } %>

var paths = {
  lint: ['./gulpfile.js', './lib/**/*.js'],
  watch: ['./gulpfile.js', './lib/**', './test/**/*.js', '!test/{temp,temp/**}'],
  tests: ['./test/**/*.js', '!test/{temp,temp/**}']<% if (istanbulModule) { %>,
  source: ['./lib/*.js']<% } %>
};

gulp.task('lint', function () {
  return gulp.src(paths.lint)
    .pipe(jshint('.jshintrc'))<% if (jscsModule) { %>
    .pipe(jscs())<% } %>
    .pipe(jshint.reporter('jshint-stylish'));
});<% if (istanbulModule) { %>

gulp.task('istanbul', function (cb) {
  gulp.src(paths.source)
    .pipe(istanbul()) // Covering files
    .on('end', function () {
      gulp.src(paths.tests, {cwd: __dirname})
        .pipe(mocha())
        .pipe(istanbul.writeReports()) // Creating the reports after tests runned
        .on('end', cb);
    });
});<% } else { %>

gulp.task('mocha', function () {
  gulp.src(paths.tests, {cwd: __dirname})
    .pipe(mocha({ reporter: 'list' }));
});<% } %><% if (releaseModule) { %>

gulp.task('bump', ['test'], function () {
  var bumpType = process.env.BUMP || 'patch'; // major.minor.patch

  return gulp.src(['./package.json'])
    .pipe(bump({ type: bumpType }))
    .pipe(gulp.dest('./'));
});<% } %>

gulp.task('watch', function () {
  gulp.run('test');
  gulp.watch(paths.watch, ['test']);
});

gulp.task('test', ['lint', <% if (istanbulModule) { %>'istanbul'<% } else { %>'mocha'<% } %>]);
<% if (releaseModule) { %>gulp.task('release', ['bump']);<% } %>
