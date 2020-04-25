"use strict";

if(typeof require !== "undefined") {
	if(typeof changeCase === "undefined") {
		global.changeCase = require("change-case-bundled");
	}
}

/**
 * @module utilities
 */
var utilities = { };

var regExpFlags = {
	global: "g",
	multiline: "m",
	ignoreCase: "i",
	sticky: "y",
	unicode: "u"
};

var formatTypes = ["boolean", "bool", "integer", "int", "float", "number", "string", "object", "array", "date", "regex", "regexp", "regularexpression", "function", "func"];

var stringCaseFunctions = {
	camel: changeCase.camelCase,
	capital: changeCase.capitalCase,
	constant: changeCase.constantCase,
	dot: changeCase.dotCase,
	header: changeCase.headerCase,
	lower: changeCase.lowerCase,
	lowerFirst: changeCase.lowerCaseFirst,
	no: changeCase.noCase,
	param: changeCase.paramCase,
	pascal: changeCase.pascalCase,
	path: changeCase.pathCase,
	sentence: changeCase.sentenceCase,
	snake: changeCase.snakeCase,
	sponge: changeCase.spongeCase,
	swap: changeCase.swapCase,
	title: changeCase.titleCase,
	upper: changeCase.upperCase,
	upperFirst: changeCase.upperCaseFirst
};

/**
 * Checks that the specified value is not null or undefined.
 *
 * @function isValid
 * @param {any} value - The value to check.
 * @returns {boolean} A value of true if the specified value is not null or undefined, otherwise false.
 * @see {@link module:utilities.isInvalid|isInvalid}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.isValid(42)); // true
 * console.log(utilities.isValid(null)); // false
 */
utilities.isValid = function isValid(value) {
	return value !== undefined && value !== null;
};

/**
 * Checks if the specified value is null or undefined.
 *
 * @function isInvalid
 * @param {any} value - The value to check.
 * @returns {boolean} A value of true if the specified value is null or undefined, otherwise false.
 * @see {@link module:utilities.isValid|isValid}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.isInvalid(69)); // false
 * console.log(utilities.isInvalid(undefined)); // true
 */
utilities.isInvalid = function isInvalid(value) {
	return value === undefined || value === null;
};

/**
 * Checks if the specified value is a boolean.
 *
 * @function isBoolean
 * @param {any} value - The value to check.
 * @param {boolean} [allowObjects=false] - Will allow Boolean objects to be treated as valid values.
 * @returns {boolean} A value of true if the specified value is a boolean, otherwise false.
 * @see {@link module:utilities.parseBoolean|parseBoolean}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.isBoolean(false)); // true
 * console.log(utilities.isBoolean(8675309)); // false
 * console.log(utilities.isBoolean(new Boolean(true))); // false
 * console.log(utilities.isBoolean(new Boolean(false), true)); // true
 */
utilities.isBoolean = function isBoolean(value, allowObjects) {
	return value === true || value === false || (!!allowObjects && value instanceof Boolean);
};

/**
 * Checks that that the specified value is a valid number.
 * Values of NaN, +/- Infinity and Number objects are not considered to be valid numbers.
 *
 * @function isValidNumber
 * @param {any} value - The value to check.
 * @returns {boolean} A value of true if the specified value is a valid number, otherwise false.
 * @see {@link module:utilities.isInvalidNumber|isInvalidNumber}
 * @see {@link module:utilities.parseInteger|parseInteger}
 * @see {@link module:utilities.parseFloat|parseFloat}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.isValidNumber(1337)); // true
 * console.log(utilities.isValidNumber(-3.141592654)); // true
 * console.log(utilities.isValidNumber("32767")); // false
 * console.log(utilities.isValidNumber(new Number(65534))); // false
 * console.log(utilities.isValidNumber(NaN)); // false
 * console.log(utilities.isValidNumber(-Infinity)); // false
 */
utilities.isValidNumber = function isValidNumber(value) {
	return typeof value === "number" && !isNaN(value) && value !== -Infinity && value !== Infinity;
};

/**
 * Checks if the specified value is not a valid number.
 * Values of NaN, +/- Infinity and Number objects are also not considered to be valid numbers.
 *
 * @function isInvalidNumber
 * @param {any} value - The value to check.
 * @returns {boolean} A value of true if the specified value is not a valid number, otherwise false.
 * @see {@link module:utilities.isValidNumber|isValidNumber}
 * @see {@link module:utilities.parseInteger|parseInteger}
 * @see {@link module:utilities.parseFloat|parseFloat}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.isInvalidNumber(7331)); // false
 * console.log(utilities.isInvalidNumber(-2.718281828459045)); // false
 * console.log(utilities.isInvalidNumber("7")); // true
 * console.log(utilities.isInvalidNumber(new Number(65534))); // true
 * console.log(utilities.isInvalidNumber(NaN)); // true
 * console.log(utilities.isInvalidNumber(Infinity)); // true
 */
utilities.isInvalidNumber = function isInvalidNumber(value) {
	return typeof value !== "number" || isNaN(value) || value === -Infinity || value === Infinity;
};

/**
 * Checks if the specified value is an integer either represented in a number type, string type or optionally a Number object.
 *
 * @function isInteger
 * @param {any} value - The value to check.
 * @param {boolean} [allowObjects=true] - Will allow Number objects to be treated as valid values.
 * @returns {boolean} A value of true if the specified value is an integer, otherwise false.
 * @see {@link module:utilities.isValidNumber|isValidNumber}
 * @see {@link module:utilities.isInvalidNumber|isInvalidNumber}
 * @see {@link module:utilities.isFloat|isFloat}
 * @see {@link module:utilities.parseInteger|parseInteger}
 * @see {@link module:utilities.parseFloat|parseFloat}
 * @since 1.3.7
 * @memberOf module:utilities
 * @example
 * console.log(utilities.isInteger(7)); // true
 * console.log(utilities.isInteger(133.7)); // false
 * console.log(utilities.isInteger("420")); // true
 * console.log(utilities.isInteger("6.9")); // false
 * console.log(utilities.isInteger(new Number(64))); // true
 * console.log(utilities.isInteger(new Number(3.2))); // false
 * console.log(utilities.isInteger(null)); // false
 */
utilities.isInteger = function isInteger(value, allowObjects) {
	if(Number.isInteger(value)) {
		return true;
	}

	if(value instanceof Number && utilities.parseBoolean(allowObjects, true)) {
		return Number.isInteger(value.valueOf());
	}

	if(typeof value !== "string") {
		return false;
	}

	return !!value.match(/^([+-]?[1-9][0-9]*|0)$/);
};

/**
 * Checks if the specified value is a floating point number either represented in a number type, string type or optionally a Number object.
 * Integer values are also considered to be floating point numbers.
 *
 * @function isFloat
 * @param {any} value - The value to check.
 * @param {boolean} [allowObjects=true] - Will allow Number objects to be treated as valid values.
 * @returns {boolean} A value of true if the specified value is a floating point number, otherwise false.
 * @see {@link module:utilities.isValidNumber|isValidNumber}
 * @see {@link module:utilities.isInvalidNumber|isInvalidNumber}
 * @see {@link module:utilities.isInteger|isInteger}
 * @see {@link module:utilities.parseInteger|parseInteger}
 * @see {@link module:utilities.parseFloat|parseFloat}
 * @since 1.3.7
 * @memberOf module:utilities
 * @example
 * console.log(utilities.isInteger(7)); // true
 * console.log(utilities.isInteger(133.7)); // true
 * console.log(utilities.isInteger("420")); // true
 * console.log(utilities.isInteger("6.9")); // true
 * console.log(utilities.isInteger(new Number(64))); // true
 * console.log(utilities.isInteger(new Number(3.2))); // true
 * console.log(utilities.isInteger(null)); // false
 */
utilities.isFloat =  function isFloat(value, allowObjects) {
	if(typeof value === "number") {
		return !isNaN(value) && isFinite(value);
	}

	if(value instanceof Number && utilities.parseBoolean(allowObjects, true)) {
		return true;
	}

	if(typeof value !== "string") {
		return false;
	}

	return !!value.match(/^([+-]?(((([1-9][0-9]*|0)?\.)[0-9]+)|([1-9][0-9]*|0)))$/);
};

/**
 * Checks if the specified value is an empty string.
 * By default this will also trim strings and consider values which only contain whitespace, as well as non-string values to also be empty strings.
 *
 * @function isEmptyString
 * @param {any} value - The value to check.
 * @param {boolean} [trim=true] - Determines if the value should be trimmed before checking if it is empty.
 * @returns {boolean} A value of true if the specified value is not a string, or is a string and is empty or only contains whitespace characters if trim is set to true.
 * @see {@link module:utilities.isNonEmptyString|isNonEmptyString}
 * @see {@link module:utilities.trimString|trimString}
 * @see {@link module:utilities.trimNullTerminatedString|trimNullTerminatedString}
 * @see {@link module:utilities.trimWhitespace|trimWhitespace}
 * @see {@link module:utilities.trimTrailingNewlines|trimTrailingNewlines}
 * @see {@link module:utilities.replaceNonBreakingSpaces|replaceNonBreakingSpaces}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.isEmptyString("")); // true
 * console.log(utilities.isEmptyString("\t")); // true
 * console.log(utilities.isEmptyString("Door stuck!")); // false
 * console.log(utilities.isEmptyString("   ", false)); // false
 * console.log(utilities.isEmptyString(null)); // true
 * console.log(utilities.isEmptyString([])); // true
 * console.log(utilities.isEmptyString(NaN)); // true
 */
utilities.isEmptyString = function isEmptyString(value, trim) {
	return typeof value !== "string" || (utilities.parseBoolean(trim, true) ? value.trim().length === 0 : value.length === 0);
};

/**
 * Checks if the specified value is a non-empty string.
 * By default this will also trim strings and consider values which only contain whitespace to be empty strings.
 *
 * @function isNonEmptyString
 * @param {any} value - The value to check.
 * @param {boolean} [trim=true] - Determines if the value should be trimmed before checking if it is not empty.
 * @returns {boolean} A value of false if the specified value is not a string, or is a string and is empty or only contains whitespace characters if trim is set to true.
 * @see {@link module:utilities.isEmptyString|isEmptyString}
 * @see {@link module:utilities.trimString|trimString}
 * @see {@link module:utilities.trimNullTerminatedString|trimNullTerminatedString}
 * @see {@link module:utilities.trimWhitespace|trimWhitespace}
 * @see {@link module:utilities.trimTrailingNewlines|trimTrailingNewlines}
 * @see {@link module:utilities.replaceNonBreakingSpaces|replaceNonBreakingSpaces}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.isNonEmptyString("")); // false
 * console.log(utilities.isNonEmptyString("\t")); // false
 * console.log(utilities.isNonEmptyString("Door stuck!")); // true
 * console.log(utilities.isNonEmptyString("   ", false)); // true
 * console.log(utilities.isNonEmptyString(null)); // false
 * console.log(utilities.isNonEmptyString([])); // false
 * console.log(utilities.isNonEmptyString(NaN)); // false
 */
utilities.isNonEmptyString = function isNonEmptyString(value, trim) {
	return typeof value === "string" && (utilities.parseBoolean(trim, true) ? value.trim().length !== 0 : value.length !== 0);
};

/**
 * Checks if the specified value is an object.
 * Functions and values of null are not considered to be real objects.
 * Any object which inherits from object will yield a result of true unless strict is set to true.
 *
 * @function isObject
 * @param {any} value - The value to check.
 * @param {boolean} [strict=false] - Only consider values which have Object for a constructor as objects when checking the value.
 * @returns {boolean} A value of true if the specified value is an object, otherwise false if it inhertis from object and strict is set to true, or it is any other value type.
 * @see {@link module:utilities.isObjectStrict|isObjectStrict}
 * @see {@link module:utilities.isEmptyObject|isEmptyObject}
 * @see {@link module:utilities.isNonEmptyObject|isNonEmptyObject}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.isObject({ please: "ignore" })); // true
 * console.log(utilities.isObject(new Object())); // true
 * console.log(utilities.isObject([1, 2, 3])); // true
 * console.log(utilities.isObject(new Date())); // true
 * console.log(utilities.isObject(new Date(), true)); // false
 * console.log(utilities.isObject(function() { })); // false
 * console.log(utilities.isObject(null)); // false
 */
utilities.isObject = function isObject(value, strict) {
	return value !== undefined && (strict ? value !== null && value.constructor === Object : value instanceof Object && !(value instanceof Function));
};

/**
 * Checks if the specified value is a strict object by checking that the value's constructor is Object.
 * Functions and values of null are not considered to be strict objects.
 * Any object which inherits from object will yield a result of false.
 *
 * @function isObjectStrict
 * @param {any} value - The value to check.
 * @returns {boolean} A value of true if the specified value is an object and has Object for a constructor, otherwise false for any other value.
 * @see {@link module:utilities.isObjectStrict|isObjectStrict}
 * @see {@link module:utilities.isEmptyObject|isEmptyObject}
 * @see {@link module:utilities.isNonEmptyObject|isNonEmptyObject}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.isObjectStrict({ foo: "bar" })); // true
 * console.log(utilities.isObjectStrict(new Object())); // true
 * console.log(utilities.isObjectStrict(["a", "b", "c"])); // false
 * console.log(utilities.isObjectStrict(new Error("?"))); // false
 * console.log(utilities.isObjectStrict(function() { })); // false
 * console.log(utilities.isObjectStrict(null)); // false
 */
utilities.isObjectStrict = function isObjectStrict(value) {
	return value !== undefined && value !== null && value.constructor === Object;
};

/**
 * Checks if the specified value is an object and does not contain any enumerable properties.
 * Values which are not strict objects regardless of how many enumerable properties they have will always result in a value of false.
 *
 * @function isEmptyObject
 * @param {any} value - The value to check.
 * @returns {boolean} A value of true if the specified value is a strict object with no enumerable properties, otherwise false for any other value.
 * @see {@link module:utilities.isObject|isObject}
 * @see {@link module:utilities.isObjectStrict|isObjectStrict}
 * @see {@link module:utilities.isNonEmptyObject|isNonEmptyObject}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.isEmptyObject({ })); // true
 * console.log(utilities.isEmptyObject(new Object())); // true
 * console.log(utilities.isEmptyObject({ example: "data" })); // false
 * console.log(utilities.isEmptyObject(new Map())); // false
 * console.log(utilities.isEmptyObject(new Error())); // false
 * console.log(utilities.isEmptyObject(function() { })); // false
 * console.log(utilities.isEmptyObject(null)); // false
 */
utilities.isEmptyObject = function isEmptyObject(value) {
	return value !== undefined && value !== null && value.constructor === Object && Object.keys(value).length === 0;
};

