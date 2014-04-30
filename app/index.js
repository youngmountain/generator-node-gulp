'use strict';

var chalk = require('chalk');
var util = require('util');
var path = require('path');
var npmName = require('npm-name');
var npmLatest = require('npm-latest');
var yeoman = require('yeoman-generator');
var Config = require('../config');

var NodeGenerator = module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.config = new Config();
  },

  prompting: function () {
    var cb = this.async();

    this.log(
      this.yeoman +
      '\nThe name of your project shouldn\'t contain "node" or "js" and' +
      '\nshould be a unique ID not already in use at search.npmjs.org.');

    var prompts = [{
      name: 'name',
      message: 'Module Name',
      default: path.basename(process.cwd()),
      filter: function (input) {
        var done = this.async();

        npmName(input, function (err, available) {
          if (!available) {
            this.log.info(chalk.yellow(input) + ' already exists on npm. You might want to use another name.');
          }

          done(input);
        });
      }
    }, {
      name: 'description',
      message: 'Description',
      default: 'The best module ever.'
    }, {
      name: 'homepage',
      message: 'Homepage'
    }, {
      name: 'license',
      message: 'License',
      default: 'MIT'
    }, {
      name: 'githubUsername',
      message: 'GitHub username'
    }, {
      name: 'authorName',
      message: 'Author\'s Name'
    }, {
      name: 'authorEmail',
      message: 'Author\'s Email'
    }, {
      name: 'authorUrl',
      message: 'Author\'s Homepage'
    }];

    this.currentYear = (new Date()).getFullYear();

    // Write config default values back to prompt
    var meta = this.config.getMeta();
    prompts.forEach(function (val) {
      if (meta[val.name]) {
        val.default = meta[val.name];
      }
    }.bind(this));

    this.prompt(prompts, function (props) {
      this.slugname = this._.slugify(props.name);
      this.safeSlugname = this.slugname.replace(
          /-+([a-zA-Z0-9])/g,
          function (g) {
            return g[1].toUpperCase();
          }
      );

      this.config.setMeta(props);

      if (props.githubUsername) {
        this.repoUrl = 'https://github.com/' + props.githubUsername + '/' + this.slugname;
      } else {
        this.repoUrl = 'user/repo';
      }

      if (!props.homepage) {
        props.homepage = this.repoUrl;
      }

      this.props = props;

      cb();
    }.bind(this));

  },

  askForModules: function () {
    var cb = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'modules',
      message: 'Which modules would you like to include?',
      choices: [{
          value: 'jscsModule',
          name: 'jscs (JavaScript Code Style checker)',
          checked: true
        }, {
          value: 'releaseModule',
          name: 'release (Bump npm versions with Gulp)',
          checked: true
        }, {
          value: 'istanbulModule',
          name: 'istanbul (JS code coverage tool)',
          checked: true
        }
      ]
    }];

    this.prompt(prompts, function (props) {

      var hasMod = function (mod) {
        return props.modules.indexOf(mod) !== -1;
      };

      this.jscsModule = hasMod('jscsModule');
      this.releaseModule = hasMod('releaseModule');
      this.istanbulModule = hasMod('istanbulModule');
      this.coverallsModule = true;

      if (this.istanbulModule) {

        var promptCoveralls = [{
          type: 'confirm',
          name: 'coverallsModule',
          message: 'Would you like add coveralls',
          default: true
        }];

        this.prompt(promptCoveralls, function (props) {
          if (props && props.coverallsModule) {
            this.coverallsModule = props.coverallsModule;
          } else {
            this.coverallsModule = false;
          }
          cb();

        }.bind(this));

      } else {
        cb();
      }

    }.bind(this));

  },

  askForDependencies: function () {
    var cb = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'dependencies',
      message: 'Which dependencies would you like to include?',
      choices: []
    }];

    var dependencies = this.config.getDependencies();
    dependencies.forEach(function (pkg) {
      prompts[0].choices.push({
        value: pkg.name,
        name: util.format('%s (%s)', pkg.name, pkg.description),
        checked: true
      });
    });

    this.prompt(prompts, function (props) {

      var hasMod = function (mod) {
        return props.dependencies.indexOf(mod) !== -1;
      };

      this.usedDependencies = {};
      dependencies.forEach(function (dep) {
        if (hasMod(dep.name)) {
          this.usedDependencies[dep.name] = 'latest';
        }
      }.bind(this));

      cb();

    }.bind(this));

  },

  getLatestVersions: function () {
    var cb = this.async();
    var count = Object.keys(this.usedDependencies).length;

    if (count === 0) {
      return cb();
    }

    for (var packageName in this.usedDependencies) {
      npmLatest(packageName, {timeout: 1900}, function (err, result) {
        if (!err && result.name && result.version) {
          this.usedDependencies[result.name] = result.version;
        }
        if (!--count) {
          cb();
        }
      }.bind(this))
    }
  },

  dependency: function dependency() {
    this.dependencies = '';
    for (var name in this.usedDependencies) {
      var version = this.usedDependencies[name];
      this.dependencies += util.format('\n    "%s": "%s",', name, version);
    }
    if (this.dependencies.length > 0) {
      this.dependencies = this.dependencies.replace('\n', '');
      this.dependencies = this.dependencies.substring(0, this.dependencies.length - 1);
    }
  },

  configuring: function () {
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
    this.copy('_travis.yml', '._travis.yml');
    this.copy('editorconfig', '.editorconfig');
    if (this.jscsModule) {
      this.copy('jscs.json', '.jscs.json');
    }

    this.template('_README.md');
    this.template('_gulpfile.js');
    this.template('_package.json', 'package.json');
  },

  writing: function () {
    this.mkdir('lib');
    this.template('lib/name.js', 'lib/' + this.slugname + '.js');

    this.mkdir('test');
    this.template('test/name_test.js', 'test/' + this.slugname + '_test.js');

    this.mkdir('example');
    this.template('example/simple.js', 'example/simple.js');
  },

  install: function () {
    this.installDependencies({
      bower: false,
      skipInstall: this.options['skip-install']
    });
  }
});
