'use strict';

var fs = require('fs');
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var npmLatest = require('npm-latest');

var configKeys = ['githubUsername', 'authorName', 'authorEmail', 'authorUrl'];

var NodeGenerator = module.exports = function NodeGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({
      bower: false,
      skipInstall: options['skip-install']
    });
  });

  this.configPath = path.join(__dirname, '../config.json');
  if (fs.existsSync(this.configPath)) {
    this.config = JSON.parse(this.readFileAsString(this.configPath));
  } else {
    this.config = {
      "meta": {},
      "dependencies": [
        {name: 'lodash', description: 'A utility library delivering consistency, customization, performance, & extras'},
        {name: 'q', description: 'A library for promises'}
      ]
    }
  }
};
util.inherits(NodeGenerator, yeoman.generators.NamedBase);

NodeGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  console.log(
    this.yeoman +
    '\nThe name of your project shouldn\'t contain "node" or "js" and' +
    '\nshould be a unique ID not already in use at search.npmjs.org.');

  var prompts = [{
    name: 'name',
    message: 'Module Name',
    default: path.basename(process.cwd())
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
  var meta = this.config.meta;
  if(meta) {
    prompts.forEach(function(val) {
      if( meta[val.name] && configKeys.indexOf(val.name) != -1) {
        val.default = meta[val.name];
      }
    }.bind(this));
  }

  this.prompt(prompts, function (props) {
    this.slugname = this._.slugify(props.name);
    this.safeSlugname = this.slugname.replace(
      /-([a-z])/g,
      function (g) { return g[1].toUpperCase(); }
    );

    // Store the entered values in the prompt
    configKeys.forEach(function(val) {
      if(props[val]) {

        if(!this.config.meta) {
          this.config.meta = {};
        }

        this.config.meta[val] = props[val];
      }
    }.bind(this));
    this.writeFileFromString(JSON.stringify(this.config, '', 2), this.configPath);

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

};

NodeGenerator.prototype.askForModules = function askForModules() {
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
    }]
  }];

  this.config.dependencies.forEach(function (pkg) {
    prompts[0].choices.push({
      value: pkg.name,
      name: util.format('%s (%s)', pkg.name, pkg.description),
      checked: true
    });
  });

  this.prompt(prompts, function (props) {

    var hasMod = function (mod) { return props.modules.indexOf(mod) !== -1; };

    this.jscsModule = hasMod('jscsModule');
    this.releaseModule = hasMod('releaseModule');
    this.istanbulModule = hasMod('istanbulModule');
    this.coverallsModule = true;

    this.usedDependencies = {};
    this.config.dependencies.forEach(function (dep) {
      if (hasMod(dep.name)) {
        this.usedDependencies[dep.name] = 'latest';
      }
    }.bind(this));

    if (this.istanbulModule) {

      var promptCoveralls = [{
        type: 'confirm',
        name: 'coverallsModule',
        message: 'Would you like add coveralls',
        default: true
      }];

      this.prompt(promptCoveralls, function (props) {
        if (props && props.modules) {
          this.coverallsModule = props.modules.indexOf('coverallsModule') !== -1;
        } else {
          this.coverallsModule = false;
        }
        cb();

      }.bind(this));

    } else {
      cb();
    }

  }.bind(this));

};

NodeGenerator.prototype.askForDependencies = function askForDependencies() {
  var cb = this.async();

  var prompts = [{
    type: 'checkbox',
    name: 'dependencies',
    message: 'Which dependencies would you like to include?',
    choices: []
  }];

  this.config.dependencies.forEach(function (pkg) {
    prompts[0].choices.push({
      value: pkg.name,
      name: util.format('%s (%s)', pkg.name, pkg.description),
      checked: true
    });
  });

  this.prompt(prompts, function (props) {

    var hasMod = function (mod) { return props.dependencies.indexOf(mod) !== -1; };

    this.usedDependencies = {};
    this.config.dependencies.forEach(function (dep) {
      if (hasMod(dep.name)) {
        this.usedDependencies[dep.name] = 'latest';
      }
    }.bind(this));

    cb();

  }.bind(this));

};

NodeGenerator.prototype.lib = function lib() {
  this.mkdir('lib');
  this.template('lib/name.js', 'lib/' + this.slugname + '.js');
};

NodeGenerator.prototype.test = function test() {
  this.mkdir('test');
  this.template('test/name_test.js', 'test/' + this.slugname + '_test.js');
};

NodeGenerator.prototype.example = function lib() {
  this.mkdir('example');
  this.template('example/simple.js', 'example/simple.js');
};

NodeGenerator.prototype.getLatestVersions = function getLatestVersions() {
  var cb = this.async();
  var count = Object.keys(this.usedDependencies).length;

  if( count === 0 ) {
    return cb();
  }

  for( var packageName in this.usedDependencies ) {
    npmLatest(packageName, {timeout: 1900}, function( err, result ) {
      if( !err && result.name && result.version ) {
        this.usedDependencies[result.name] = result.version;
      }
      if( !--count ) {
        cb();
      }
    }.bind(this))
  }
};

NodeGenerator.prototype.dependency = function dependency() {

  this.dependencies = '';
  for (var name in this.usedDependencies) {
    var version = this.usedDependencies[name];
    this.dependencies += util.format('\n    "%s": "%s",', name, version);
  }
  if(this.dependencies.length > 0) {
    this.dependencies = this.dependencies.replace('\n', '');
    this.dependencies = this.dependencies.substring(0, this.dependencies.length - 1);
  }
}

NodeGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('jshintrc', '.jshintrc');
  this.copy('gitignore', '.gitignore');
  this.copy('travis.yml', '.travis.yml');
  this.copy('editorconfig', '.editorconfig');
  if (this.jscsModule) {
    this.copy('jscs.json', '.jscs.json');
  }

  this.template('README.md');
  this.template('gulpfile.js');
  this.template('_package.json', 'package.json');
};
