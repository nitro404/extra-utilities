if(typeof require !== "undefined") {
	if(typeof validator === "undefined") {
		global.validator = require("validator");
	}

	if(typeof changeCase === "undefined") {
		global.changeCase = require("change-case-bundled");
	}
}

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
	swap: changeCase.swapCase,
	title: changeCase.titleCase,
	upper: changeCase.upperCase,
	upperFirst: changeCase.upperCaseFirst
};

utilities.isValid = function isValid(value) {
	return value !== undefined && value !== null;
};

utilities.isInvalid = function isInvalid(value) {
	return value === undefined || value === null;
};

utilities.isBoolean = function isBoolean(value, allowObjects) {
	return value === true || value === false || (!!allowObjects && value instanceof Boolean);
};

utilities.isValidNumber = function isValidNumber(value) {
	return typeof value === "number" && !isNaN(value) && value !== -Infinity && value !== Infinity;
};

utilities.isInvalidNumber = function isInvalidNumber(value) {
	return typeof value !== "number" || isNaN(value) || value === -Infinity || value === Infinity;
};

utilities.isEmptyString = function isEmptyString(value, trim) {
	return typeof value !== "string" || (utilities.parseBoolean(trim, true) ? value.trim().length === 0 : value.length === 0);
};

utilities.isNonEmptyString = function isNonEmptyString(value, trim) {
	return typeof value === "string" && (utilities.parseBoolean(trim, true) ? value.trim().length !== 0 : value.length !== 0);
};

utilities.isObject = function isObject(value, strict) {
	return value !== undefined && (strict ? value !== null && value.constructor === Object : value instanceof Object && !(value instanceof Function));
};

utilities.isObjectStrict = function isObjectStrict(value) {
	return value !== undefined && value !== null && value.constructor === Object;
};

utilities.isEmptyObject = function isEmptyObject(value) {
	return value !== undefined && value !== null && value.constructor === Object && Object.keys(value).length === 0;
};

utilities.isNonEmptyObject = function isNonEmptyObject(value) {
	return value !== undefined && value !== null && value.constructor === Object && Object.keys(value).length !== 0;
};

utilities.isEmptyArray = function isEmptyArray(value) {
	return Array.isArray(value) ? value.length === 0 : true;
};

utilities.isNonEmptyArray = function isNonEmptyArray(value) {
	return Array.isArray(value) && value.length !== 0;
};

utilities.isDate = function isDate(value) {
	return value instanceof Date;
};

utilities.isError = function isError(value) {
	return value instanceof Error;
};

utilities.isRegularExpression = function isRegularExpression(value) {
	return value instanceof RegExp;
};

utilities.isFunction = function isFunction(value) {
	return value instanceof Function;
};

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

utilities.equalsIgnoreCase = function equalsIgnoreCase(stringA, stringB) {
	if(typeof stringA !== "string" || typeof stringB !== "string") {
		return false;
	}

	return stringA.localeCompare(stringB, undefined, { sensitivity: "accent" }) === 0;
};

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

utilities.parseInteger = function parseInteger(value, defaultValue) {
	var newValue = NaN;

	if(typeof value === "number") {
		newValue = parseInt(value);
	}
	else if(typeof value === "string") {
		if(validator.isFloat(value)) {
			newValue = parseInt(value);
		}
	}

	if(utilities.isInvalidNumber(newValue)) {
		defaultValue = parseInt(defaultValue);

		return utilities.isValidNumber(defaultValue) ? defaultValue : NaN;
	}

	return newValue;
};

utilities.parseFloatingPointNumber = function parseFloatingPointNumber(value, defaultValue) {
	var newValue = NaN;

	if(typeof value === "number") {
		newValue = value;
	}
	else if(typeof value === "string") {
		if(validator.isFloat(value)) {
			newValue = parseFloat(value);
		}
	}

	if(utilities.isInvalidNumber(newValue)) {
		return utilities.isValidNumber(defaultValue) ? defaultValue : NaN;
	}

	return newValue;
};

