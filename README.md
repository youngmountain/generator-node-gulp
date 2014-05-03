# Node Generator with Gulp
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image] [![Coverage Status][coveralls-image]][coveralls-url]

> Based of [generator-node](https://github.com/yeoman/generator-node)

This generator creates a new Node.js module, generating all the boilerplate you need to get started with best-of-breed form the gulp ecosystem. The generator also optionally installs additional gulp plugins, ee the list below.



## Installation

Install the generator by running: `npm install -g generator-node-gulp`.



## Usage

At the command-line, cd into an empty directory, run this command and follow the prompts.

```
yo node-gulp
```

_Note that this template will generate files in the current directory, so be sure to change to a new directory first if you don't want to overwrite existing files._




## Features

The following plugins will be installed by the generator.

### devDependencies

- [gulp](http://gulpjs.com/)
- [gulp-mocha](https://github.com/sindresorhus/gulp-mocha)
- [gulp-jshint](https://github.com/spenceralger/gulp-jshint)
- [gulp-bump](https://github.com/stevelacy/gulp-bump) (optional)
- [gulp-jscs](https://github.com/sindresorhus/gulp-jscs) (optional)
- [gulp-istanbul](https://github.com/SBoudrias/gulp-istanbul) (optional)
- [coveralls](https://github.com/cainus/node-coveralls) (optional)

### dependencies

- [debug](https://github.com/visionmedia/debug) (optional)
- [Lo-Dash](http://lodash.com/) (optional)
- [q](https://github.com/kriskowal/q) (optional)



## Support

Should you have any problems or wishes for improvements, feel free to open up an [issue](https://github.com/stefanbuck/github-linker).



## Authors
- [Stefan Buck](https://github.com/stefanbuck)
- [Kentaro Wakayama](https://github.com/kwakayama)



## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/generator-node-gulp
[npm-image]: https://badge.fury.io/js/generator-node-gulp.svg
[travis-url]: https://travis-ci.org/stefanbuck/generator-node-gulp
[travis-image]: https://travis-ci.org/stefanbuck/generator-node-gulp.svg?branch=master
[daviddm-url]: https://david-dm.org/stefanbuck/generator-node-gulp.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/stefanbuck/generator-node-gulp
[coveralls-url]: https://coveralls.io/r/stefanbuck/generator-node-gulp
[coveralls-image]: https://coveralls.io/repos/stefanbuck/generator-node-gulp/badge.png