/**
 * Checks if the specified value is an object and contains at least one enumerable property.
 * Values which are not strict objects regardless of how many properties they have will always result in a value of false.
 *
 * @function isNonEmptyObject
 * @param {any} value - The value to check.
 * @returns {boolean} A value of true if the specified value is a strict object with at least one enumerable property, otherwise false for any other value or strict object with no enumerable properties.
 * @see {@link module:utilities.isObject|isObject}
 * @see {@link module:utilities.isObjectStrict|isObjectStrict}
 * @see {@link module:utilities.isEmptyObject|isEmptyObject}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.isEmptyObject({ })); // false
 * console.log(utilities.isEmptyObject(new Object())); // false
 * console.log(utilities.isEmptyObject({ example: "data" })); // true
 * console.log(utilities.isEmptyObject(new Map())); // false
 * console.log(utilities.isEmptyObject(new Error())); // false
 * console.log(utilities.isEmptyObject(function() { })); // false
 * console.log(utilities.isEmptyObject(null)); // false
 */
utilities.isNonEmptyObject = function isNonEmptyObject(value) {
	return value !== undefined && value !== null && value.constructor === Object && Object.keys(value).length !== 0;
};

/**
 * Checks if the specified value is an array and contains no items.
 * Values which are not arrays will always result in a value of false.
 *
 * @function isEmptyArray
 * @param {any} value - The value to check.
 * @returns {boolean} A value if true if the specified value is an array and does not contain any items, otherwise false for any other value.
 * @see {@link module:utilities.isNonEmptyArray|isNonEmptyArray}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.isEmptyArray([])); // true
 * console.log(utilities.isEmptyArray(new Array())); // true
 * console.log(utilities.isEmptyArray([null])); // false
 * console.log(utilities.isEmptyArray({ })); // false
 * console.log(utilities.isEmptyArray(null)); // false
 */
utilities.isEmptyArray = function isEmptyArray(value) {
	return Array.isArray(value) ? value.length === 0 : true;
};

/**
 * Checks if the specified value is an array and contains at least one item.
 * Values which are not arrays will always result in a value of false.
 *
 * @function isNonEmptyArray
 * @param {any} value - The value to check.
 * @returns {boolean} A value if true if the specified value is an array and contains at least one item, otherwise false for any other value.
 * @see {@link module:utilities.isEmptyArray|isEmptyArray}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.isEmptyArray([])); // false
 * console.log(utilities.isEmptyArray(new Array())); // false
 * console.log(utilities.isEmptyArray([null])); // true
 * console.log(utilities.isEmptyArray([4, 2, 0])); // true
 * console.log(utilities.isEmptyArray({ })); // false
 * console.log(utilities.isEmptyArray(null)); // false
 */
utilities.isNonEmptyArray = function isNonEmptyArray(value) {
	return Array.isArray(value) && value.length !== 0;
};

/**
 * Checks if the specified value is an instance of the Date object.
 *
 * @function isDate
 * @param {any} value - The value to check.
 * @returns {boolean} A value of true if the specified value is a Date object instance, otherwise false for any other value.
 * @see {@link module:utilities.parseDate|parseDate}
 * @see {@link module:utilities.compareDates|compateDates}
 * @since 1.1.1
 * @memberOf module:utilities
 * @example
 * console.log(utilities.isDate(new Date())); // true
 * console.log(utilities.isDate("June 18")); // false
 * console.log(utilities.isDate(null)); // false
 */
utilities.isDate = function isDate(value) {
	return value instanceof Date;
};

/**
 * Checks if the specified value is an instance of the Error object.
 *
 * @function isError
 * @param {any} value - The value to check.
 * @returns {boolean} A value of true if the specified value is an Error object instance, otherwise false for any other value.
 * @since 1.2.2
 * @memberOf module:utilities
 * @example
 * console.log(utilities.isError(new Error("Oops."))); // true
 * console.log(utilities.isError(new SyntaxError("Unknown!"))); // true
 * console.log(utilities.isError(new DOMException("System failure.", "AbortError"))); // true
 * console.log(utilities.isError({ message: "fake" })); // false
 * console.log(utilities.isError(null)); // false
 */
utilities.isError = function isError(value) {
	return value instanceof Error;
};

/**
 * Checks if the specified value is an instance of the RegExp object.
 *
 * @function isRegularExpression
 * @param {any} value - The value to check.
 * @returns {boolean} A value of true if the specified value is a RegExp object instance, otherwise false for any other value.
 * @see {@link module:utilities.parseRegularExpression|parseRegularExpression}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.isRegularExpression(/te|st/gmi)); // true
 * console.log(utilities.isRegularExpression(new RegExp("https?"))); // true
 * console.log(utilities.isRegularExpression("/hi/")); // false
 * console.log(utilities.isRegularExpression({ }})); // false
 * console.log(utilities.isRegularExpression(null)); // false
 */
utilities.isRegularExpression = function isRegularExpression(value) {
	return value instanceof RegExp;
};

/**
 * Checks if the specified value is an instance of the Function object.
 *
 * @function isFunction
 * @param {any} value - The value to check.
 * @returns {boolean} A value of true if the specified value is a Function object instance, otherwise false for any other value.
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.isFunction(function() { })); // true
 * console.log(utilities.isFunction(console.log)); // true
 * console.log(utilities.isFunction({ })); // false
 * console.log(utilities.isFunction({ })); // false
 */
utilities.isFunction = function isFunction(value) {
	return value instanceof Function;
};

/**
 * Checks if a specified string value starts with the corresponding comment notation.
 * Any whitespace characters at the start of the string will be ignored.
 * Empty and non-string values will always result in a value of false being returned.
 *
 * @function isComment
 * @param {string} value - The value to check.
 * @param {string} [comment="//"] - The comment notation string, can be one or more characters.
 * @returns {boolean} A value of true if the specified value is a string and begins with the corresponding comment notation.
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.isComment("// test comment, please ignore")); // true
 * console.log(utilities.isComment("# another comment")); // false
 * console.log(utilities.isComment("# valid comment", "#")); // true
 * console.log(utilities.isComment("some text")); // false
 * console.log(utilities.isComment("")); // false
 * console.log(utilities.isComment(null)); // false
 */
utilities.isComment = function isComment(value, comment) {
	if(utilities.isEmptyString(value)) {
		return false;
	}

	if(utilities.isEmptyString(comment)) {
		comment = "//";
	}

	var commentStartIndex = -1;

	for(var i = 0; i < value.length; i++) {
		if(value[i] === " " || value[i] == "\t") {
			continue;
		}

		if(value[i] == comment[0]) {
			commentStartIndex = i;
			break;
		}
		else {
			return false;
		}
	}

	if(commentStartIndex < 0 || value.length - commentStartIndex < comment.length) {
		return false;
	}

	for(var i = commentStartIndex; i < value.length; i++) {
		if(i - commentStartIndex >= comment.length) {
			break;
		}

		if(value[i] != comment[i - commentStartIndex]) {
			return false;
		}
	}

	return true;
};

/**
 * Checks if an object is visible or not.
 * A value which is not an object is not considered to be visible.
 * A property named visible with a boolean value of true or function returning true is considered to be visible.
 * If there is no property named visible, but a property named hidden is present with a boolean value of false or function returning false, the object is considered to be visible.
 * If the value does not contain either a visible or hidden property, it is considered to be visible.
 *
 * @function isVisible
 * @param {object} element - The element to check.
 * @returns {boolean} Returns a value of true if the object is determined to be visible.
 * @deprecated Determined to no longer be useful, will be removed in a future release.
 * @see {@link module:utilities.isHidden|isHidden}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.isVisible({ visible: true })); // true
 * console.log(utilities.isVisible({ visible: function() { return true; } })); // true
 * console.log(utilities.isVisible({ hidden: false })); // true
 * console.log(utilities.isVisible({ hidden: function() { return false; } })); // true
 * console.log(utilities.isVisible({ })); // false
 * console.log(utilities.isVisible(null)); // false
 */
utilities.isVisible = function isVisible(element) {
	if(!utilities.isObject(element)) {
		return false;
	}

	if(utilities.isBoolean(element.visible)) {
		return element.visible;
	}
	else if(utilities.isFunction(element.visible)) {
		return element.visible();
	}
	else if(utilities.isBoolean(element.hidden)) {
		return !element.hidden;
	}
	else if(utilities.isFunction(element.hidden)) {
		return !element.hidden();
	}

	return true;
};

/**
 * Checks if an object is hidden or not.
 * A value which is not an object is considered to be hidden.
 * A property named hidden with a boolean value of true or function returning true is considered to be hidden.
 * If there is no property named hidden, but a property named hidden is present with a boolean value of false or function returning false, the object is considered to be hidden.
 * If the value does not contain either a visible or hidden property, it is not considered to be hidden.
 *
 * @function isHidden
 * @param {object} element - The element to check.
 * @returns {boolean} Returns a value of true if the object is determined to be hidden.
 * @deprecated Determined to no longer be useful, will be removed in a future release.
 * @see {@link module:utilities.isVisible|isVisible}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.isHidden({ hidden: true })); // true
 * console.log(utilities.isHidden({ hidden: function() { return true; } })); // true
 * console.log(utilities.isHidden({ visible: false })); // true
 * console.log(utilities.isHidden({ visible: function() { return false; } })); // true
 * console.log(utilities.isHidden({ })); // false
 * console.log(utilities.isHidden(null)); // true
 */
utilities.isHidden = function isHidden(element) {
	if(!utilities.isObject(element)) {
		return true;
	}

	if(utilities.isBoolean(element.visible)) {
		return !element.visible;
	}
	else if(utilities.isFunction(element.visible)) {
		return !element.visible();
	}
	else if(utilities.isBoolean(element.hidden)) {
		return element.hidden;
	}
	else if(utilities.isFunction(element.hidden)) {
		return element.hidden();
	}

	return false;
};

/**
 * Checks if an object is enabled or not.
 * A value which is not an object is not considered to be enabled.
 * A property named enabled with a boolean value of true or function returning true is considered to be enabled.
 * If there is no property named enabled, but a property named disabled is present with a boolean value of false or function returning false, the object is considered to be enabled.
 * If the value does not contain either a enabled or disabled property, it is considered to be enabled.
 *
 * @function isEnabled
 * @param {object} element - The element to check.
 * @returns {boolean} Returns a value of true if the object is determined to be enabled.
 * @deprecated Determined to no longer be useful, will be removed in a future release.
 * @see {@link module:utilities.isDisabled|isDisabled}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.isEnabled({ enabled: true })); // true
 * console.log(utilities.isEnabled({ enabled: function() { return true; } })); // true
 * console.log(utilities.isEnabled({ disabled: false })); // true
 * console.log(utilities.isEnabled({ disabled: function() { return false; } })); // true
 * console.log(utilities.isEnabled({ })); // false
 * console.log(utilities.isEnabled(null)); // false
 */
utilities.isEnabled = function isEnabled(element) {
	if(!utilities.isObject(element)) {
		return false;
	}

	if(utilities.isBoolean(element.enabled)) {
		return element.enabled;
	}
	else if(utilities.isFunction(element.enabled)) {
		return element.enabled();
	}
	else if(utilities.isBoolean(element.disabled)) {
		return !element.disabled;
	}
	else if(utilities.isFunction(element.disabled)) {
		return !element.disabled();
	}

	return true;
};

/**
 * Checks if an object is disabled or not.
 * A value which is not an object is considered to be disabled.
 * A property named disabled with a boolean value of true or function returning true is considered to be disabled.
 * If there is no property named disabled, but a property named disabled is present with a boolean value of false or function returning false, the object is considered to be disabled.
 * If the value does not contain either a enabled or disabled property, it is not considered to be disabled.
 *
 * @function isDisabled
 * @param {object} element - The element to check.
 * @returns {boolean} Returns a value of true if the object is determined to be disabled.
 * @deprecated Determined to no longer be useful, will be removed in a future release.
 * @see {@link module:utilities.isEnabled|isEnabled}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.isDisabled({ disabled: true })); // true
 * console.log(utilities.isDisabled({ disabled: function() { return true; } })); // true
 * console.log(utilities.isDisabled({ enabled: false })); // true
 * console.log(utilities.isDisabled({ enabled: function() { return false; } })); // true
 * console.log(utilities.isDisabled({ })); // false
 * console.log(utilities.isDisabled(null)); // true
 */
utilities.isDisabled = function isDisabled(element) {
	if(!utilities.isObject(element)) {
		return true;
	}

	if(utilities.isBoolean(element.enabled)) {
		return !element.enabled;
	}
	else if(utilities.isFunction(element.enabled)) {
		return !element.enabled();
	}
	else if(utilities.isBoolean(element.disabled)) {
		return element.disabled;
	}
	else if(utilities.isFunction(element.disabled)) {
		return element.disabled();
	}

	return false;
};

/**
 * Case insensitively compares two strings to determine if they are equal.
 *
 * @function equalsIgnoreCase
 * @param {string} stringA - The first string to compare.
 * @param {string} stringB - The second string to compare against
 * @returns {boolean} .A value of true if the strings are case insensitively equal, otherwise false.
 * @since 1.3.2
 * @memberOf module:utilities
 * @example
 * console.log(utilities.equalsIgnoreCase("Test", "TEsT")); // true
 * console.log(utilities.equalsIgnoreCase("lower", "lower")); // true
 * console.log(utilities.equalsIgnoreCase("yes", "ye$")); // false
 * console.log(utilities.equalsIgnoreCase(null, "unknown")); // false
 */
utilities.equalsIgnoreCase = function equalsIgnoreCase(stringA, stringB) {
	if(typeof stringA !== "string" || typeof stringB !== "string") {
		return false;
	}

	return stringA.localeCompare(stringB, undefined, { sensitivity: "accent" }) === 0;
};

/**
 * Parses a boolean from a given value.
 * If no valid boolean value can be determined, defaultValue is returned instead which by default has a value of null.
 * There are many possibilities for valid truthy boolean values including:
 * - true
 * - new Boolean(true)
 * - 1
 * - "1"
 * - "true"
 * - "yes"
 * - "on"
 * - "t"
 * - "y"
 *
 * As well as a number of possibilities for valid falsey boolean values:
 * - false
 * - new Boolean(false)
 * - 0
 * - "0"
 * - "false"
 * - "no"
 * - "off"
 * - "f"
 * - "n"
 *
 * @function parseBoolean
 * @param {any} value - The value to parse into a boolean.
 * @param {(boolean|null)} [defaultValue=null] - The value to return if no valid boolean value can be determined. Specifying a non-boolean value will result in null being used instead.
 * @returns {(boolean|null)} A value of true if a valid truthy value was determined from the specified value, false if a valid falsey value was determined, otherwise the default value is returned. A value of null will be returned if the default value is not specified.
 * @see {@link module:utilities.isBoolean|isBoolean}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.parseBoolean(true)); // true
 * console.log(utilities.parseBoolean("false")); // false
 * console.log(utilities.parseBoolean("yes")); // true
 * console.log(utilities.parseBoolean(1)); // true
 * console.log(utilities.parseBoolean(4)); // null
 * console.log(utilities.parseBoolean("wat")); // null
 * console.log(utilities.parseBoolean("wot", true)); // true
 * console.log(utilities.parseBoolean("huh", 420)); // null
 * console.log(utilities.parseBoolean(null)); // null
 */
