/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var spawn = require('child_process').spawn;
var helpers = require('yeoman-generator').test;

var NPM_INSTALL_TIMEOUT = 60000;

describe('execute generated project', function () {

  beforeEach(function (done) {

    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('node-gulp:app', [
        '../../app'
      ]);
      this.app.options['skip-install'] = false;
      done();
    }.bind(this));
  });

  it('execute npm test', function (done) {
    this.timeout(NPM_INSTALL_TIMEOUT + 5000);

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
      var npmTest = spawn('npm', ['test']);
      var testError = '';

      npmTest.stderr.on('data', function (data) {
        testError += data.toString();
      });

      npmTest.on('close', function (code) {
        if (testError) {
          return done(new Error('Project test failed:\n' + testError));
        } else if (code > 0) {
          return done(new Error('Child process exited with code ' + code));
        }
        done();
      });

     });
  });

});
