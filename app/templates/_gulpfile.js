'use strict';

var gulp   = require('gulp');
var plugins = require('gulp-load-plugins')();

var paths = {
  lint: ['./gulpfile.js', './lib/**/*.js'],
  watch: ['./gulpfile.js', './lib/**', './test/**/*.js', '!test/{temp,temp/**}'],
  tests: ['./test/**/*.js', '!test/{temp,temp/**}']<% if (istanbulModule) { %>,
  source: ['./lib/*.js']<% } %>
};

var plumberConf = {};

if (process.env.CI) {
  plumberConf.errorHandler = function(err) {
    throw err;
  };
}

gulp.task('lint', function () {
  return gulp.src(paths.lint)
    .pipe(plugins.jshint('.jshintrc'))<% if (jscsModule) { %>
    .pipe(plugins.plumber(plumberConf))
    .pipe(plugins.jscs())<% } %>
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});<% if (istanbulModule) { %>

gulp.task('istanbul', function (cb) {
  gulp.src(paths.source)
    .pipe(plugins.istanbul()) // Covering files
    .pipe(plugins.istanbul.hookRequire()) // Force `require` to return covered files
    .on('finish', function () {
      gulp.src(paths.tests)
        .pipe(plugins.plumber(plumberConf))<% if (testFramework === 'jasmine') { %>
        .pipe(plugins.jasmine())<% } %><% if (testFramework === 'mocha') { %>
        .pipe(plugins.mocha())<% } %>
        .pipe(plugins.istanbul.writeReports()) // Creating the reports after tests runned
        .on('finish', function() {
          process.chdir(__dirname);
          cb();
        });
    });
});<% } else { %>

gulp.task('unitTest', function () {
  gulp.src(paths.tests, {cwd: __dirname})
    .pipe(plugins.plumber(plumberConf))<% if (testFramework === 'jasmine') { %>
    .pipe(plugins.jasmine());<% } %><% if (testFramework === 'mocha') { %>
    .pipe(plugins.mocha({ reporter: 'list' }));<% } %>
});<% } %><% if (releaseModule) { %>

gulp.task('bump', ['test'], function () {
  var bumpType = plugins.util.env.type || 'patch'; // major.minor.patch

  return gulp.src(['./package.json'])
    .pipe(plugins.bump({ type: bumpType }))
    .pipe(gulp.dest('./'));
});<% } %>

gulp.task('watch', ['test'], function () {
  gulp.watch(paths.watch, ['test']);
});

gulp.task('test', ['lint', <% if (istanbulModule) { %>'istanbul'<% } else { %>'unitTest'<% } %>]);<% if (releaseModule) { %>

gulp.task('release', ['bump']);<% } %>

gulp.task('default', ['test']);
