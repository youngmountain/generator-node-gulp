'use strict';

var <%= safeSlugname %> = require('../');
var assert = require('should');

describe('<%= safeSlugname %>', function () {

  it('should be awesome', function () {
    <%= safeSlugname %>().should.equal('awesome');
  });

});
