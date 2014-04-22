'use strict';

var util = require('util');
var yeoman = require('yeoman-generator');
var Config = require('./config');

var Generator = module.exports = function Generator() {
  yeoman.generators.Base.apply(this, arguments);

  this.config = new Config();
};

util.inherits(Generator, yeoman.generators.Base);
