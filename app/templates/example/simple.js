/*
 * <%= props.name %>
 * <%= props.homepage %>
 *
 * Copyright (c) <%= currentYear %> <%= props.authorName %>
 * Licensed under the <%= props.license %> license.
 */

'use strict';

// Nodejs libs.
// External libs.
// Internal libs.

var <%= safeSlugname %> = require('<%= slugname %>');

<%= safeSlugname %>.awesome(); // "awesome"