utilities.parseBoolean = function parseBoolean(value, defaultValue) {
	if(utilities.isBoolean(value)) {
		return value;
	}

	if(utilities.isBoolean(value, true)) {
		return value.valueOf();
	}

	if(!utilities.isBoolean(defaultValue)) {
		defaultValue = null;
	}

	if(utilities.isInvalid(value)) {
		return defaultValue;
	}

	if(value === 0) {
		return false;
	}
	else if(value === 1) {
		return true;
	}

	if(typeof value !== "string") {
		return defaultValue;
	}

	var formattedValue = value.trim().toLowerCase();

	if(formattedValue.length === 0) {
		return defaultValue;
	}

	if(formattedValue.length === 1) {
		var character = formattedValue.charAt(0);

		if(character === "t" || character === "y") {
			return true;
		}
		else if(character === "f" || character === "n") {
			return false;
		}
		else if(character === "0") {
			return false;
		}
		else if(character === "1") {
			return true;
		}

		return defaultValue;
	}

	if(formattedValue === "true" || formattedValue === "yes" || formattedValue === "on") {
		return true;
	}
	else if(formattedValue === "false" || formattedValue === "no" || formattedValue === "off") {
		return false;
	}

	return defaultValue;
};

/**
 * Parses an integer number from a given value.
 * Accepts number, string and number object values.
 * If no valid integer number can be determined from the specified value, the default value is returned instead.
 *
 * @function parseInteger
 * @param {any} value - The value to parse into a integer number.
 * @param {number} [defaultValue=NaN] - The default value to return if the specified value is not an integer or floating point number.
 * @returns {number} An integer number value if a valid number value was determined from the specified value, otherwise the default value is returned. A value of NaN will be returned if the default value is not specified.
 * @see {@link module:utilities.isValidNumber|isValidNumber}
 * @see {@link module:utilities.isInvalidNumber|isInvalidNumber}
 * @see {@link module:utilities.parseFloat|parseFloat}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.parseInteger(88)); // 88
 * console.log(utilities.parseInteger(-73.31)); // -73
 * console.log(utilities.parseInteger("-15")); // -15
 * console.log(utilities.parseInteger("3.141592654")); // 3
 * console.log(utilities.parseInteger(new Number(4096))); // 4096
 * console.log(utilities.parseInteger(new Number(3.333))); // 3
 * console.log(utilities.parseInteger("wat", 11100101); // 11100101
 * console.log(utilities.parseInteger(null); // NaN
 */
utilities.parseInteger = function parseInteger(value, defaultValue) {
	var newValue = NaN;

	if(typeof value === "number") {
		newValue = parseInt(value);
	}
	else if(typeof value === "string") {
		if(utilities.isFloat(value)) {
			newValue = parseInt(value);
		}
	}
	else if(value instanceof Number) {
		newValue = parseInt(value.valueOf());
	}

	if(utilities.isInvalidNumber(newValue)) {
		defaultValue = parseInt(defaultValue);

		return utilities.isValidNumber(defaultValue) ? defaultValue : NaN;
	}

	return newValue;
};

/**
 * Parses a floating point number from a given value.
 * Accepts number, string and number object values.
 * If no valid floating point number can be determined from the specified value, the default value is returned instead.
 *
 * @function parseFloat
 * @param {any} value - The value to parse into a floating point number.
 * @param {number} [defaultValue=NaN] - The default value to return if the specified value is not a floating point number.
 * @returns {number} A floating point number value if a valid number value was determined from the specified value, otherwise the default value is returned. A value of NaN will be returned if the default value is not specified.
 * @see {@link module:utilities.isValidNumber|isValidNumber}
 * @see {@link module:utilities.isInvalidNumber|isInvalidNumber}
 * @see {@link module:utilities.parseInteger|parseInteger}
 * @since 1.3.7
 * @memberOf module:utilities
 * @example
 * console.log(utilities.parseFloat(-999)); // -999
 * console.log(utilities.parseFloat(13.37)); // 13.37
 * console.log(utilities.parseFloat("51")); // 51
 * console.log(utilities.parseFloat("-867.5309")); // -867.5309
 * console.log(utilities.parseFloat(new Number(-4231))); // -4231
 * console.log(utilities.parseFloat(new Number(9.999))); // 9.999
 * console.log(utilities.parseFloat("wat", 10010101); // 10010101
 * console.log(utilities.parseFloat(null); // NaN
 */
utilities.parseFloat = function parseFloatingPointNumber(value, defaultValue) {
	var newValue = NaN;

	if(typeof value === "number") {
		newValue = value;
	}
	else if(typeof value === "string") {
		if(utilities.isFloat(value)) {
			newValue = parseFloat(value);
		}
	}
	else if(value instanceof Number) {
		newValue = value.valueOf();
	}

	if(utilities.isInvalidNumber(newValue)) {
		return utilities.isValidNumber(defaultValue) ? defaultValue : NaN;
	}

	return newValue;
};

/**
 * Parses a floating point number from a given value.
 * Accepts number, string and number object values.
 * If no valid floating point number can be determined from the specified value, the default value is returned instead.
 *
 * @function parseFloatingPointNumber
 * @param {any} value - The value to parse into a floating point number.
 * @param {number} [defaultValue=NaN] - The default value to return if the specified value is not a floating point number.
 * @returns {number} A floating point number value if a valid number value was determined from the specified value, otherwise the default value is returned. A value of NaN will be returned if the default value is not specified.
 * @deprecated Use utilities.parseFloat instead. Will be removed in a future release.
 * @see {@link module:utilities.parseFloat|parseFloat}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.parseFloatingPointNumber(-1)); // -1
 * console.log(utilities.parseFloatingPointNumber(2.2)); // 1.1
 * console.log(utilities.parseFloatingPointNumber("3")); // 3
 * console.log(utilities.parseFloatingPointNumber("4.4")); // 4.4
 * console.log(utilities.parseFloatingPointNumber(new Number(-5))); // -5
 * console.log(utilities.parseFloatingPointNumber(new Number(6.6))); // 6.6
 * console.log(utilities.parseFloatingPointNumber("nope.avi", 69); // 69
 * console.log(utilities.parseFloatingPointNumber(null); // NaN
 */
utilities.parseFloatingPointNumber = utilities.parseFloat;

/**
 * Parses a date object from a given value.
 * Accepts date object, date string, timestamp number string and timestamp number values.
 * If no valid date object can be determined from the specified value, the default value is returned instead.
 *
 * @function parseDate
 * @param {any} value - The value to parse into a date object.
 * @param {(Date|null)} [defaultValue=null] - The default value to return if the specified value is not a valid date or timestamp.
 * @returns {(Date|null)} A Date object instance if a valid date was determined from the specified value, otherwise the default value is returned. A value of null will be returned if the default value is not specified.
 * @see {@link module:utilities.isDate|isDate}
 * @see {@link module:utilities.compareDates|compateDates}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.parseDate("June 18, 1987 3:30 PM")); // new Date("1987-06-18T19:30:00.000Z")
 * console.log(utilities.parseDate("2018-02-19T06:19:33Z")); // new Date("2018-02-19T06:19:33.000Z")
 * console.log(utilities.parseDate(new Date("2020-03-28T18:52:05.136Z"))); // new Date("2020-03-28T18:52:05.136Z")
 * console.log(utilities.parseDate(1585421525139)); // new Date("2020-03-28T18:52:05.136Z")
 * console.log(utilities.parseDate("1585421525139")); // new Date("2020-03-28T18:52:05.136Z")
 * console.log(utilities.parseDate(-1, new Date(0))); // new Date("1970-01-01T00:00:00.000Z")
 * console.log(utilities.parseDate(-420)); // null
 */
utilities.parseDate = function parseDate(value, defaultValue) {
	if(!utilities.isDate(defaultValue)) {
		defaultValue = null;
	}

	if(typeof value === "number") {
		if(utilities.isInvalidNumber(value) || !Number.isInteger(value) || value < 0) {
			return defaultValue;
		}

		return new Date(parseInt(value));
	}
	else if(typeof value === "string") {
		var formattedValue = value.trim();

		if(formattedValue.length === 0) {
			return defaultValue;
		}

		var timestamp = null;

		if(utilities.isInteger(formattedValue)) {
			timestamp = parseInt(formattedValue);
		}
		else {
			timestamp = Date.parse(formattedValue);
		}

		if(utilities.isInvalidNumber(timestamp)) {
			return defaultValue;
		}

		return new Date(timestamp);
	}
	else if(value instanceof Date) {
		return value;
	}

	return defaultValue;
};

/**
 * Parses a string representation of 12 or 24 hour time into an object with all of the components of the time value represented in both 12 and 24 hour time. The structure of this time object is as follows:
 *
 * ```javascript
 *{
 *	regular: {
 *		raw: <string>, // a string representing the time in 12 hour format
 *		hour: <number>, // the hour component of the time value
 *		minutes: <number>, // the minute component of the time value
 *		period: <string>, // will be "AM" if the time is prior to 12:00 in the afternoon, otherwise "PM"
 *		morning: <boolean> // will be true if the time is prior to 12:00 in the afternoon
 *	},
 *	military: {
 *		raw: <string>, // a string representing the time in 24 hour format
 *		hour: <nubmer>, // the hour component of the time value
 *		minutes: <number> // the minute component of the time value
 *	}
 *}
 *```
 *
 * @function parseTime
 * @param {string} value - A string to parse the time from.
 * @returns {Object} An object representation of the different components of the time string in both 12 and 24 hour time formats.
 * @throws Will throw an error for any invalid time string.
 * @see {@link module:utilities.parseDate|parseDate}
 * @since 1.1.2
 * @memberOf module:utilities
 * @example
 * console.log(utilities.parseTime("6:19 PM"));  // {"regular":{"raw": "6:19 PM","hour":6, "minutes":19,"period":"PM","morning":false},"military":{"raw":"1819","hour":18,"minutes":19}}
 * console.log(utilities.parseTime("04:20"));    // {"regular":{"raw": "4:20 AM","hour":4, "minutes":20,"period":"AM","morning":true}, "military":{"raw":"0420","hour":4, "minutes":20}}
 * console.log(utilities.parseTime("22:33"));    // {"regular":{"raw":"10:33 PM","hour":10,"minutes":33,"period":"PM","morning":false},"military":{"raw":"2233","hour":22,"minutes":33}}
 * console.log(utilities.parseTime("12:34 AM")); // {"regular":{"raw":"12:34 AM","hour":12,"minutes":34,"period":"AM","morning":true}, "military":{"raw":"0034","hour":0, "minutes":34}}
 * utilities.parseTime("13:37 AM"); // throws an Error
 * utilities.parseTime("28:64"); // throws an Error
 * utilities.parseTime(-1); // throws an Error
 */
utilities.parseTime = function parseTime(value) {
	if(utilities.isEmptyString(value)) {
		throw new Error("Invalid or empty time value.");
	}

	var formattedValue = value.trim();
	var hour = null;
	var minutes = null;
	var regularTime = formattedValue.match(/^[ \t]*(([2-9]|[1][0-2]?)(:([0-5][0-9]))?[ \t]*([ap]m))[ \t]*$/i);

	if(regularTime) {
		var regularHour = utilities.parseInteger(utilities.trimLeadingZeroes(regularTime[2]));

		if(utilities.isInvalidNumber(regularHour)) {
			throw new Error("Invalid regular hour: \"" + regularTime[2] + "\".");
		}

		minutes = utilities.parseInteger(utilities.trimLeadingZeroes(regularTime[4]));

		if(utilities.isInvalidNumber(minutes)) {
			minutes = 0;
		}

		var period = regularTime[5].toUpperCase();
		var morning = period === "AM" ? true : (period === "PM" ? false : null);

		if(morning === null) {
			throw new Error("Invalid period: \"" + regularTime[5] + "\".");
		}

		hour = morning ? regularHour + (regularHour === 12 ? 12 : 0) : regularHour + (regularHour === 12 ? 0 : 12);

		if(hour === 24) {
			hour = 0;
		}
	}
	else {
		var militaryTime = formattedValue.match(/^[ \t]*(((([0-1][0-9])|(2[0-3])):?([0-5][0-9]))|((24):?(00)))[ \t]*$/i);

		if(militaryTime) {
			var militaryHour = militaryTime[3];
			var militaryMinutes = militaryTime[6];

			if(utilities.isInvalid(militaryHour) || utilities.isInvalid(militaryMinutes)) {
				militaryHour = militaryTime[8];

				if(utilities.isNonEmptyString(militaryTime[9])) {
					militaryMinutes = militaryTime[9];
				}
			}

			if(utilities.isInvalid(militaryHour) || utilities.isInvalid(militaryMinutes)) {
				throw new Error("Invalid military time: \"" + formattedValue + "\".");
			}

			hour = utilities.parseInteger(utilities.trimLeadingZeroes(militaryHour));

			if(utilities.isInvalidNumber(hour)) {
				throw new Error("Invalid military time hour: \"" + militaryHour + "\".");
			}

			minutes = utilities.parseInteger(utilities.trimLeadingZeroes(militaryMinutes));

			if(utilities.isInvalidNumber(minutes)) {
				throw new Error("Invalid military time minutes: \"" + militaryMinutes + "\".");
			}

			if(hour === 24 && minutes === 0) {
				hour = 0;
			}
		}
		else {
			throw new Error("Invalid time: \"" + formattedValue + "\".");
		}
	}

	if(hour < 0 || hour > 23) {
		throw new Error("Time hour is out of range (0 - 23): \"" + hour + "\".");
	}
	else if(minutes < 0 || minutes > 59) {
		throw new Error("Time minutes is out of range (0 - 59): \"" + minutes + "\".");
	}

	var regularHour = hour === 0 ? 12 : (hour <= 12 ? hour : hour - 12);
	var period = hour < 12 ? "AM" : "PM";

	return {
		regular: {
			raw: regularHour + ":" + utilities.addLeadingZeroes(minutes, 2) + " " + period,
			hour: regularHour,
			minutes: minutes,
			period: period,
			morning: hour < 12
		},
		military: {
			raw: utilities.addLeadingZeroes(hour, 2) + utilities.addLeadingZeroes(minutes, 2),
			hour: hour,
			minutes: minutes
		}
	};
};

/**
 * Parses an email address from a string by removing any text in the username after and including that which starts with '+' up to the '@' character and returns it. This is intended to determine the actual e-mail address since some providers allow you to place any text after a '+' character and have it be routed to the same email address.
 *
 * @function parseEmail
 * @param {string} value - A string containing an email address.
 * @returns {(string|null)} Will return the e-mail address without any embedded text or null if the email address is not valid.
 * @see {@link module:utilities.parseEmailDomain|parseEmailDomain}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.parseEmail("name+test@gmail.com")); // "name@gmail.com"
 * console.log(utilities.parseEmail("hello@email.com")); // "hello@email.com"
 * console.log(utilities.parseEmail("technovore")); // null
 * console.log(utilities.parseEmail(NaN)); // null
 */
