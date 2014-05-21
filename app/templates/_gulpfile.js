'use strict';

var gulp   = require('gulp');
var plugins = require('gulp-load-plugins')();

var paths = {
  lint: ['./gulpfile.js', './lib/**/*.js'],
  watch: ['./gulpfile.js', './lib/**', './test/**/*.js', '!test/{temp,temp/**}'],
  tests: ['./test/**/*.js', '!test/{temp,temp/**}']<% if (istanbulModule) { %>,
  source: ['./lib/*.js']<% } %>
};

gulp.task('lint', function () {
  return gulp.src(paths.lint)
    .pipe(plugins.jshint('.jshintrc'))<% if (jscsModule) { %>
    .pipe(plugins.jscs())<% } %>
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});<% if (istanbulModule) { %>

gulp.task('istanbul', function (cb) {
  gulp.src(paths.source)
    .pipe(plugins.istanbul()) // Covering files
    .on('finish', function () {
      gulp.src(paths.tests, {cwd: __dirname})
        .pipe(plugins.mocha())
        .pipe(plugins.istanbul.writeReports()) // Creating the reports after tests runned
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
    .pipe(plugins.bump({ type: bumpType }))
    .pipe(gulp.dest('./'));
});<% } %>

gulp.task('watch', function () {
  gulp.run('test');
  gulp.watch(paths.watch, ['test']);
});

gulp.task('default', ['test']);
gulp.task('test', ['lint', <% if (istanbulModule) { %>'istanbul'<% } else { %>'mocha'<% } %>]);
<% if (releaseModule) { %>gulp.task('release', ['bump']);<% } %>
