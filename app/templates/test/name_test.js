'use strict';

var <%= safeSlugname %> = require('../lib/<%= slugname %>.js');
var assert = require('should');

describe('<%= safeSlugname %>', function () {

  it('should be awesome', function () {
    <%= safeSlugname %>.awesome().should.equal('awesome');
  });

});