utilities.parseEmail = function parseEmail(value) {
	if(utilities.isEmptyString(value)) {
		return null;
	}

	var emailData = value.trim().toLowerCase().match(/([^+@]+)(\+.*)?(@.+\..+)/);

	if(utilities.isInvalid(emailData) || emailData.length < 4) {
		return null;
	}

	return emailData[1] + emailData[3];
};

/**
 * Parses the domain portion from an e-mail address and returns it.
 *
 * @function parseEmailDomain
 * @param {string} value - A string containing an email address.
 * @returns {(string|null)} The e-mail address domain or null if the value is not a valid e-mail address.
 * @deprecated Use value.split("@", 2)[1] instead. Will be removed in a future release.
 * @see {@link module:utilities.parseEmail|parseEmail}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.parseEmailDomain("spam@mail.net")); // "mail.net"
 * console.log(utilities.parseEmailDomain("get+out@lavabit.com")); // "lavabit.com"
 * console.log(utilities.parseEmailDomain("my.website")); // null
 * console.log(utilities.parseEmailDomain(-1)); // null
 */
utilities.parseEmailDomain = function parseEmailDomain(value) {
	if(utilities.isEmptyString(value)) {
		return null;
	}

	var emailDomainData = value.trim().toLowerCase().match(/([^+@]+)(\+.*)?@(.+\..+)/);

	if(utilities.isInvalid(emailDomainData) || emailDomainData.length < 4) {
		return null;
	}

	return emailDomainData[3];
};

/**
 * TODO_FUNC_DESC
 *
 * @function parseStringList
 * @param {string} value - A comma or semicolon separated list of string values.
 * @returns {(string[]|null)} An array of strings as parsed from the specified string list or null if the specified value is not a string.
 * @see {@link module:utilities.formatStringList|formatStringList}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.parseStringList("w, a, t")); // ["w", "a", "t"]
 * console.log(utilities.parseStringList("ok")); // ["ok"]
 * console.log(utilities.parseStringList([])); // null
 */
utilities.parseStringList = function parseStringList(value) {
	if(typeof value !== "string") {
		return null;
	}

	if(value.length === 0) {
		return [];
	}

	var data = value.split(/[;,]+/);
	var formattedList = [];
	var formattedValue = null;

	for(var i = 0; i < data.length; i++) {
		formattedValue = data[i].trim();

		if(formattedValue.length === 0) {
			continue;
		}

		formattedList.push(formattedValue);
	}

	return formattedList;
};

/**
 * TODO_FUNC_DESC
 *
 * @function parseRegularExpression
 * @param {string} value - The string value to parse a regular expression from.
 * @param {boolean} [throwErrors=false] - Determines if errors should be thrown or not when invalid regular expression values are encountered.
 * @returns {(RegExp|null)} Returns a RegExp object instance if a valid regular expression was parsed from the specified value or null if the value was invalid and throwErrors is unspecified or set to false.
 * @throws Will optionally throw an error if the regular expression is invalid and throwErrors is set to true.
 * @see {@link module:utilities.isRegularExpression|isRegularExpression}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.parseRegularExpression("/(regexp?)/gi")); // new RegExp("(regexp?)", "gi")
 * console.log(utilities.parseRegularExpression(new RegExp("ok"))); // new RegExp("ok")
 * console.log(utilities.parseRegularExpression({ })); // null
 * console.log(utilities.parseRegularExpression(/invalid/x, true)); // throws Error
 */
utilities.parseRegularExpression = function parseRegularExpression(value, throwErrors) {
	throwErrors = utilities.parseBoolean(throwErrors, false);

	if(utilities.isRegularExpression(value)) {
		return value;
	}

	if(utilities.isEmptyString(value)) {
		if(throwErrors) {
			throw new Error("Regular expression cannot be empty.");
		}

		return null;
	}

	var regExpData = value.match(/\s*\/(.*)\/(.*)\s*/);

	if(!regExpData) {
		if(throwErrors) {
			throw new Error("Invalid regular expression value.");
		}

		return null;
	}

	try {
		return new RegExp(regExpData[1], regExpData[2]);
	}
	catch(error) {
		if(throwErrors) {
			throw error;
		}

		return null;
	}
};

/**
 * TODO_FUNC_DESC
 *
 * @function parseYouTubeLink
 * @param {string} value - The string URL value to parse a YouTube video identifier from.
 * @returns {(string|null)} A string value containing the YouTube video ID or null if the video ID could be determined from the specified value.
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.parseYouTubeLink("http://youtube.com/v/OEEEy1dMceI")); // OEEEy1dMceI
 * console.log(utilities.parseYouTubeLink("https://www.youtube.com/watch?v=NUnwFHplBg4")); // NUnwFHplBg4
 * console.log(utilities.parseYouTubeLink("www.youtu.be/watch?v=Dkm8Hteeh6M")); // Dkm8Hteeh6M
 * console.log(utilities.parseYouTubeLink("https://youtu.be/v/z874bjpO9d8")); // z874bjpO9d8
 * console.log(utilities.parseYouTubeLink("https://www.nitro404.com")); // null
 * console.log(utilities.parseYouTubeLink(NaN)); // null
 */
utilities.parseYouTubeLink = function parseYouTubeLink(value) {
	if(utilities.isEmptyString(value)) {
		return null;
	}

	var formattedValue = value.trim();
	var linkData = formattedValue.match(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/i);

	if(linkData && linkData[1].length >= 11) {
		return linkData[1];
	}

	if(formattedValue.match(/[A-Z0-9_-]{11,}/i)) {
		return formattedValue;
	}

	return null;
};

/**
 * TODO_FUNC_DESC
 *
 * @function formatValue
 * @param {any} value - The value to format.
 * @param {Object} format - The format specification.
 * @param {Object} [options] - Formatting options.
 * @returns {any} The formatted value.
 * @throws Will optionally throw an error if invalid data is encountered when formatting the value.
 * @since 1.1.1
 * @memberOf module:utilities
 * @example
 * console.log(utilities.formatValue()); // TODO_RESULT
 */
utilities.formatValue = function formatValue(value, format, options) {
	if(utilities.isObjectStrict(options)) {
		options = {
			throwErrors: utilities.parseBoolean(options.throwErrors, false)
		};

		options.verbose = utilities.parseBoolean(options.verbose, !options.throwErrors);
	}
	else {
		options = {
			throwErrors: false,
			verbose: true
		};
	}

	if(!utilities.isObjectStrict(format)) {
		return utilities.clone(value);
	}

	format = utilities.clone(format);

	var errorMessage = null;

	if(utilities.isEmptyString(format.type)) {
		errorMessage = "Invalid required type format value - expected non-empty string.";
	}
	else {
		var originalType = format.type;

		format.type = format.type.trim().toLowerCase();

		var validFormatType = false;

		for(var i = 0; i < formatTypes.length; i++) {
			if(format.type === formatTypes[i]) {
				validFormatType = true;
				break;
			}
		}

		if(!validFormatType) {
			errorMessage = "Invalid required type format value - expected one of " + formatTypes.join(", ") + ", received \"" + utilities.toString(originalType) + "\".";
		}
		else {
			if(format.type === "bool") {
				format.type = "boolean";
			}
			else if(format.type === "int") {
				format.type = "integer";
			}
			else if(format.type === "number") {
				format.type = "float";
			}
			else if(format.type === "string") {
				if(format.trim !== undefined) {
					var originalTrim = format.trim;

					format.trim = utilities.parseBoolean(format.trim);

					if(format.trim === null) {
						errorMessage = "Invalid optional trim string format value - expected boolean, received \"" + utilities.toString(originalTrim) + "\".";
					}
				}

				if(utilities.isInvalid(errorMessage)) {
					if(format.case !== undefined) {
						if(utilities.isEmptyString(format.case)) {
							errorMessage = "Invalid optional string case format value - expected non-empty string.";
						}
						else {
							var originalCase = format.case;

							format.case = changeCase.camelCase(format.case.trim());

							if(!utilities.isFunction(stringCaseFunctions[format.case])) {
								errorMessage = "Invalid optional case format value - expected one of " + Object.keys(stringCaseFunctions).join(", ") + ", received \"" + utilities.toString(originalCase) + "\".";
							}
						}
					}
				}
			}
			else if(format.type === "object") {
				if(format.strict !== undefined) {
					var originalStrict = format.strict;

					format.strict = utilities.parseBoolean(format.strict);

					if(format.strict === null) {
						errorMessage = "Invalid optional strict object format value - expected boolean, received \"" + utilities.toString(originalStrict) + "\".";
					}
				}

				if(utilities.isInvalid(errorMessage)) {
					if(format.autopopulate !== undefined) {
						var originalAutopopulate = format.autopopulate;

						format.autopopulate = utilities.parseBoolean(format.autopopulate);

						if(format.autopopulate === null) {
							errorMessage = "Invalid optional autopopulate object format value - expected boolean, received \"" + utilities.toString(originalAutopopulate) + "\".";
						}
					}
				}

				if(utilities.isInvalid(errorMessage)) {
					if(format.order !== undefined) {
						var originalOrder = format.order;

						format.order = utilities.parseBoolean(format.order);

						if(format.order === null) {
							errorMessage = "Invalid optional order object format value - expected boolean, received \"" + utilities.toString(originalOrder) + "\".";
						}
					}
				}

				if(utilities.isInvalid(errorMessage)) {
					if(format.removeExtra !== undefined) {
						var originalRemoveExtra = format.removeExtra;

						format.removeExtra = utilities.parseBoolean(format.removeExtra);

						if(format.removeExtra === null) {
							errorMessage = "Invalid optional removeExtra object format value - expected boolean, received \"" + utilities.toString(originalRemoveExtra) + "\".";
						}
					}
				}
			}
			else if(format.type === "regexp" || format.type === "regularexpression") {
				format.type = "regex";
			}
			else if(format.type === "func") {
				format.type = "function";
			}

			if(utilities.isInvalid(errorMessage)) {
				if(format.type === "object" || format.type === "array") {
					if(format.format !== undefined && !utilities.isObjectStrict(format.format)) {
						errorMessage = "Invalid optional format format value - expected object, received \"" + utilities.toString(format.format) + "\".";
					}
				}
			}

			if(utilities.isInvalid(errorMessage)) {
				if(format.type === "string" || format.type === "object" || format.type === "array") {
					if(format.nonEmpty !== undefined) {
						var originalNonEmpty = format.nonEmpty;

						format.nonEmpty = utilities.parseBoolean(format.nonEmpty);

						if(format.nonEmpty === null) {
							errorMessage = "Invalid optional nonEmpty format value - expected boolean, received \"" + utilities.toString(originalNonEmpty) + "\".";
						}
					}
				}
			}
		}
	}

	if(utilities.isInvalid(errorMessage)) {
		if(format.nullable !== undefined) {
			var originalNullable = format.nullable;

			format.nullable = utilities.parseBoolean(format.nullable);

			if(format.nullable === null) {
				errorMessage = "Invalid optional nullable format value - expected boolean, received \"" + utilities.toString(originalNullable) + "\".";
			}
		}
	}

	if(utilities.isInvalid(errorMessage)) {
		if(format.required !== undefined) {
			var originalRequired = format.required;

			format.required = utilities.parseBoolean(format.required);

			if(format.required === null) {
				errorMessage = "Invalid optional required format value - expected boolean, received \"" + utilities.toString(originalRequired) + "\".";
			}
		}
	}

	if(utilities.isInvalid(errorMessage)) {
		if(format.parser !== undefined) {
			if(!utilities.isFunction(format.parser)) {
				errorMessage = "Invalid optional parser format value - expected function, received \"" + utilities.toString(format.parser) + "\".";
			}
		}
	}

	if(utilities.isInvalid(errorMessage)) {
		if(format.validator !== undefined) {
			if(!utilities.isFunction(format.validator)) {
				errorMessage = "Invalid optional validator format value - expected function, received \"" + utilities.toString(format.validator) + "\".";
			}
		}
	}

	if(utilities.isInvalid(errorMessage)) {
		if(format.formatter !== undefined) {
			if(!utilities.isFunction(format.formatter)) {
				errorMessage = "Invalid optional formatter format value - expected function, received \"" + utilities.toString(format.formatter) + "\".";
			}
		}
	}

	if(utilities.isValid(errorMessage)) {
		if(options.throwErrors) {
			throw new Error(errorMessage);
		}
		else if(options.verbose) {
			console.error(errorMessage);
		}

		return null;
	}

	if(utilities.isFunction(format.parser)) {
		if(options.throwErrors) {
			value = format.parser(value, format, options);
		}
		else {
			try {
				value = format.parser(value, format, options);
			}
			catch(error) {
				if(options.verbose) {
					console.error(error.message);
				}

				return null;
			}
		}
	}

	var formattedValue = undefined;

	if(value === undefined) {
		formattedValue = utilities.clone(format.default);
	}
	else if(value === null) {
		if(format.nullable) {
			formattedValue = null;
		}
		else if(format.default !== undefined) {
			formattedValue = utilities.clone(format.default);
		}
		else {
			errorMessage = "Value cannot be null!";
		}
	}
	else if(format.type === "boolean") {
		formattedValue = utilities.parseBoolean(value);

		if(formattedValue === null) {
			errorMessage = "Invalid boolean value: \"" + utilities.toString(value) + "\".";
		}
	}
	else if(format.type === "integer") {
		formattedValue = utilities.parseInteger(value);

		if(utilities.isInvalidNumber(formattedValue)) {
			errorMessage = "Invalid integer value: \"" + utilities.toString(value) + "\".";
		}
	}
	else if(format.type === "float") {
		formattedValue = utilities.parseFloatingPointNumber(value);

		if(utilities.isInvalidNumber(formattedValue)) {
			errorMessage = "Invalid float value: \"" + utilities.toString(value) + "\".";
		}
	}
	else if(format.type === "string") {
		formattedValue = typeof value === "string" ? value : utilities.toString(value);

		if(format.trim) {
			formattedValue = formattedValue.trim();
		}

		if(format.case !== undefined) {
			formattedValue = stringCaseFunctions[format.case](formattedValue);
		}

		if(format.nonEmpty && formattedValue.length === 0) {
			var message = "String value cannot be empty.";

			if(options.throwErrors) {
				throw new Error(message);
			}
			else if(options.verbose) {
				console.error(message);
			}

			return null;
		}
	}
	else if(format.type === "array") {
		if(typeof value === "string") {
			try {
				formattedValue = JSON.parse(value);

				if(!Array.isArray(formattedValue)) {
					errorMessage = "Invalid stringified array value type - expected array: \"" + utilities.toString(value) + "\"."
				}
			}
			catch(error) {
				errorMessage = "Invalid stringified array value: \"" + utilities.toString(value) + "\".";
			}
		}
		else if(Array.isArray(value)) {
			formattedValue = utilities.clone(value);
		}
		else {
			errorMessage = "Invalid value type - expected array or stringified array: \"" + utilities.toString(value) + "\".";
		}

		if(utilities.isInvalid(errorMessage)) {
			if(Array.isArray(formattedValue)) {
				var formattedArray = [];

				if(utilities.isObjectStrict(format.format)) {
					var formattedElement = null;

					for(var i = 0; i < formattedValue.length; i++) {
						if(formattedValue[i] === undefined) {
							continue;
						}

						if(options.throwErrors) {
							formattedElement = utilities.formatValue(formattedValue[i], format.format, options);
						}
						else {
							var subOptions = utilities.clone(options);

							subOptions.throwErrors = true;

							try {
								formattedElement = utilities.formatValue(formattedValue[i], format.format, subOptions);
							}
							catch(error) {
								if(options.verbose) {
									console.error(error.message);
								}

								return null;
							}
						}

						formattedArray.push(formattedElement);
					}
				}
				else {
					for(var i = 0; i < formattedValue.length; i++) {
						if(formattedValue[i] === undefined) {
							continue;
						}

						formattedArray.push(utilities.clone(formattedValue[i]));
					}
				}

				formattedValue = formattedArray;

				if(format.nonEmpty && formattedValue.length === 0) {
					var message = "Array value cannot be empty.";

					if(options.throwErrors) {
						throw new Error(message);
					}
					else if(options.verbose) {
						console.error(message);
					}

					return null;
				}
			}
		}
	}
	else if(format.type === "date") {
		formattedValue = utilities.parseDate(value);

		if(!utilities.isDate(formattedValue)) {
			errorMessage = "Invalid date value: \"" + utilities.toString(value) + "\".";
		}
	}
	else if(format.type === "regex") {
		if(utilities.isRegularExpression(value)) {
			formattedValue = utilities.clone(value);
		}
		else {
			if(options.throwErrors) {
				formattedValue = utilities.parseRegularExpression(value, true);
			}
			else {
				try {
					formattedValue = utilities.parseRegularExpression(value, true);
				}
				catch(error) {
					errorMessage = error.message;
				}
			}
		}

		if(utilities.isInvalid(formattedValue)) {
			errorMessage = "Invalid regular expression value: \"" + utilities.toString(value) + "\".";
		}
	}
	else if(format.type === "function") {
		formattedValue = value;

		if(!utilities.isFunction(formattedValue)) {
			errorMessage = "Invalid function value: \"" + utilities.toString(value) + "\".";
		}
	}

	if(utilities.isInvalid(errorMessage)) {
		if(format.type === "object") {
			if(utilities.isValid(value)) {
				if(typeof value === "string") {
					try {
						formattedValue = JSON.parse(value);

						if(!utilities.isObject(formattedValue, format.strict)) {
							errorMessage = "Invalid stringified object value type - expected " + (format.strict ? "strict " : "") + "object: \"" + utilities.toString(value) + "\"."
						}
					}
					catch(error) {
						errorMessage = "Invalid stringified object value: \"" + utilities.toString(value) + "\".";
					}
				}
				else if(utilities.isObject(value, format.strict)) {
					formattedValue = utilities.clone(value);
				}
				else {
					errorMessage = "Invalid value type - expected " + (format.strict ? "strict " : "") + "object or stringified object: \"" + utilities.toString(value) + "\".";
				}
			}

			if(utilities.isInvalid(errorMessage)) {
				if(utilities.isInvalid(formattedValue)) {
					if(format.autopopulate && !utilities.isObject(formattedValue, format.strict)) {
						formattedValue = { };
					}
				}

				if(utilities.isObjectStrict(format.format) && utilities.isObject(formattedValue)) {
					var attribute = null;
					var attributes = Object.keys(format.format);

					for(var i = 0; i < attributes.length; i++) {
						attribute = attributes[i];

						if(options.throwErrors) {
							var formattedAttribute = utilities.formatValue(formattedValue[attribute], format.format[attribute], options);

							if(formattedAttribute !== undefined) {
								formattedValue[attribute] = formattedAttribute;
							}
						}
						else {
							var subOptions = utilities.clone(options);

							subOptions.throwErrors = true;

							try {
								var formattedAttribute = utilities.formatValue(formattedValue[attribute], format.format[attribute], subOptions);

								if(formattedAttribute !== undefined) {
									formattedValue[attribute] = formattedAttribute;
								}
							}
							catch(error) {
								if(options.verbose) {
									console.error(error.message);
								}

								return null;
							}
						}
					}

					if(format.removeExtra) {
						var newValue = { };

						attributes = Object.keys(formattedValue);

						for(var i = 0; i < attributes.length; i++) {
							attribute = attributes[i];

							if(utilities.isValid(format.format[attribute])) {
								newValue[attribute] = formattedValue[attribute];
							}
						}

						formattedValue = newValue;
					}

					if(format.order) {
						var orderedObject = { };

						attributes = Object.keys(format.format);

						for(var i = 0; i < attributes.length; i++) {
							attribute = attributes[i];

							if(formattedValue[attribute] !== undefined) {
								orderedObject[attribute] = formattedValue[attribute];

								delete formattedValue[attribute];
							}
						}

						var extraAttributes = Object.keys(formattedValue);

						for(var i = 0; i < extraAttributes.length; i++) {
							attribute = extraAttributes[i];

							orderedObject[attribute] = formattedValue[attribute];
						}

						formattedValue = orderedObject;
					}
				}

				if(format.nonEmpty && utilities.isEmptyObject(formattedValue)) {
					var message = "Object value must contain at least one attribute.";

					if(options.throwErrors) {
						throw new Error(message);
					}
					else if(options.verbose) {
						console.error(message);
					}

					return null;
				}
			}
		}
	}

	if(utilities.isValid(errorMessage)) {
		if(options.throwErrors) {
			throw new Error(errorMessage);
		}
		else if(options.verbose) {
			console.error(errorMessage);
		}

		return null;
	}

	if(formattedValue === undefined) {
		if(format.required) {
			var message = "Missing required value!";

			if(options.throwErrors) {
				throw new Error(message);
			}
			else if(options.verbose) {
				console.error(message);
			}

			return null;
		}

		if(format.default !== undefined) {
			formattedValue = utilities.clone(format.default);
		}
	}

	if(utilities.isFunction(format.validator)) {
		if(options.throwErrors) {
			if(!format.validator(formattedValue, format, options)) {
				throw new Error("Validation check failed!");
			}
		}
		else {
			try {
				if(!format.validator(formattedValue, format, options)) {
					var message = "Validation check failed!";

					if(options.verbose) {
						console.error(message);
					}

					return null;
				}
			}
			catch(error) {
				if(options.verbose) {
					console.error(error.message);
				}

				return null;
			}
		}
	}

	if(utilities.isFunction(format.formatter)) {
		if(options.throwErrors) {
			formattedValue = format.formatter(formattedValue, format, options);
		}
		else {
			try {
				formattedValue = format.formatter(formattedValue, format, options);
			}
			catch(error) {
				if(options.verbose) {
					console.error(error.message);
				}

				return null;
			}
		}
	}

	return formattedValue;
};

