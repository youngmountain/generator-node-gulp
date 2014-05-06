# Node Generator with Gulp
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image] [![Coverage Status][coveralls-image]][coveralls-url]

> Based of [generator-node](https://github.com/yeoman/generator-node)

This generator creates a new Node.js module, generating all the boilerplate you need to get started with best-of-breed form the gulp ecosystem. The generator also optionally installs additional gulp plugins, ee the list below.



## Installation

Install the generator by running: `npm install -g generator-node-gulp`.



## Features

- Customize dependencies prompt by editing the ```settings.json``` file [see](#dependencies).
- Prefill prompt with the last used values for
  - GitHub username
  - Author's Name
  - Author's Email
  - Author's Homepage

### devDependencies

- Mocha Unit Testing with [gulp-mocha](https://github.com/sindresorhus/gulp-mocha)
- Automagically lint your code with [gulp-jshint](https://github.com/spenceralger/gulp-jshint)
- Optional – Check JavaScript code style with [gulp-jscs](https://github.com/sindresorhus/gulp-jscs)
- Optional – Measuring code coverage with [gulp-istanbul](https://github.com/SBoudrias/gulp-istanbul)
- Optional – Upload LCOV data to [coveralls.io](http://coveralls.io) with [coveralls](https://github.com/cainus/node-coveralls)
- Optional – Bump npm versions with [gulp-bump](https://github.com/stevelacy/gulp-bump)

### dependencies

You can customize the dependencies prompt with your preferred one by editing the ```settings.json```. The file is located in the root of the generator-node-gulp ```/usr/local/lib/node_modules/generator-node-gulp/```.

- [debug](https://github.com/visionmedia/debug)
- [Lo-Dash](http://lodash.com/)
- [q](https://github.com/kriskowal/q)

### settings.json

By default, the file looks something like this.

```
{
  "meta": {
    "githubUsername": "stefanbuck",
    "authorName": "Stefan Buck",
    "authorEmail": "me@stefanbuck.com",
    "authorUrl": "www.stefanbuck.com"
  },
  "dependencies": [
    {
      "name": "lodash",
      "description": "A utility library"
    },
    {
      "name": "q",
      "description": "A library for promises"
    },
    {
      "name": "debug",
      "description": "tiny node.js debugging utility"
    }
  ]
}
```


## Usage

At the command-line, cd into an empty directory, run this command and follow the prompts.

```
yo node-gulp
```

_Note that this template will generate files in the current directory, so be sure to change to a new directory first if you don't want to overwrite existing files._



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
