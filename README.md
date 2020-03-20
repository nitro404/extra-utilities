# Extra Utilities

[![NPM version][npm-version-image]][npm-url]
[![Build Status][build-status-image]][build-status-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Known Vulnerabilities][vulnerabilities-image]][vulnerabilities-url]
[![Dependencies][dependencies-image]][dependencies-url]
[![Downloads][npm-downloads-image]][npm-url]
[![Install Size][install-size-image]][install-size-url]
[![Contributors][contributors-image]][contributors-url]
[![Pull Requests Welcome][pull-requests-image]][pull-requests-url]

A collection of useful helper functions.

## Client-Side Usage

```html
<script src="extra-utilities.js"></script>

<script type="text/javascript">
	utilities.isBoolean(false); // => true
</script>
```

## Server-Side Usage

```javascript
const utilities = require("extra-utilities");

utilities.isBoolean(false); // => true
```

## Installation

To install this module:
```bash
npm install extra-utilities
```

## Building

To build the distribution files for this module:
```bash
npm run build
```
or
```bash
gulp build
```

[npm-url]: https://www.npmjs.com/package/extra-utilities
[npm-version-image]: https://img.shields.io/npm/v/extra-utilities.svg
[npm-downloads-image]: http://img.shields.io/npm/dm/extra-utilities.svg

[build-status-url]: https://travis-ci.org/nitro404/extra-utilities
[build-status-image]: https://travis-ci.org/nitro404/extra-utilities.svg?branch=master

[coverage-url]: https://coveralls.io/github/nitro404/extra-utilities?branch=master
[coverage-image]: https://coveralls.io/repos/github/nitro404/extra-utilities/badge.svg?branch=master

[vulnerabilities-url]: https://snyk.io/test/github/nitro404/extra-utilities?targetFile=package.json
[vulnerabilities-image]: https://snyk.io/test/github/nitro404/extra-utilities/badge.svg?targetFile=package.json

[dependencies-url]: https://david-dm.org/nitro404/extra-utilities
[dependencies-image]: https://img.shields.io/david/nitro404/extra-utilities.svg

[install-size-url]: https://packagephobia.now.sh/result?p=extra-utilities
[install-size-image]: https://badgen.net/packagephobia/install/extra-utilities

[contributors-url]: https://github.com/nitro404/extra-utilities/graphs/contributors
[contributors-image]: https://img.shields.io/github/contributors/nitro404/extra-utilities.svg

[pull-requests-url]: https://github.com/nitro404/extra-utilities/pulls
[pull-requests-image]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