/**
 * TODO_FUNC_DESC
 *
 * @function formatObject
 * @param {Object} object - The object to format.
 * @param {Object} format - The format specification.
 * @param {(boolean|Object)} [removeExtra=false] - Remove extra flag or formatting options object.
 * @param {boolean} [throwErrors=false] - Remove extra flag or formatting options object.
 * @returns {Object} The formatted object.
 * @throws Will optionally throw an error if any invalid data is encountered when formatting the object.
 * @deprecated Use formatValue instead. Will be removed in a future release.
 * @see {@link module:utilities.formatValue|formatValue}
 * @since 1.1.1
 * @memberOf module:utilities
 * @example
 * console.log(utilities.formatObject()); // TODO_RESULT
 */
utilities.formatObject = function formatObject(object, format, removeExtra, throwErrors) {
	if(!utilities.isObjectStrict(object) && (!utilities.isObjectStrict(removeExtra) || !utilities.isFunction(removeExtra.parser))) {
		return { };
	}

	var options = null;

	if(utilities.isObjectStrict(removeExtra)) {
		options = {
			throwErrors: utilities.parseBoolean(removeExtra.throwErrors, utilities.parseBoolean(throwErrors, false)),
			verbose: utilities.parseBoolean(removeExtra.verbose, false)
		};
	}
	else {
		options = {
			throwErrors: utilities.parseBoolean(throwErrors, false),
			verbose: false
		};
	}

	var subFormat = {
		type: "object",
		strict: false,
		autopopulate: utilities.isObjectStrict(removeExtra) ? utilities.parseBoolean(removeExtra.autopopulate, false) : false,
		order: utilities.isObjectStrict(removeExtra) ? utilities.parseBoolean(removeExtra.order, false) : false,
		removeExtra: utilities.isObjectStrict(removeExtra) ? utilities.parseBoolean(removeExtra.removeExtra, utilities.parseBoolean(removeExtra, false)) : utilities.parseBoolean(removeExtra, false),
		nullable: true,
		required: false,
		format: format
	};

	if(utilities.isObjectStrict(removeExtra)) {
		if(utilities.isFunction(removeExtra.parser)) {
			subFormat.parser = removeExtra.parser;
		}

		if(utilities.isFunction(removeExtra.validator)) {
			subFormat.validator = removeExtra.validator;
		}

		if(utilities.isFunction(removeExtra.formatter)) {
			subFormat.formatter = removeExtra.formatter;
		}
	}

	var formattedObject = null;

	if(options.throwErrors) {
		formattedObject = utilities.formatValue(
			object,
			subFormat,
			options
		);
	}
	else {
		var subOptions = utilities.clone(options);

		subOptions.throwErrors = true;

		try {
			formattedObject = utilities.formatValue(
				object,
				subFormat,
				subOptions
			);
		}
		catch(error) {
			if(options.verbose) {
				console.error(error.message);
			}

			return null;
		}
	}

	return utilities.isObjectStrict(formattedObject) || (utilities.isObjectStrict(removeExtra) && utilities.isFunction(removeExtra.parser)) ? formattedObject : { };
};

/**
 * TODO_FUNC_DESC
 *
 * @function formatStringList
 * @param {(string|string[])} value - The string list to format.
 * @param {(boolean|null)} [stringify=null] - Determines if entries in the list should be stringified or not using {@link module:utilities.toString|toString}.
 * @returns {string} The formatted string list.
 * @see {@link module:utilities.parseStringList|parseStringList}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.formatStringList()); // TODO_RESULT
 */
utilities.formatStringList = function formatStringList(value, stringify) {
	var data = null;

	if(utilities.isNonEmptyString(value)) {
		data = utilities.parseStringList(value);
	}
	else if(utilities.isNonEmptyArray(value)) {
		data = value;
	}
	else if(typeof value === "string" || Array.isArray(value)) {
		return "";
	}
	else {
		return null;
	}

	var formattedList = "";
	var formattedValue = null;

	stringify = utilities.parseBoolean(stringify);

	for(var i = 0; i < data.length; i++) {
		if(typeof data[i] !== "string") {
			if(stringify === null) {
				continue;
			}
			else if(stringify) {
				formattedValue = utilities.toString(data[i]);
			}
			else {
				formattedValue = data[i];
			}
		}
		else {
			formattedValue = data[i].trim();
		}

		if(formattedValue.length === 0) {
			continue;
		}

		if(formattedList.length > 0) {
			formattedList += ", ";
		}

		formattedList += formattedValue;
	}

	return formattedList;
};

/**
 * TODO_FUNC_DESC
 *
 * @function leftShift
 * @param {number} number - The number value to bit shift.
 * @param {number} bits - The number of bits to shift the value left by.
 * @returns {number} The number value right shifted by the specified number of bits.
 * @see {@link module:utilities.rightShift|rightShift}
 * @since 1.2.19
 * @memberOf module:utilities
 * @example
 * console.log(utilities.leftShift()); // TODO_RESULT
 */
utilities.leftShift = function leftShift(number, bits) {
	if(!Number.isInteger(number) || !Number.isInteger(bits)) {
		return NaN;
	}

	return number * Math.pow(2, bits);
};

/**
 * TODO_FUNC_DESC
 *
 * @function rightShift
 * @param {number} number - The number value to bit shift.
 * @param {number} bits - The number of bits to shift the value right by.
 * @returns {number} The number value right shifted by the specified number of bits.
 * @see {@link module:utilities.leftShift|leftShift}
 * @since 1.2.19
 * @memberOf module:utilities
 * @example
 * console.log(utilities.rightShift()); // TODO_RESULT
 */
utilities.rightShift = function rightShift(number, bits) {
	if(!Number.isInteger(number) || !Number.isInteger(bits)) {
		return NaN;
	}

	return number / Math.pow(2, bits);
};

/**
 * TODO_FUNC_DESC
 *
 * @function trimString
 * @param {string} value - The string to trim.
 * @param {(string|null)} [defaultValue=null] - The default value to return if the specified value is not a string.
 * @returns {(string|null)} TODO_RETURN_DESC
 * @see {@link module:utilities.isEmptyString|isEmptyString}
 * @see {@link module:utilities.isNonEmptyString|isNonEmptyString}
 * @see {@link module:utilities.trimNullTerminatedString|trimNullTerminatedString}
 * @see {@link module:utilities.trimWhitespace|trimWhitespace}
 * @see {@link module:utilities.trimTrailingNewlines|trimTrailingNewlines}
 * @see {@link module:utilities.replaceNonBreakingSpaces|replaceNonBreakingSpaces}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.trimString()); // TODO_RESULT
 */
utilities.trimString = function trimString(value, defaultValue) {
	return typeof value === "string" ? value.trim() : (typeof defaultValue === "string" ? defaultValue : null);
};

/**
 * TODO_FUNC_DESC
 *
 * @function trimNullTerminatedString
 * @param {string} value - The null-terminated string to trim.
 * @param {(string|null)} [defaultValue=null] - The default value to return if the specified value is not a string.
 * @returns {(string|null)} TODO_RETURN_DESC
 * @see {@link module:utilities.isEmptyString|isEmptyString}
 * @see {@link module:utilities.isNonEmptyString|isNonEmptyString}
 * @see {@link module:utilities.trimString|trimString}
 * @see {@link module:utilities.trimWhitespace|trimWhitespace}
 * @see {@link module:utilities.trimTrailingNewlines|trimTrailingNewlines}
 * @see {@link module:utilities.replaceNonBreakingSpaces|replaceNonBreakingSpaces}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.trimNullTerminatedString()); // TODO_RESULT
 */
utilities.trimNullTerminatedString = function trimNullTerminatedString(value, defaultValue) {
	if(typeof value !== "string") {
		return typeof defaultValue === "string" ? defaultValue : null;
	}

	var nullTerminatorIndex = value.indexOf("\0");

	if(nullTerminatorIndex >= 0) {
		return value.substr(0, nullTerminatorIndex);
	}

	return value;
};

