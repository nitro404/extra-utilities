# Extra Utilities

[![NPM version][npm-version-image]][npm-url]
[![Build Status][build-status-image]][build-status-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![Downloads][npm-downloads-image]][npm-url]

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

[npm-url]: https://www.npmjs.com/package/extra-utilities
[npm-version-image]: https://img.shields.io/npm/v/extra-utilities.svg
[npm-downloads-image]: http://img.shields.io/npm/dm/extra-utilities.svg

[build-status-url]: https://travis-ci.org/nitro404/extra-utilities
[build-status-image]: https://travis-ci.org/nitro404/extra-utilities.svg?branch=master

[coverage-url]: https://coveralls.io/github/nitro404/extra-utilities?branch=master
[coverage-image]: https://coveralls.io/repos/github/nitro404/extra-utilities/badge.svg?branch=master

[snyk-url]: https://snyk.io/test/github/nitro404/extra-utilities?targetFile=package.json
[snyk-image]: https://snyk.io/test/github/nitro404/extra-utilities/badge.svg?targetFile=package.json