utilities.parseDate = function parseDate(value, defaultValue) {
	if(!utilities.isDate(defaultValue)) {
		defaultValue = null;
	}

	if(typeof value === "number") {
		if(utilities.isInvalidNumber(value) || !Number.isInteger(value)) {
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

		if(validator.isInt(formattedValue)) {
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

utilities.parseTime = function parseTime(value, throwErrors) {
	throwErrors = utilities.parseBoolean(throwErrors);

	if(utilities.isEmptyString(value)) {
		if(throwErrors) {
			throw new Error("Invalid or empty time value.");
		}

		return null;
	}

	var formattedValue = value.trim();
	var hour = null;
	var minutes = null;
	var regularTime = formattedValue.match(/^[ \t]*(([2-9]|[1][0-2]?)(:([0-5][0-9]))?[ \t]*([ap]m))[ \t]*$/i);

	if(regularTime) {
		var regularHour = utilities.parseInteger(utilities.trimLeadingZeroes(regularTime[2]));

		if(utilities.isInvalidNumber(regularHour)) {
			if(throwErrors) {
				throw new Error("Invalid regular hour: \"" + regularTime[2] + "\".");
			}

			return null;
		}

		minutes = utilities.parseInteger(utilities.trimLeadingZeroes(regularTime[4]));

		if(utilities.isInvalidNumber(minutes)) {
			minutes = 0;
		}

		var period = regularTime[5].toUpperCase();
		var morning = period === "AM" ? true : (period === "PM" ? false : null);

		if(morning === null) {
			if(throwErrors) {
				throw new Error("Invalid period: \"" + regularTime[5] + "\".");
			}

			return null;
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
				if(throwErrors) {
					throw new Error("Invalid military time: \"" + formattedValue + "\".");
				}

				return null;
			}

			hour = utilities.parseInteger(utilities.trimLeadingZeroes(militaryHour));

			if(utilities.isInvalidNumber(hour)) {
				if(throwErrors) {
					throw new Error("Invalid military time hour: \"" + militaryHour + "\".");
				}

				return null;
			}

			minutes = utilities.parseInteger(utilities.trimLeadingZeroes(militaryMinutes));

			if(utilities.isInvalidNumber(minutes)) {
				if(throwErrors) {
					throw new Error("Invalid military time minutes: \"" + militaryMinutes + "\".");
				}

				return null;
			}

			if(hour === 24 && minutes === 0) {
				hour = 0;
			}
		}
		else {
			if(throwErrors) {
				throw new Error("Invalid time: \"" + formattedValue + "\".");
			}

			return null;
		}
	}

	if(hour < 0 || hour > 23) {
		if(throwErrors) {
			throw new Error("Time hour is out of range (0 - 23): \"" + hour + "\".");
		}

		return null;
	}
	else if(minutes < 0 || minutes > 59) {
		if(throwErrors) {
			throw new Error("Time minutes is out of range (0 - 59): \"" + minutes + "\".");
		}

		return null;
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

	if(throwErrors) {
		return new RegExp(regExpData[1], regExpData[2]);
	}

	try {
		return new RegExp(regExpData[1], regExpData[2]);
	}
	catch(error) {
		return null;
	}
};

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

							format.case = changeCase.camel(format.case.trim());

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

utilities.leftShift = function leftShift(number, bits) {
	if(!Number.isInteger(number) || !Number.isInteger(bits)) {
		return NaN;
	}

	return number * Math.pow(2, bits);
};

utilities.rightShift = function rightShift(number, bits) {
	if(!Number.isInteger(number) || !Number.isInteger(bits)) {
		return NaN;
	}

	return number / Math.pow(2, bits);
};

utilities.trimString = function trimString(value, defaultValue) {
	return typeof value === "string" ? value.trim() : (defaultValue === undefined ? null : defaultValue);
};

utilities.trimNullTerminatedString = function trimNullTerminatedString(value, defaultValue) {
	if(typeof value !== "string") {
		return defaultValue === undefined ? null : defaultValue;
	}

	var nullTerminatorIndex = value.indexOf("\0");

	if(nullTerminatorIndex >= 0) {
		return value.substr(0, nullTerminatorIndex);
	}

	return value;
};

utilities.trimWhitespace = function trimWhitespace(value, trimNewlines) {
	if(typeof value !== "string") {
		return null;
	}

	var trimmedString = value.replace(/^[ \t]+|[ \t]+$/gm, "");

	if(utilities.parseBoolean(trimNewlines, false)) {
		trimmedString = trimmedString.replace(/\r\n?|\n/g, "");
	}

	return trimmedString;
};

utilities.trimTrailingNewlines = function trimTrailingNewlines(value) {
	if(typeof value !== "string") {
		return null;
	}

	if(utilities.isEmptyString(value)) {
		return value;
	}

	return value.replace(/[ \t\r\n]+$/, "");
};

utilities.replaceNonBreakingSpaces = function replaceNonBreakingSpaces(value) {
	return typeof value === "string" ? value.replace(/&nbsp;/gi, " ") : null;
};

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
	else if(utilities.isDate(value)) {
		return value.toString();
	}
	else if(utilities.isRegularExpression(value)) {
		var flags = "";

		for(var flag in regExpFlags) {
			if(value[flag]) {
				flags += regExpFlags[flag];
			}
		}

		return "/" + value.source + "/" + flags;
	}
	else if(utilities.isFunction(value)) {
		return value.toString();
	}
	else if(utilities.isError(value)) {
		var error = { message: value.message };

		for(var attribute in value) {
			error[attribute] = value[attribute];
		}

		return JSON.stringify(error);
	}

	return JSON.stringify(value);
};

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

utilities.createError = function createError(message, status) {
	var error = new Error(message);
	error.status = utilities.parseInteger(status, 500);
	return error;
};

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

utilities.prependSlash = function prependSlash(value) {
	if(typeof value !== "string") {
		return null;
	}

	var formattedValue = value.trim();

	if(formattedValue.length === 0) {
		return formattedValue;
	}

	if(formattedValue[0] !== "/" && formattedValue[0] !== "\\") {
		formattedValue = "/" + formattedValue;
	}

	return formattedValue;
};

utilities.appendSlash = function appendSlash(value) {
	if(typeof value !== "string") {
		return null;
	}

	var formattedValue = value.trim();

	if(formattedValue.length === 0) {
		return formattedValue;
	}

	if(formattedValue[formattedValue.length - 1] !== "/" && formattedValue[formattedValue.length - 1] !== "\\") {
		formattedValue += "/";
	}

	return formattedValue;
};

utilities.joinPaths = function joinPaths(base, path) {
	var formattedBase = typeof base === "string" ? base.trim().replace(/[\/\\]+$/, "") : null;
	var formattedPath = typeof path === "string" ? path.trim().replace(/^[\/\\]+/, "") : null;
	var newPath = "";

	if(utilities.isNonEmptyString(formattedBase)) {
		newPath += formattedBase;

		if(utilities.isNonEmptyString(formattedPath)) {
			newPath += "/";
		}
	}

	if(utilities.isNonEmptyString(formattedPath)) {
		newPath += formattedPath;
	}

	return newPath;
};

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
				months.push(i + 1);
			}
		}
	}

	return months;
};

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

utilities.elementsWithoutAttribute = function elementsWithoutAttribute(elements, attribute) {
	return utilities.elementsWithAttribute(elements, attribute, false);
};

utilities.matchAttribute = function matchAttribute(element, attribute, value) {
	if(!utilities.isObject(element)) {
		return false;
	}

	if(utilities.isEmptyString(attribute)) {
		return true;
	}

	return element[attribute.trim()] === value;
};

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
		if(validator.isInt(versionData[i])) {
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

utilities.compareVersions = function compareVersions(v1, v2, caseSensitive, throwErrors) {
	caseSensitive = utilities.parseBoolean(caseSensitive, false);
	throwErrors = utilities.parseBoolean(throwErrors, false);

	v1 = utilities.parseVersion(v1);

	if(v1 === null) {
		if(throwErrors) {
			throw new Error("Cannot compare invalid or empty first version.");
		}

		return null;
	}

	v2 = utilities.parseVersion(v2);

	if(v2 === null) {
		if(throwErrors) {
			throw new Error("Cannot compare invalid or empty second version.");
		}

		return null;
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

return utilities;