/**
 * TODO_FUNC_DESC
 *
 * @function trimWhitespace
 * @param {string} value - The string to trim whitespace characters from.
 * @param {boolean} [trimNewlines=false] - Determines of newlines characters should also be removed from the end of each line or not.
 * @param {(string|null)} [defaultValue=null] - The default value to return if the specified value is not a string.
 * @returns {(string|null)} TODO_RETURN_DESC
 * @see {@link module:utilities.isEmptyString|isEmptyString}
 * @see {@link module:utilities.isNonEmptyString|isNonEmptyString}
 * @see {@link module:utilities.trimString|trimString}
 * @see {@link module:utilities.trimNullTerminatedString|trimNullTerminatedString}
 * @see {@link module:utilities.trimTrailingNewlines|trimTrailingNewlines}
 * @see {@link module:utilities.replaceNonBreakingSpaces|replaceNonBreakingSpaces}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.trimWhitespace()); // TODO_RESULT
 */
utilities.trimWhitespace = function trimWhitespace(value, trimNewlines, defaultValue) {
	if(typeof value !== "string") {
		return typeof defaultValue === "string" ? defaultValue : null;
	}

	var trimmedString = value.replace(/^[ \t]+|[ \t]+$/gm, "");

	if(utilities.parseBoolean(trimNewlines, false)) {
		trimmedString = trimmedString.replace(/\r\n?|\n/g, "");
	}

	return trimmedString;
};

/**
 * TODO_FUNC_DESC
 *
 * @function trimTrailingNewlines
 * @param {string} value - The string to trim trailing newline characters from.
 * @param {(string|null)} [defaultValue=null] - The default value to return if the specified value is not a string.
 * @returns {(string|null)} TODO_RETURN_DESC
 * @see {@link module:utilities.isEmptyString|isEmptyString}
 * @see {@link module:utilities.isNonEmptyString|isNonEmptyString}
 * @see {@link module:utilities.trimString|trimString}
 * @see {@link module:utilities.trimNullTerminatedString|trimNullTerminatedString}
 * @see {@link module:utilities.trimWhitespace|trimWhitespace}
 * @see {@link module:utilities.replaceNonBreakingSpaces|replaceNonBreakingSpaces}
 * @since 1.1.5
 * @memberOf module:utilities
 * @example
 * console.log(utilities.trimTrailingNewlines()); // TODO_RESULT
 */
utilities.trimTrailingNewlines = function trimTrailingNewlines(value, defaultValue) {
	if(typeof value !== "string") {
		return typeof defaultValue === "string" ? defaultValue : null;
	}

	if(utilities.isEmptyString(value)) {
		return value;
	}

	return value.replace(/[ \t\r\n]+$/, "");
};

/**
 * TODO_FUNC_DESC
 *
 * @function replaceNonBreakingSpaces
 * @param {string} value - The string to replace non breaking spaces in.
 * @returns {(string|null)} TODO_RETURN_DESC
 * @see {@link module:utilities.isEmptyString|isEmptyString}
 * @see {@link module:utilities.isNonEmptyString|isNonEmptyString}
 * @see {@link module:utilities.trimString|trimString}
 * @see {@link module:utilities.trimNullTerminatedString|trimNullTerminatedString}
 * @see {@link module:utilities.trimWhitespace|trimWhitespace}
 * @see {@link module:utilities.trimTrailingNewlines|trimTrailingNewlines}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.replaceNonBreakingSpaces()); // TODO_RESULT
 */
utilities.replaceNonBreakingSpaces = function replaceNonBreakingSpaces(value) {
	return typeof value === "string" ? value.replace(/&nbsp;/gi, " ") : null;
};

/**
 * TODO_FUNC_DESC
 *
 * @function indentText
 * @param {string} value - The string to indent.
 * @param {number} [amount=1] - The amount of times  to indent the string.
 * @param {indentation} [indentation="\t"] - The indentation string to use.
 * @param {boolean} [clearEmptyLines=true] - Determines if empty lines should be trimmed or not.
 * @returns {(string|null)} TODO_RETURN_DESC
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.indentText()); // TODO_RESULT
 */
utilities.indentText = function indentText(value, amount, indentation, clearEmptyLines) {
	if(typeof value !== "string") {
		return null;
	}

	clearEmptyLines = utilities.parseBoolean(clearEmptyLines, true);

	amount = utilities.parseInteger(amount, 1);

	if(amount < 0) {
		amount = 0;
	}

	indentation = typeof indentation === "string" ? indentation : "\t";

	var totalIndentation = "";

	for(var i = 0; i < amount; i++) {
		totalIndentation += indentation;
	}

	var line = null;
	var lines = value.split(/\r\n?|\n/g);
	var indentedParagraph = "";

	for(var i = 0; i < lines.length; i++) {
		line = lines[i];

		indentedParagraph += (utilities.isEmptyString(line) && clearEmptyLines ? "" : totalIndentation + line) + ((i < lines.length - 1) ? "\n" : "");
	}

	return indentedParagraph;
};

/**
 * TODO_FUNC_DESC
 *
 * @function trimLeadingZeroes
 * @param {string} value - The string to remove leading zeroes from.
 * @returns {string} TODO_RETURN_DESC
 * @see {@link module:utilities.addLeadingZeroes|addLeadingZeroes}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.trimLeadingZeroes()); // TODO_RESULT
 */
utilities.trimLeadingZeroes = function trimLeadingZeroes(value) {
	if(typeof value !== "string") {
		return null;
	}

	if(value.length === 0) {
		return value;
	}

	var formattedValue = value.trim();

	if(formattedValue.length === 0) {
		return formattedValue;
	}
	else if(formattedValue.match(/^[0]+$/)) {
		return "0";
	}

	return formattedValue.replace(/^0+/, "");
};

/**
 * TODO_FUNC_DESC
 *
 * @function addLeadingZeroes
 * @param {string} value - The string to add leading zeroes to.
 * @param {number} [expectedLength=NaN] - The expected minimum length of the string after zeroes have been prepended to it.
 * @returns {(string|null)} TODO_RETURN_DESC
 * @see {@link module:utilities.trimLeadingZeroes|trimLeadingZeroes}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.addLeadingZeroes()); // TODO_RESULT
 */
utilities.addLeadingZeroes = function addLeadingZeroes(value, expectedLength) {
	if(utilities.isInvalid(value)) {
		return null;
	}

	value = value.toString();
	expectedLength = utilities.parseInteger(expectedLength);

	if(utilities.isInvalidNumber(expectedLength) || expectedLength < 0) {
		return value;
	}

	var numberOfZeroes = expectedLength - value.length;

	for(var i = 0; i < numberOfZeroes; i++) {
		value = "0" + value;
	}

	return value;
};

/**
 * TODO_FUNC_DESC
 *
 * @function toString
 * @param {any} value - The value to convert into a string.
 * @returns {string} A string representation of the specified value.
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.toString(undefined)); // "undefined"
 * console.log(utilities.toString(null)); // "null"
 * console.log(utilities.toString(Infinity)); // "Infinity"
 * console.log(utilities.toString(-Infinity)); // "-Infinity"
 * console.log(utilities.toString(NaN)); // "NaN"
 * console.log(utilities.toString("test")); // "\"test\""
 * console.log(utilities.toString(new Date(0))); // "1970-01-01T00:00:00.000Z"
 * console.log(utilities.toString(function() { })); // "function() { }"
 * console.log(utilities.toString({ door: "stuck" })); // "{\"door":\"stuck\"}"
 * console.log(utilities.toString([4, 2, "0"])); // "[4,2,\"0\"]"
 */
utilities.toString = function toString(value) {
	if(value === undefined) {
		return "undefined";
	}
	else if(value === null) {
		return "null";
	}
	else if(typeof value === "string") {
		return value;
	}
	else if(value === Infinity) {
		return "Infinity";
	}
	else if(value === -Infinity) {
		return "-Infinity";
	}
	else if(typeof value === "number" && isNaN(value)) {
		return "NaN";
	}
	else if(value instanceof Date) {
		return value.toString();
	}
	else if(value instanceof RegExp) {
		var flags = "";

		for(var flag in regExpFlags) {
			if(value[flag]) {
				flags += regExpFlags[flag];
			}
		}

		return "/" + value.source + "/" + flags;
	}
	else if(value instanceof Function) {
		return value.toString();
	}
	else if(value instanceof Error) {
		return value.stack;
	}

	return JSON.stringify(value);
};

/**
 * TODO_FUNC_DESC
 *
 * @function compareDates
 * @param {any} a - The first date to compare.
 * @param {any} b - The second date to compare.
 * @returns {number} TODO_RETURN_DESC
 * @see {@link module:utilities.isDate|isDate}
 * @see {@link module:utilities.parseDate|parseDate}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.compareDates()); // TODO_RESULT
 */
utilities.compareDates = function compareDates(a, b) {
	a = utilities.parseDate(a);
	b = utilities.parseDate(b);

	if(a === null && b === null) {
		return 0;
	}

	if(a === null) {
		return -1;
	}
	else if(b === null) {
		return 1;
	}

	return a.getTime() - b.getTime();
};

/**
 * TODO_FUNC_DESC
 *
 * @function compareCasePercentage
 * @param {string} value - The string value to compare the case percentage of.
 * @returns {number} TODO_RETURN_DESC
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.compareCasePercentage()); // TODO_RESULT
 */
utilities.compareCasePercentage = function compareCasePercentage(value) {
	if(utilities.isEmptyString(value)) {
		return 0;
	}

	var c = null;
	var upper = 0;
	var lower = 0;
	var lowerA = "a".charCodeAt();
	var lowerZ = "z".charCodeAt();
	var upperA = "A".charCodeAt();
	var upperZ = "Z".charCodeAt();

	for(var i = 0; i < value.length; i++) {
		c = value.charCodeAt(i);

		if(c >= lowerA && c <= lowerZ) {
			lower++;
		}
		else if(c >= upperA && c <= upperZ) {
			upper++;
		}
	}

	return upper - lower;
};

/**
 * Reverses a string value with special handling for unicode characters.
 *
 * @function reverseString
 * @param {string} value - The string value to reverse.
 * @returns {(string|null)} The reversed representation of the specified string value or a value of null if the specified value is not a string.
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.reverseString("backwards")); // "sdrawkcab"
 * console.log(utilities.reverseString(NaN)); // null
 */
utilities.reverseString = function reverseString(value) {
	if(typeof value !== "string") {
		return null;
	}

	value = value.replace(
		/([\0-\u02FF\u0370-\u1AAF\u1B00-\u1DBF\u1E00-\u20CF\u2100-\uD7FF\uE000-\uFE1F\uFE30-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])([\u0300-\u036F\u1AB0-\u1AFF\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]+)/g,
		function($0, $1, $2) {
			return utilities.reverseString($2) + $1;
		}
	).replace(/([\uD800-\uDBFF])([\uDC00-\uDFFF])/g, "$2$1");

	var reverse = "";

	for(var i = value.length - 1; i >= 0; i--) {
		reverse += value[i];
	}

	return reverse;
};

/**
 * Creates an Error object instance with the specified message and HTTP status code.
 *
 * @function createError
 * @param {string} message - The error message.
 * @param {number} [status=500] - The HTTP status code of the error.
 * @returns {Error} The error with the specified message and status code property.
 * @deprecated Use new Error() instead. Will be removed in a future release.
 * @see {@link module:utilities.isError|isError}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.createError("COOL HATS ONLY.", 401)); // new Error("COOL HATS ONLY.") (with status property set to 401)
 */
utilities.createError = function createError(message, status) {
	var error = new Error(message);
	error.status = utilities.parseInteger(status, 500);
	return error;
};

/**
 * TODO_FUNC_DESC
 *
 * @function clone
 * @param {any} value - The value to clone.
 * @returns {any} A copy of the specified value.
 * @see {@link module:utilities.merge|merge}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.clone({ some: "value" })); // {"some":"value"}
 */
utilities.clone = function clone(value) {
	if(!utilities.isObject(value)) {
		return value;
	}
	else if(value instanceof Boolean) {
		return new Boolean(value.valueOf());
	}
	else if(value instanceof Date) {
		var copy = new Date();
		copy.setTime(value.getTime());

		return copy;
	}
	else if(value instanceof Array) {
		var copy = [];

		for(var i = 0, length = value.length; i < length; i++) {
			copy[i] = utilities.clone(value[i]);
		}

		return copy;
	}
	else if(value instanceof Set) {
		return new Set(value);
	}
	else if(value instanceof Map) {
		return new Map(value);
	}
	else if(value instanceof RegExp) {
		var flags = "";

		for(var flag in regExpFlags) {
			if(value[flag]) {
				flags += regExpFlags[flag]
			}
		}

		return new RegExp(value.source, flags);
	}
	else if(typeof Buffer !== "undefined" && value instanceof Buffer) {
		return Buffer.from instanceof Function ? Buffer.from(value) : new Buffer(value);
	}
	else if(value instanceof Object) {
		var copy = null;

		if(value instanceof Error) {
			copy = new Error(value.message);

			copy.stack = utilities.clone(value.stack);

			var properties = Object.keys(value);

			for(var i = 0; i < properties.length; i++) {
				copy[properties[i]] = utilities.clone(value[properties[i]]);
			}
		}
		else {
			copy = { };
		}

		for(var attribute in value) {
			if(Object.prototype.hasOwnProperty.call(value, attribute)) {
				copy[attribute] = utilities.clone(value[attribute]);
			}
		}

		return copy;
	}

	return value;
};

/**
 * TODO_FUNC_DESC
 *
 * @function merge
 * @param {Object} a - The object to merge into.
 * @param {Object} b - The object whose properties are being merged.
 * @param {boolean} [copy=true] - Determines if a copy of the first object should be made before merging.
 * @param {boolean} [deepMerge=true] - Determines if properties should be recursively merged or just the base properties.
 * @returns {(Object|null)} TODO_RETURN_DESC
 * @see {@link module:utilities.clone|clone}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.merge({ a: 1 }, { b: 2 })); // { a: 1, b: 2 }
 */
utilities.merge = function merge(a, b, copy, deepMerge) {
	if(!utilities.isObject(a) || Array.isArray(a)) {
		return null;
	}

	var newObject = null;

	copy = utilities.parseBoolean(copy, true);

	if(copy) {
		newObject = utilities.clone(a);
	}
	else {
		newObject = a;
	}

	if(!utilities.isObject(a) || Array.isArray(a) || !utilities.isObject(b) || Array.isArray(b)) {
		return newObject;
	}

	var attribute = null;
	var value = null;
	var newValue = null;
	var attributes = Object.keys(b);

	deepMerge = utilities.parseBoolean(deepMerge, true);

	for(var i = 0; i < attributes.length; i++) {
		attribute = attributes[i];
		value = newObject[attribute];

		if(copy) {
			newValue = utilities.clone(b[attribute]);
		}
		else {
			newValue = b[attribute];
		}

		if(deepMerge && utilities.isObject(value) && !Array.isArray(value) && utilities.isObject(newValue) && !Array.isArray(newValue)) {
			newObject[attribute] = utilities.merge(value, newValue);
		}
		else {
			newObject[attribute] = newValue;
		}
	}

	return newObject;
};

