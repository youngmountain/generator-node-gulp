/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;

describe('node generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('node-gulp:app', [
        '../../app'
      ]);
      this.app.options['skip-install'] = true;
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expectedFiles = [
      'lib/mymodule.js',
      'test/mymodule_test.js',
      'example/simple.js',
      '.gitignore',
      '.jshintrc',
      '._travis.yml',
      '.editorconfig',
      '_gulpfile.js',
      'package.json',
      '_README.md'
    ];

    var expectedContent = [
      ['lib/mymodule.js', /https:\/\/github.com\/octocat\/mymodule/],
      ['package.json', /"name": "mymodule"/]
    ];

    helpers.mockPrompt(this.app, {
      'name': 'mymodule',
      'description': 'awesome module',
      'license': 'MIT',
      'githubUsername': 'octocat',
      'authorName': 'Octo Cat',
      'authorEmail': 'octo@example.com',
      'modules': [],
      'dependencies': []
    });

    this.app.run({}, function () {
      helpers.assertFile(expectedFiles);
      helpers.assertFileContent(expectedContent);
      done();
    });
  });

  it('creates expected files', function (done) {
    var expectedFiles = [
      'lib/mymodule.js',
      'test/mymodule_test.js',
      'example/simple.js',
      '.gitignore',
      '.jshintrc',
      '._travis.yml',
      '.editorconfig',
      '_gulpfile.js',
      'package.json',
      '_README.md'
    ];

    var expectedContent = [
      ['lib/mymodule.js', /http:\/\/example.com/],
      ['package.json', /"name": "mymodule"/]
    ];

    helpers.mockPrompt(this.app, {
      'name': 'mymodule',
      'description': 'awesome module',
      'license': 'MIT',
      'githubUsername': 'octocat',
      'authorName': 'Octo Cat',
      'authorEmail': 'octo@example.com',
      'homepage': 'http://example.com',
      'modules': [],
      'dependencies': []
    });

    this.app.run({}, function () {
      helpers.assertFile(expectedFiles);
      helpers.assertFileContent(expectedContent);
      done();
    });
  });

  it('generator with releaseModule', function (done) {
    var expectedFiles = [
      'lib/mymodule.js',
      'test/mymodule_test.js',
      'example/simple.js',
      '.gitignore',
      '.jshintrc',
      '._travis.yml',
      '.editorconfig',
      '_gulpfile.js',
      'package.json',
      '_README.md'
    ];

    var expectedContent = [
      ['package.json', /"gulp-bump"/],
      ['package.json', /"name": "mymodule"/],
    ];

    helpers.mockPrompt(this.app, {
      'name': 'mymodule',
      'description': 'awesome module',
      'license': 'MIT',
      'githubUsername': 'octocat',
      'authorName': 'Octo Cat',
      'authorEmail': 'octo@example.com',
      'modules': ['releaseModule'],
      'dependencies': []
    });

    this.app.run({}, function () {
      helpers.assertFile(expectedFiles);
      helpers.assertFileContent(expectedContent);
      done();
    });
  });

  it('generator with jscsModule', function (done) {
    var expectedFiles = [
      'lib/mymodule.js',
      'test/mymodule_test.js',
      'example/simple.js',
      '.gitignore',
      '.jshintrc',
      '.jscs.json',
      '._travis.yml',
      '.editorconfig',
      '_gulpfile.js',
      'package.json',
      '_README.md'
    ];

    var expectedContent = [
      ['package.json', /"name": "mymodule"/],
      ['package.json', /"gulp-jscs"/]
    ];

    helpers.mockPrompt(this.app, {
      'name': 'mymodule',
      'description': 'awesome module',
      'license': 'MIT',
      'githubUsername': 'octocat',
      'authorName': 'Octo Cat',
      'authorEmail': 'octo@example.com',
      'modules': ['jscsModule'],
      'dependencies': []
    });

    this.app.run({}, function () {
      helpers.assertFile(expectedFiles);
      helpers.assertFileContent(expectedContent);
      done();
    });
  });

  it('generator with package lodash', function (done) {
    var expectedContent = [
      ['package.json', /"lodash"/]
    ];

    helpers.mockPrompt(this.app, {
      'name': 'mymodule',
      'description': 'awesome module',
      'license': 'MIT',
      'githubUsername': 'octocat',
      'authorName': 'Octo Cat',
      'authorEmail': 'octo@example.com',
      'modules': [],
      'dependencies': ['lodash']
    });

    this.app.run({}, function () {
      helpers.assertFileContent(expectedContent);
      done();
    });
  });

  it('generator with package q', function (done) {
    var expectedContent = [
      ['package.json', /"q"/]
    ];

    helpers.mockPrompt(this.app, {
      'name': 'mymodule',
      'description': 'awesome module',
      'license': 'MIT',
      'githubUsername': 'octocat',
      'authorName': 'Octo Cat',
      'authorEmail': 'octo@example.com',
      'modules': [],
      'dependencies': ['q']
    });

    this.app.run({}, function () {
      helpers.assertFileContent(expectedContent);
      done();
    });
  });

  it('generator with package lodash and q', function (done) {
    var expectedContent = [
      ['package.json', /"lodash"/],
      ['package.json', /"q"/]
    ];

    helpers.mockPrompt(this.app, {
      'name': 'mymodule',
      'description': 'awesome module',
      'license': 'MIT',
      'githubUsername': 'octocat',
      'authorName': 'Octo Cat',
      'authorEmail': 'octo@example.com',
      'modules': [],
      'dependencies': ['lodash', 'q']
    });

    this.app.run({}, function () {
      helpers.assertFileContent(expectedContent);
      done();
    });
  });

  it('generator with istanbul', function (done) {
    var expectedFiles = [
      'lib/mymodule.js',
      'test/mymodule_test.js',
      'example/simple.js',
      '.gitignore',
      '.jshintrc',
      '._travis.yml',
      '.editorconfig',
      '_gulpfile.js',
      'package.json',
      '_README.md'
    ];

    var expectedContent = [
      ['_gulpfile.js', /var istanbul = require\('gulp-istanbul'\)/],
      ['_gulpfile.js', /gulp.task\('istanbul'/],
      ['_gulpfile.js', /gulp.task\('test', \['lint', 'istanbul'\]\);/],
      ['package.json', /"name": "mymodule"/, /"istanbul"/]
    ];

    helpers.mockPrompt(this.app, {
      'name': 'mymodule',
      'description': 'awesome module',
      'license': 'MIT',
      'githubUsername': 'octocat',
      'authorName': 'Octo Cat',
      'authorEmail': 'octo@example.com',
      'modules': ['istanbulModule'],
      'dependencies': []
    });

    this.app.run({}, function () {
      helpers.assertFile(expectedFiles);
      helpers.assertFileContent(expectedContent);
      done();
    });
  });

  it('generator with istanbul and coveralls', function (done) {
    var expectedFiles = [
      'lib/mymodule.js',
      'test/mymodule_test.js',
      'example/simple.js',
      '.gitignore',
      '.jshintrc',
      '._travis.yml',
      '.editorconfig',
      '_gulpfile.js',
      '_README.md',
      'package.json'
    ];
    var expectedContent = [
      ['._travis.yml', /npm run coveralls/],
      ['_gulpfile.js', /var istanbul = require\('gulp-istanbul'\)/],
      ['_gulpfile.js', /gulp.task\('istanbul'/],
      ['_gulpfile.js', /gulp.task\('test', \['lint', 'istanbul'\]\);/],
      ['package.json', /"name": "mymodule"/],
      ['package.json', /"gulp-istanbul"/],
      ['package.json', /"coveralls": "gulp test/]
    ];

    helpers.mockPrompt(this.app, {
      'name': 'mymodule',
      'description': 'awesome module',
      'license': 'MIT',
      'githubUsername': 'octocat',
      'authorName': 'Octo Cat',
      'authorEmail': 'octo@example.com',
      'modules': ['istanbulModule'],
      'coverallsModule': true,
      'dependencies': []
    });

    this.app.run({}, function () {
      helpers.assertFile(expectedFiles);
      helpers.assertFileContent(expectedContent);
      done();
    });
  });

});
