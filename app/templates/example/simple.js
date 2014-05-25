/*
 * <%= props.name %>
 * <%= props.homepage %>
 *
 * Copyright (c) <%= currentYear %><% if (props.authorName) { %> <%= props.authorName %><% } %>
 * Licensed under the <%= props.license %> license.
 */

'use strict';

// Following the 'Node.js require(s) best practices' by
// http://www.mircozeiss.com/node-js-require-s-best-practices/

// // Nodejs libs
// var fs = require('fs'),
//
// // External libs
// debug = require('debug'),
//
// // Internal libs
// data = require('./data.js');

var <%= safeSlugname %> = require('../');

<%= safeSlugname %>.awesome(); // "awesome"