/**
 * TODO_FUNC_DESC
 *
 * @function getFileName
 * @param {string} filePath - A file path string to extract the file name from.
 * @returns {(string|null)} Returns a string value containing the name of the file or null if the file path was not a string.
 * @see {@link module:utilities.getFilePath|getFilePath}
 * @see {@link module:utilities.getFileNameNoExtension|getFileNameNoExtension}
 * @see {@link module:utilities.getFileExtension|getFileExtension}
 * @see {@link module:utilities.fileHasExtension|fileHasExtension}
 * @see {@link module:utilities.reverseFileExtension|reverseFileExtension}
 * @see {@link module:utilities.truncateFileName|truncateFileName}
 * @see {@link module:utilities.joinPaths|joinPaths}
 * @since 1.2.18
 * @memberOf module:utilities
 * @example
 * console.log(utilities.getFileName("C:\settings.ini")); // "settings.ini"
 * console.log(utilities.getFileName("/var/tmp/test.txt")); // "test.txt"
 * console.log(utilities.getFileName("MyApp.wgt")); // "MyApp.wgt"
 * console.log(utilities.getFileName(NaN)); // null
 */
utilities.getFileName = function getFileName(filePath) {
	if(typeof filePath !== "string") {
		return null;
	}

	filePath = filePath.trim();

	for(var i = filePath.length - 1; i >= 0; i--) {
		if(filePath[i] === "/" || filePath[i] === "\\") {
			return filePath.substring(i + 1, filePath.length).trim();
		}
	}

	return filePath;
};

/**
 * TODO_FUNC_DESC
 *
 * @function getFilePath
 * @param {string} filePath - A file path string to extract the base path from.
 * @returns {(string|null)} Returns a string value containing the base path of the specified file path or null if the file path was not a string.
 * @see {@link module:utilities.getFileName|getFileName}
 * @see {@link module:utilities.getFileNameNoExtension|getFileNameNoExtension}
 * @see {@link module:utilities.getFileExtension|getFileExtension}
 * @see {@link module:utilities.fileHasExtension|fileHasExtension}
 * @see {@link module:utilities.reverseFileExtension|reverseFileExtension}
 * @see {@link module:utilities.truncateFileName|truncateFileName}
 * @see {@link module:utilities.joinPaths|joinPaths}
 * @since 1.2.18
 * @memberOf module:utilities
 * @example
 * console.log(utilities.getFilePath()); // TODO_RESULT
 */
utilities.getFilePath = function getFilePath(filePath) {
	if(typeof filePath !== "string") {
		return null;
	}

	filePath = filePath.trim();

	for(var i = filePath.length - 1; i >= 0; i--) {
		if(filePath[i] === "/" || filePath[i] === "\\") {
			return filePath.substring(0, i).trim();
		}
	}

	return "";
};

/**
 * TODO_FUNC_DESC
 *
 * @function getFileNameNoExtension
 * @param {string} fileName - A file name or path string to extract the file name with no extension from.
 * @returns {(string|null)} Returns a string value containing the name of the file with no extension or null if the file name or path was not a string.
 * @see {@link module:utilities.getFileName|getFileName}
 * @see {@link module:utilities.getFilePath|getFilePath}
 * @see {@link module:utilities.getFileExtension|getFileExtension}
 * @see {@link module:utilities.fileHasExtension|fileHasExtension}
 * @see {@link module:utilities.reverseFileExtension|reverseFileExtension}
 * @see {@link module:utilities.truncateFileName|truncateFileName}
 * @see {@link module:utilities.joinPaths|joinPaths}
 * @since 1.2.18
 * @memberOf module:utilities
 * @example
 * console.log(utilities.getFileNameNoExtension("data.bin")); // "data"
 * console.log(utilities.getFileNameNoExtension("something")); // "something"
 * console.log(utilities.getFileNameNoExtension("C:\\games\\z\\z.sh")); // "z"
 * console.log(utilities.getFileNameNoExtension("/data/db")); // "db"
 * console.log(utilities.getFileNameNoExtension("E:\\some_directory\\")); // ""
 * console.log(utilities.getFileNameNoExtension("")); // ""
 * console.log(utilities.getFileNameNoExtension({ })); // null
 */
utilities.getFileNameNoExtension = function getFileNameNoExtension(fileName) {
	if(typeof fileName !== "string") {
		return null;
	}

	fileName = utilities.getFileName(fileName);

	for(var i = fileName.length - 1; i >= 0; i--) {
		if(fileName[i] === ".") {
			return fileName.substring(0, i).trim();
		}
	}

	return fileName;
};

/**
 * TODO_FUNC_DESC
 *
 * @function getFileExtension
 * @param {string} fileName - A file name or path string to extract the extension from.
 * @returns {(string|null)} Returns a string value containing the extension of the file or null if the file name or path was not a string.
 * @see {@link module:utilities.getFileName|getFileName}
 * @see {@link module:utilities.getFilePath|getFilePath}
 * @see {@link module:utilities.getFileNameNoExtension|getFileNameNoExtension}
 * @see {@link module:utilities.fileHasExtension|fileHasExtension}
 * @see {@link module:utilities.reverseFileExtension|reverseFileExtension}
 * @see {@link module:utilities.truncateFileName|truncateFileName}
 * @see {@link module:utilities.joinPaths|joinPaths}
 * @since 1.2.18
 * @memberOf module:utilities
 * @example
 * console.log(utilities.getFileExtension("settings.ini")); // "ini"
 * console.log(utilities.getFileExtension("./data/yes.no")); // "no"
 * console.log(utilities.getFileExtension("C:\\temp")); // ""
 * console.log(utilities.getFileExtension("/var/tmp/")); // ""
 * console.log(utilities.getFileExtension("")); // ""
 * console.log(utilities.getFileExtension(NaN)); // null
 */
utilities.getFileExtension = function getFileExtension(fileName) {
	if(typeof fileName !== "string") {
		return null;
	}

	fileName = utilities.getFileName(fileName);

	for(var i = fileName.length - 1; i >= 0; i--) {
		if(fileName[i] === ".") {
			return fileName.substring(i + 1, fileName.length).trim();
		}
	}

	return "";
};

/**
 * TODO_FUNC_DESC
 *
 * @function fileHasExtension
 * @param {string} fileName - A file name or path string to extract the extension from.
 * @param {string} extension - A string to case insensitively compare the actual file extension against.
 * @returns {boolean} Returns true if the extension of the file case insensitively matches the specified extension, otherwise false if they do not match or either the specified or actual extension is empty or not a string.
 * @see {@link module:utilities.getFileName|getFileName}
 * @see {@link module:utilities.getFilePath|getFilePath}
 * @see {@link module:utilities.getFileNameNoExtension|getFileNameNoExtension}
 * @see {@link module:utilities.getFileExtension|getFileExtension}
 * @see {@link module:utilities.reverseFileExtension|reverseFileExtension}
 * @see {@link module:utilities.truncateFileName|truncateFileName}
 * @see {@link module:utilities.joinPaths|joinPaths}
 * @since 1.2.18
 * @memberOf module:utilities
 * @example
 * console.log(utilities.fileHasExtension("file.txt", "TXT")); // true
 * console.log(utilities.fileHasExtension("data/segment.ts", "ts")); // true
 * console.log(utilities.fileHasExtension("folder", "dir")); // false
 * console.log(utilities.fileHasExtension("lol.wut", "")); // false
 * console.log(utilities.fileHasExtension("", "ok")); // false
 * console.log(utilities.fileHasExtension(null, null)); // false
 */
utilities.fileHasExtension = function fileHasExtension(fileName, extension) {
	if(utilities.isEmptyString(fileName) || utilities.isEmptyString(extension)) {
		return false;
	}

	var actualFileExtension = utilities.getFileExtension(fileName);

	if(utilities.isEmptyString(actualFileExtension)) {
		return false;
	}

	return actualFileExtension.toLowerCase() === extension.trim().toLowerCase();
};

/**
 * TODO_FUNC_DESC
 *
 * @function reverseFileExtension
 * @param {string} fileName - A file name or path string to reverse the file extension of.
 * @returns {(string|null)} Returns a string value containing the original file name or path with the extension reversed or null if the file name or path was not a string.
 * @see {@link module:utilities.getFileName|getFileName}
 * @see {@link module:utilities.getFilePath|getFilePath}
 * @see {@link module:utilities.getFileNameNoExtension|getFileNameNoExtension}
 * @see {@link module:utilities.getFileExtension|getFileExtension}
 * @see {@link module:utilities.fileHasExtension|fileHasExtension}
 * @see {@link module:utilities.truncateFileName|truncateFileName}
 * @see {@link module:utilities.joinPaths|joinPaths}
 * @since 1.2.18
 * @memberOf module:utilities
 * @example
 * console.log(utilities.reverseFileExtension("duke3d.grp")); // "duke3d.prg"
 * console.log(utilities.reverseFileExtension("F:\\data.json")); // "F:\\data.nosj"
 * console.log(utilities.reverseFileExtension("/home/downloads/")); // "/home/downloads/"
 * console.log(utilities.reverseFileExtension("X:\\secrets")); // "X:\\secrets"
 * console.log(utilities.reverseFileExtension("unknown")); // "unknown"
 * console.log(utilities.reverseFileExtension(Infinity)); // null
 */
utilities.reverseFileExtension = function reverseFileExtension(fileName) {
	if(typeof fileName !== "string") {
		return null;
	}

	fileName = fileName.trim();

	for(var i = fileName.length - 1; i >= 0; i--) {
		if(fileName[i] === ".") {
			return fileName.substring(0, i) + "." + utilities.reverseString(fileName.substring(i + 1, fileName.length));
		}
	}

	return fileName;
};

/**
 * TODO_FUNC_DESC
 *
 * @function truncateFileName
 * @param {string} fileName - A file name or path string to truncate.
 * @param {number} maxLength - The maximum length of the file name.
 * @returns {(string|null)} The truncated file name or null if the file name is not a string.
 * @see {@link module:utilities.getFileName|getFileName}
 * @see {@link module:utilities.getFilePath|getFilePath}
 * @see {@link module:utilities.getFileNameNoExtension|getFileNameNoExtension}
 * @see {@link module:utilities.getFileExtension|getFileExtension}
 * @see {@link module:utilities.fileHasExtension|fileHasExtension}
 * @see {@link module:utilities.reverseFileExtension|reverseFileExtension}
 * @see {@link module:utilities.joinPaths|joinPaths}
 * @since 1.2.18
 * @memberOf module:utilities
 * @example
 * console.log(utilities.truncateFileName()); // TODO_RESULT
 */
utilities.truncateFileName = function truncateFileName(fileName, maxLength) {
	if(typeof fileName !== "string") {
		return null;
	}

	fileName = utilities.getFileName(fileName);

	if(utilities.isEmptyString(fileName)) {
		return "";
	}

	maxLength = utilities.parseInteger(maxLength);

	if(utilities.isInvalidNumber(maxLength) || maxLength < 0) {
		return fileName;
	}

	if(maxLength === 0) {
		return "";
	}

	if(fileName.length <= maxLength) {
		return fileName;
	}

	var extension = "";
	var originalFileName = fileName;

	for(var i = fileName.length - 1; i >= 0; i--) {
		if(fileName[i] === ".") {
			extension = fileName.substring(i + 1, fileName.length);
			originalFileName = fileName.substring(0, i);
			break;
		}
	}

	if(maxLength - (extension.length + (extension.length > 0 ? 1 : 0)) < 1) {
		return originalFileName.substring(0, maxLength);
	}

	return originalFileName.substring(0, maxLength - extension.length - (extension.length > 0 ? 1 : 0)) + (extension.length > 0 ? "." + extension : "");
};

/**
 * TODO_FUNC_DESC
 *
 * @function prependSlash
 * @param {string} value - The string to prepend a forward or back slash onto.
 * @param {boolean} [forwardSlash=true] - Determines if a forward or back slash should be prepended.
 * @returns {(string|null)} The original string with a forward or back slash prepended to it if there isn't already a forward or back slash at the start or null if the specified value is not a string.
 * @see {@link module:utilities.joinPaths|joinPaths}
 * @see {@link module:utilities.appendSlash|appendSlash}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.prependSlash()); // TODO_RESULT
 */
utilities.prependSlash = function prependSlash(value, forwardSlash) {
	if(typeof value !== "string") {
		return null;
	}

	forwardSlash = utilities.parseBoolean(forwardSlash, true);

	var formattedValue = value.trim();

	if(formattedValue.length === 0) {
		return formattedValue;
	}

	if(formattedValue[0] !== "/" && formattedValue[0] !== "\\") {
		formattedValue = (forwardSlash ? "/" : "\\") + formattedValue;
	}

	return formattedValue;
};

/**
 * TODO_FUNC_DESC
 *
 * @function appendSlash
 * @param {string} value - The string to append a forward or back slash onto.
 * @param {boolean} [forwardSlash=true] - Determines if a forward or back slash should be appended.
 * @returns {(string|null)} The original string with a forward or back slash appended to it if there isn't already a forward or back slash at the end or null if the specified value is not a string.
 * @see {@link module:utilities.joinPaths|joinPaths}
 * @see {@link module:utilities.prependSlash|prependSlash}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.appendSlash()); // TODO_RESULT
 */
utilities.appendSlash = function appendSlash(value, forwardSlash) {
	if(typeof value !== "string") {
		return null;
	}

	forwardSlash = utilities.parseBoolean(forwardSlash, true);

	var formattedValue = value.trim();

	if(formattedValue.length === 0) {
		return formattedValue;
	}

	if(formattedValue[formattedValue.length - 1] !== "/" && formattedValue[formattedValue.length - 1] !== "\\") {
		formattedValue += (forwardSlash ? "/" : "\\");
	}

	return formattedValue;
};

/**
 * TODO_FUNC_DESC
 * A string with all of the path string arguments joined together. by a single instance of the specified separator character with no trailing separator character unless the original path is just a separator character.
 * TODO_OPTIONS

 *
 * @function joinPaths
 * @param {...string|string[]} paths - An collection of string arguments either passed directly to the function or as an array value.
 * @param {Object} [options] - Configuration options when joining path strings together, either passed as the last argument to the function.or the last value in the array.
 * @returns {string} A string with all of the path string arguments joined together.
 * @see {@link module:utilities.getFileName|getFileName}
 * @see {@link module:utilities.getFilePath|getFilePath}
 * @see {@link module:utilities.getFileNameNoExtension|getFileNameNoExtension}
 * @see {@link module:utilities.getFileExtension|getFileExtension}
 * @see {@link module:utilities.fileHasExtension|fileHasExtension}
 * @see {@link module:utilities.reverseFileExtension|reverseFileExtension}
 * @see {@link module:utilities.joinPaths|joinPaths}
 * @see {@link module:utilities.prependSlash|prependSlash}
 * @see {@link module:utilities.appendSlash|appendSlash}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.joinPaths()); // TODO_RESULT
 */
