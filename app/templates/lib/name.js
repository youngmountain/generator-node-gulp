/*
 * <%= props.name %>
 * <%= props.homepage %>
 *
 * Copyright (c) <%= currentYear %><% if (props.authorName) { %> <%= props.authorName %><% } %>
 * Licensed under the <%= props.license %> license.
 */

'use strict';

module.exports = function() {
  return 'awesome';
};
