/*
 * <%= props.name %>
 * <%= props.homepage %>
 *
 * Copyright (c) <%= currentYear %><% if (props.authorName) { %> <%= props.authorName %><% } %>
 * Licensed under the <%= props.license %> license.
 */

'use strict';

var <%= safeSlugname %> = require('../');

<<<<<<< HEAD
console.log(<%= safeSlugname %>.awesome()); // "awesome"
||||||| merged common ancestors
<%= safeSlugname %>.awesome(); // "awesome"
=======
<%= safeSlugname %>(); // "awesome"
>>>>>>> master