utilities.joinPaths = function joinPaths(paths, options) {
	if(!Array.isArray(paths)) {
		paths = Array.prototype.slice.call(arguments);
	}

	if(paths.length !== 0 && utilities.isObjectStrict(paths[paths.length - 1])) {
		options = paths.splice(paths.length - 1, 1)[0];
	}

	if(!utilities.isObjectStrict(options)) {
		options = { };
	}

	options.separator = utilities.trimString(options.separator);

	if(options.separator !== "/" && options.separator !== "\\") {
		options.separator = "/";
	}

	var newPath = "";

	for(var i = 0; i < paths.length; i++) {
		var path = utilities.trimString(paths[i]);

		if(utilities.isEmptyString(path)) {
			continue;
		}

		if(utilities.isEmptyString(newPath)) {
			if(path === "/" || path === "\\") {
				newPath = path;
			}
			else {
				newPath = path.replace(/[\/\\]+$/, "");
			}
		}
		else {
			path = path.replace(/^[\/\\]+/, "");

			if(utilities.isNonEmptyString(path)) {
				if(newPath[newPath.length - 1] !== options.separator) {
					newPath += options.separator;
				}

				newPath += path;
			}
		}
	}

	return newPath.replace(/[\/\\]/g, options.separator);
};

/**
 * TODO_FUNC_DESC
 *
 * @function createQueryString
 * @param {Object} value - An object to convert into a query string based on the key / value pairs.
 * @param {boolean} [includeQuestionMark=false] - Determines if a question mark should be included at the beginning of the query string.
 * @returns {string} A query string created from the specified object value with all keys and values safely URI encoded.
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.createQueryString()); // TODO_RESULT
 */
utilities.createQueryString = function createQueryString(value, includeQuestionMark) {
	if(!utilities.isObjectStrict(value)) {
		return "";
	}

	var parameters = Object.keys(value).map(function(key) {
		return encodeURIComponent(key) + "=" + encodeURIComponent(utilities.toString(value[key]));
	}).join("&");

	if(parameters.length === 0) {
		return "";
	}

	return (utilities.parseBoolean(includeQuestionMark, false) ? "?" : "") + parameters;
};

/**
 * TODO_FUNC_DESC
 *
 * @function createRange
 * @param {number} start - An integer number which decides what value to start the range at. If no end value is specified, this value is treated as the end of the range while the start is defaulted to 0.
 * @param {number} [end] - An integer which determines what value the range should end at.
 * @returns {number[]} TODO_RETURN_DESC
 * @deprecated Determined to no longer be useful, will be removed in a future release.
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.createRange()); // TODO_RESULT
 */
utilities.createRange = function createRange(start, end) {
	var formattedStart = utilities.parseInteger(start);
	var formattedEnd = utilities.parseInteger(end);

	if(arguments.length === 1) {
		formattedEnd = formattedStart;
		formattedStart = 0;
	}

	if(utilities.isInvalidNumber(formattedStart) || utilities.isInvalidNumber(formattedEnd) || formattedStart > formattedEnd) {
		return [];
	}

	var range = [];

	for(var i = formattedStart; i <= formattedEnd; i++) {
		range.push(i);
	}

	return range;
};

/**
 * TODO_FUNC_DESC
 *
 * @function futureMonths
 * @param {Date} date - The date to start at when determining which months to exclude from the list.
 * @param {boolean} [prependZero=false] - Determines if a zero should be prepended to each entry in the array.
 * @returns {(string[]|null)} An array of numbers as strings each optionally padded with a leading zero, representing all of the month numbers which come after the specified date.
 * @deprecated Determined to no longer be useful, will be removed in a future release.
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.futureMonths("June 18, 1987", true)); // ["07", "08", "09", "10", "11", "12"]
 * console.log(utilities.futureMonths(1586022503089)); // ["5", "6", 7", "8", "9", "10", "11", "12"]
 * console.log(utilities.futureMonths("When?")); // null
 */
utilities.futureMonths = function futureMonths(date, prependZero) {
	date = utilities.parseDate(date);

	if(date === null) {
		return null;
	}

	var currentDate = new Date();
	var month = 0;

	if(date.getFullYear() === currentDate.getFullYear()) {
		month = currentDate.getMonth();
	}

	var months = [];

	prependZero = utilities.parseBoolean(prependZero, false);

	for(var i = 0; i < 12; i++) {
		if(i >= month) {
			if(prependZero) {
				months.push((i <= 8 ? "0" : "") + (i + 1));
			}
			else {
				months.push((i + 1).toString());
			}
		}
	}

	return months;
};

/**
 * TODO_FUNC_DESC
 *
 * @function visibleElements
 * @param {Object[]} elements - TODO_ARG_DESC.
 * @returns {Object[]} TODO_RETURN_DESC
 * @deprecated Use Array.filter() instead. Will be removed in a future release.
 * @see {@link module:utilities.hiddenElements|hiddenElements}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.visibleElements()); // TODO_RESULT
 */
utilities.visibleElements = function visibleElements(elements) {
	if(!Array.isArray(elements)) {
		return [];
	}

	var visibleElements = [];

	for(var i = 0; i < elements.length; i++) {
		if(utilities.isVisible(elements[i])) {
			visibleElements.push(elements[i]);
		}
	}

	return visibleElements;
};

/**
 * TODO_FUNC_DESC
 *
 * @function hiddenElements
 * @param {Object[]} elements - TODO_ARG_DESC.
 * @returns {Object[]} TODO_RETURN_DESC
 * @deprecated Use Array.filter() instead. Will be removed in a future release.
 * @see {@link module:utilities.visibleElements|visibleElements}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.hiddenElements()); // TODO_RESULT
 */
utilities.hiddenElements = function hiddenElements(elements) {
	if(!Array.isArray(elements)) {
		return [];
	}

	var hiddenElements = [];

	for(var i = 0; i < elements.length; i++) {
		if(utilities.isHidden(elements[i])) {
			hiddenElements.push(elements[i]);
		}
	}

	return hiddenElements;
};

/**
 * TODO_FUNC_DESC
 *
 * @function enabledElements
 * @param {Object[]} elements - TODO_ARG_DESC.
 * @returns {Object[]} TODO_RETURN_DESC
 * @deprecated Use Array.filter() instead. Will be removed in a future release.
 * @see {@link module:utilities.disabledElements|disabledElements}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.enabledElements()); // TODO_RESULT
 */
utilities.enabledElements = function enabledElements(elements) {
	if(!Array.isArray(elements)) {
		return [];
	}

	var enabledElements = [];

	for(var i = 0; i < elements.length; i++) {
		if(utilities.isEnabled(elements[i])) {
			enabledElements.push(elements[i]);
		}
	}

	return enabledElements;
};

/**
 * TODO_FUNC_DESC
 *
 * @function disabledElements
 * @param {Object[]} elements - TODO_ARG_DESC.
 * @returns {Object[]} TODO_RETURN_DESC
 * @deprecated Use Array.filter() instead. Will be removed in a future release.
 * @see {@link module:utilities.enabledElements|enabledElements}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.disabledElements()); // TODO_RESULT
 */
utilities.disabledElements = function disabledElements(elements) {
	if(!Array.isArray(elements)) {
		return [];
	}

	var disabledElements = [];

	for(var i = 0; i < elements.length; i++) {
		if(utilities.isDisabled(elements[i])) {
			disabledElements.push(elements[i]);
		}
	}

	return disabledElements;
};

/**
 * TODO_FUNC_DESC
 *
 * @function elementsWithAttribute
 * @param {Object[]} elements - TODO_ARG_DESC.
 * @param {string} attribute - TODO_ARG_DESC.
 * @param {boolean} [hasAttribute=true] - TODO_ARG_DESC.
 * @returns {Object[]} TODO_RETURN_DESC
 * @deprecated Use Array.filter() instead. Will be removed in a future release.
 * @see {@link module:utilities.elementsWithoutAttribute|elementsWithoutAttribute}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.elementsWithAttribute()); // TODO_RESULT
 */
utilities.elementsWithAttribute = function elementsWithAttribute(elements, attribute, hasAttribute) {
	if(!Array.isArray(elements) || utilities.isEmptyString(attribute)) {
		return [];
	}

	var element = null;
	var filteredElements = [];

	attribute = attribute.trim();
	hasAttribute = utilities.parseBoolean(hasAttribute, true);

	for(var i = 0; i < elements.length; i++) {
		element = elements[i];

		if(!utilities.isObject(element)) {
			continue;
		}

		if(utilities.isInvalid(elements[i][attribute])) {
			if(!hasAttribute) {
				filteredElements.push(element);
			}
		}
		else {
			if(hasAttribute) {
				filteredElements.push(elements[i]);
			}
		}
	}

	return filteredElements;
};

/**
 * TODO_FUNC_DESC
 *
 * @function elementsWithoutAttribute
 * @param {Object[]} elements - TODO_ARG_DESC.
 * @param {string} attribute - TODO_ARG_DESC.
 * @returns {Object[]} TODO_RETURN_DESC
 * @deprecated Use Array.filter() instead. Will be removed in a future release.
 * @see {@link module:utilities.elementsWithAttribute|elementsWithAttribute}
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.elementsWithoutAttribute()); // TODO_RESULT
 */
utilities.elementsWithoutAttribute = function elementsWithoutAttribute(elements, attribute) {
	return utilities.elementsWithAttribute(elements, attribute, false);
};

/**
 * TODO_FUNC_DESC
 *
 * @function matchAttribute
 * @param {Object} element - TODO_ARG_DESC.
 * @param {string} attribute - TODO_ARG_DESC.
 * @param {any} value - TODO_ARG_DESC.
 * @returns {boolean} TODO_RETURN_DESC
 * @deprecated Use Array.filter() instead. Will be removed in a future release.
 * @since 1.0.0
 * @memberOf module:utilities
 * @example
 * console.log(utilities.matchAttribute()); // TODO_RESULT
 */
utilities.matchAttribute = function matchAttribute(element, attribute, value) {
	if(!utilities.isObject(element)) {
		return false;
	}

	if(utilities.isEmptyString(attribute)) {
		return true;
	}

	return element[attribute.trim()] === value;
};

/**
 * TODO_FUNC_DESC
 *
 * @function generateVersions
 * @param {string} version - TODO_ARG_DESC.
 * @param {string|null} [prefix=null] - TODO_ARG_DESC.
 * @param {string|null} [suffix=null] - TODO_ARG_DESC.
 * @returns {string[]} TODO_RETURN_DESC
 * @see {@link module:utilities.parseVersion|parseVersion}
 * @see {@link module:utilities.compareVersions|compareVersions}
 * @since 1.0.3
 * @memberOf module:utilities
 * @example
 * console.log(utilities.generateVersions()); // TODO_RESULT
 */
utilities.generateVersions = function generateVersions(version, prefix, suffix) {
	version = utilities.parseVersion(version);

	if(version === null) {
		return null;
	}

	prefix = utilities.trimString(prefix);
	suffix = utilities.trimString(suffix);

	var versions = [];
	var value = null;

	for(var i = 0; i < version.length; i++) {
		value = "";

		if(utilities.isNonEmptyString(prefix)) {
			value += prefix;
		}

		for(var j = 0; j <= i; j++) {
			if(j > 0) {
				value += "_";
			}

			value += version[j];
		}

		if(utilities.isNonEmptyString(suffix)) {
			value += suffix;
		}

		versions.push(value);
	}

	return versions;
};

/**
 * TODO_FUNC_DESC
 *
 * @function parseVersion
 * @param {string|number} value - TODO_ARG_DESC.
 * @param {boolean} [trimTrailingZeroes=false] - TODO_ARG_DESC.
 * @returns {string[]|null} TODO_RETURN_DESC
 * @see {@link module:utilities.generateVersions|generateVersions}
 * @see {@link module:utilities.compareVersions|compareVersions}
 * @since 1.0.3
 * @memberOf module:utilities
 * @example
 * console.log(utilities.parseVersion()); // TODO_RESULT
 */
utilities.parseVersion = function parseVersion(value, trimTrailingZeroes) {
	var formattedValue = utilities.isValidNumber(value) ? value.toString() : value;

	if(typeof formattedValue !== "string") {
		return null;
	}

	var version = [];
	var versionData = formattedValue.match(/[^. \t]+/g);

	if(versionData === null || versionData.length === 0) {
		return null;
	}

	var part = null;

	for(var i = 0; i < versionData.length; i++) {
		if(utilities.isInteger(versionData[i])) {
			part = utilities.parseInteger(versionData[i]);

			if(utilities.isInvalidNumber(part) || part < 0) {
				continue;
			}

			version.push(part.toString());
		}
		else {
			version.push(versionData[i]);
		}
	}

	if(utilities.parseBoolean(trimTrailingZeroes, false)) {
		while(true) {
			if(version.length <= 1) {
				break;
			}

			if(version[version.length - 1] === "0") {
				version.pop();
			}
			else {
				break;
			}
		}
	}

	return version.length === 0 ? null : version;
};

/**
 * TODO_FUNC_DESC
 *
 * @function compareVersions
 * @param {string} v1 - TODO_ARG_DESC.
 * @param {string} v2 - TODO_ARG_DESC.
 * @param {boolean} [caseSensitive=false] - TODO_ARG_DESC.
 * @returns {number} TODO_RETURN_DESC
 * @throws Will throw an error if an invalid or empty version is passed in as an argument.
 * @see {@link module:utilities.generateVersions|generateVersions}
 * @see {@link module:utilities.parseVersion|parseVersion}
 * @since 1.0.3
 * @memberOf module:utilities
 * @example
 * console.log(utilities.compareVersions()); // TODO_RESULT
 */
utilities.compareVersions = function compareVersions(v1, v2, caseSensitive) {
	caseSensitive = utilities.parseBoolean(caseSensitive, false);

	v1 = utilities.parseVersion(v1);

	if(v1 === null) {
		throw new Error("Cannot compare invalid or empty first version.");
	}

	v2 = utilities.parseVersion(v2);

	if(v2 === null) {
		throw new Error("Cannot compare invalid or empty second version.");
	}

	var index = 0;

	while(true) {
		if(index >= v1.length) {
			if(v1.length === v2.length) {
				return 0;
			}

			for(var i = index; i < v2.length; i++) {
				if(v2[i] !== "0") {
					return -1;
				}
			}

			return 0;
		}

		if(index >= v2.length) {
			for(var i = index; i < v1.length; i++) {
				if(v1[i] !== "0") {
					return 1;
				}
			}

			return 0;
		}

		var formattedA = utilities.parseInteger(v1[index]);
		var formattedB = utilities.parseInteger(v2[index]);

		if(utilities.isInvalidNumber(formattedA)) {
			formattedA = caseSensitive ? v1[index] : v1[index].toUpperCase();
		}

		if(utilities.isInvalidNumber(formattedB)) {
			formattedB = caseSensitive ? v2[index] : v2[index].toUpperCase();
		}

		if(Number.isInteger(formattedA)) {
			if(!Number.isInteger(formattedB)) {
				return -1;
			}
		}
		else {
			if(Number.isInteger(formattedB)) {
				return 1;
			}
		}

		if(formattedA > formattedB) {
			return 1;
		}
		else if(formattedA < formattedB) {
			return -1;
		}

		index++;
	}
};

module.exports = utilities;
