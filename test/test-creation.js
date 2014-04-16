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
    var expected = [
      ['lib/mymodule.js', /https:\/\/github.com\/octocat\/mymodule/],
      'test/mymodule_test.js',
      'example/simple.js',
      '.gitignore',
      '.jshintrc',
      '.travis.yml',
      '.editorconfig',
      'gulpfile.js',
      ['package.json', /"name": "mymodule"/],
      'README.md'
    ];

    helpers.mockPrompt(this.app, {
      'name': 'mymodule',
      'description': 'awesome module',
      'license': 'MIT',
      'githubUsername': 'octocat',
      'authorName': 'Octo Cat',
      'authorEmail': 'octo@example.com',
      'modules': []
    });

    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('creates expected files', function (done) {
    var expected = [
      ['lib/mymodule.js', /http:\/\/example.com/],
      'test/mymodule_test.js',
      'example/simple.js',
      '.gitignore',
      '.jshintrc',
      '.travis.yml',
      '.editorconfig',
      'gulpfile.js',
      ['package.json', /"name": "mymodule"/],
      'README.md'
    ];

    helpers.mockPrompt(this.app, {
      'name': 'mymodule',
      'description': 'awesome module',
      'license': 'MIT',
      'githubUsername': 'octocat',
      'authorName': 'Octo Cat',
      'authorEmail': 'octo@example.com',
      'homepage': 'http://example.com',
      'modules': []
    });

    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('generator with releaseModule', function (done) {
    var expected = [
      'lib/mymodule.js',
      'test/mymodule_test.js',
      'example/simple.js',
      '.gitignore',
      '.jshintrc',
      '.travis.yml',
      '.editorconfig',
      'gulpfile.js',
      ['package.json', /"name": "mymodule"/, /"gulp-bump"/],
      'README.md'
    ];

    helpers.mockPrompt(this.app, {
      'name': 'mymodule',
      'description': 'awesome module',
      'license': 'MIT',
      'githubUsername': 'octocat',
      'authorName': 'Octo Cat',
      'authorEmail': 'octo@example.com',
      'modules': ['releaseModule']
    });

    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('generator with jscsModule', function (done) {
    var expected = [
      'lib/mymodule.js',
      'test/mymodule_test.js',
      'example/simple.js',
      '.gitignore',
      '.jshintrc',
      '.jscs.json',
      '.travis.yml',
      '.editorconfig',
      'gulpfile.js',
      ['package.json', /"name": "mymodule"/, /"gulp-jscs"/],
      'README.md'
    ];

    helpers.mockPrompt(this.app, {
      'name': 'mymodule',
      'description': 'awesome module',
      'license': 'MIT',
      'githubUsername': 'octocat',
      'authorName': 'Octo Cat',
      'authorEmail': 'octo@example.com',
      'modules': ['jscsModule']
    });

    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

});
