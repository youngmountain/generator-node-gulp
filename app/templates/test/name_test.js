'use strict';

var <%= safeSlugname %> = require('../lib/<%= slugname %>.js');<% if (testFramework === 'mocha') { %>
var assert = require('should');<% } %>

describe('<%= safeSlugname %>', function () {

  it('should be awesome', function () {<% if (testFramework === 'jasmine') { %>
    expect(<%= safeSlugname %>.awesome()).toEqual('awesome');<% } %><% if (testFramework === 'mocha') { %>
    <%= safeSlugname %>.awesome().should.equal('awesome');<% } %>
  });

});
