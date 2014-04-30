/*global describe, beforeEach, it*/
'use strict';
var assert = require('assert');
var path = require('path');
var helpers = require('yeoman-generator').test;
var Config = require('../config');

describe('generator settings', function () {

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }
      done();
    }.bind(this));
  });

  it('wirte meta infos', function () {

    var config = new Config('config.json');
    config.setMeta({
      githubUsername: 'tom',
      authorName: 'Tom Jerry',
      authorEmail: 'tom@jerry.org',
      authorUrl: 'http://jerry.org'
    });

    var expectedFiles = [
      'config.json'
    ];

    var expectedContent = [
      ['config.json',
        /"githubUsername": "tom"/,
        /"authorName": "Tom Jerry"/,
        /"authorEmail": "tom@jerry.org"/,
        /"authorUrl": "http:\/\/jerry.org"/
      ]
    ];

    helpers.assertFile(expectedFiles);
    helpers.assertFileContent(expectedContent);
  });
});
