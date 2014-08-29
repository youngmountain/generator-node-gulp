'use strict';

var <%= safeSlugname %> = require('../');<% if (testFramework === 'mocha') { %>
var assert = require('should');<% } %>

describe('<%= safeSlugname %>', function () {

  it('should be awesome', function () {<% if (testFramework === 'jasmine') { %>
    expect(<%= safeSlugname %>()).toEqual('awesome');<% } %><% if (testFramework === 'mocha') { %>
    <%= safeSlugname %>().should.equal('awesome');<% } %>
  });

});
