(function(global, factory) {
	typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() :
	typeof define === "function" && define.amd ? define(factory) :
	(global.utilities = factory());
} (this, function() {

	"use strict";

	if(typeof require !== "undefined") {
		if(typeof validator === "undefined") {
			global.validator = require("validator");
		}

		if(typeof changeCase === "undefined") {
			global.changeCase = require("change-case-bundled");
		}
	}

	var utilities = { };

	var postalCodeValidators = {
		UK: /^([A-Z]){1}([0-9][0-9]|[0-9]|[A-Z][0-9][A-Z]|[A-Z][0-9][0-9]|[A-Z][0-9]|[0-9][A-Z]){1}([ ])?([0-9][A-z][A-z]){1}$/i,
		JE: /^JE\d[\dA-Z]?[ ]?\d[ABD-HJLN-UW-Z]{2}$/,
		GG: /^GY\d[\dA-Z]?[ ]?\d[ABD-HJLN-UW-Z]{2}$/,
		IM: /^IM\d[\dA-Z]?[ ]?\d[ABD-HJLN-UW-Z]{2}$/,
		US: /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/,
		CA: /^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/i,
		DE: /^\d{5}$/,
		JP: /^\d{3}-\d{4}$/,
		FR: /^\d{2}[ ]?\d{3}$/,
		AU: /^\d{4}$/,
		IT: /^\d{5}$/,
		CH: /^\d{4}$/,
		AT: /^\d{4}$/,
		ES: /^\d{5}$/,
		NL: /^\d{4}[ ]?[A-Z]{2}$/,
		BE: /^\d{4}$/,
		DK: /^\d{4}$/,
		SE: /^\d{3}[ ]?\d{2}$/,
		NO: /^\d{4}$/,
		BR: /^\d{5}[\-]?\d{3}$/,
		PT: /^\d{4}([\-]\d{3})?$/,
		FI: /^\d{5}$/,
		AX: /^22\d{3}$/,
		KR: /^\d{3}[\-]\d{3}$/,
		CN: /^\d{6}$/,
		TW: /^\d{3}(\d{2})?$/,
		SG: /^\d{6}$/,
		DZ: /^\d{5}$/,
		AD: /^AD\d{3}$/,
		AR: /^([A-HJ-NP-Z])?\d{4}([A-Z]{3})?$/,
		AM: /^(37)?\d{4}$/,
		AZ: /^\d{4}$/,
		BH: /^((1[0-2]|[2-9])\d{2})?$/,
		BD: /^\d{4}$/,
		BB: /^(BB\d{5})?$/,
		BY: /^\d{6}$/,
		BM: /^[A-Z]{2}[ ]?[A-Z0-9]{2}$/,
		BA: /^\d{5}$/,
		IO: /^BBND 1ZZ$/,
		BN: /^[A-Z]{2}[ ]?\d{4}$/,
		BG: /^\d{4}$/,
		KH: /^\d{5}$/,
		CV: /^\d{4}$/,
		CL: /^\d{7}$/,
		CR: /^\d{4,5}|\d{3}-\d{4}$/,
		HR: /^\d{5}$/,
		CY: /^\d{4}$/,
		CZ: /^\d{3}[ ]?\d{2}$/,
		DO: /^\d{5}$/,
		EC: /^([A-Z]\d{4}[A-Z]|(?:[A-Z]{2})?\d{6})?$/,
		EG: /^\d{5}$/,
		EE: /^\d{5}$/,
		FO: /^\d{3}$/,
		GE: /^\d{4}$/,
		GR: /^\d{3}[ ]?\d{2}$/,
		GL: /^39\d{2}$/,
		GT: /^\d{5}$/,
		HT: /^\d{4}$/,
		HN: /^(?:\d{5})?$/,
		HU: /^\d{4}$/,
		IS: /^\d{3}$/,
		IN: /^\d{6}$/,
		ID: /^\d{5}$/,
		IL: /^\d{5}$/,
		JO: /^\d{5}$/,
		KZ: /^\d{6}$/,
		KE: /^\d{5}$/,
		KW: /^\d{5}$/,
		LA: /^\d{5}$/,
		LV: /^\d{4}$/,
		LB: /^(\d{4}([ ]?\d{4})?)?$/,
		LI: /^(948[5-9])|(949[0-7])$/,
		LT: /^\d{5}$/,
		LU: /^\d{4}$/,
		MK: /^\d{4}$/,
		MY: /^\d{5}$/,
		MV: /^\d{5}$/,
		MT: /^[A-Z]{3}[ ]?\d{2,4}$/,
		MU: /^(\d{3}[A-Z]{2}\d{3})?$/,
		MX: /^\d{5}$/,
		MD: /^\d{4}$/,
		MC: /^980\d{2}$/,
		MA: /^\d{5}$/,
		NP: /^\d{5}$/,
		NZ: /^\d{4}$/,
		NI: /^((\d{4}-)?\d{3}-\d{3}(-\d{1})?)?$/,
		NG: /^(\d{6})?$/,
		OM: /^(PC )?\d{3}$/,
		PK: /^\d{5}$/,
		PY: /^\d{4}$/,
		PH: /^\d{4}$/,
		PL: /^\d{2}-\d{3}$/,
		PR: /^00[679]\d{2}([ \-]\d{4})?$/,
		RO: /^\d{6}$/,
		RU: /^\d{6}$/,
		SM: /^4789\d$/,
		SA: /^\d{5}$/,
		SN: /^\d{5}$/,
		SK: /^\d{3}[ ]?\d{2}$/,
		SI: /^\d{4}$/,
		ZA: /^\d{4}$/,
		LK: /^\d{5}$/,
		TJ: /^\d{6}$/,
		TH: /^\d{5}$/,
		TN: /^\d{4}$/,
		TR: /^\d{5}$/,
		TM: /^\d{6}$/,
		UA: /^\d{5}$/,
		UY: /^\d{5}$/,
		UZ: /^\d{6}$/,
		VA: /^00120$/,
		VE: /^\d{4}$/,
		ZM: /^\d{5}$/,
		AS: /^96799$/,
		CC: /^6799$/,
		CK: /^\d{4}$/,
		RS: /^\d{6}$/,
		ME: /^8\d{4}$/,
		CS: /^\d{5}$/,
		YU: /^\d{5}$/,
		CX: /^6798$/,
		ET: /^\d{4}$/,
		FK: /^FIQQ 1ZZ$/,
		NF: /^2899$/,
		FM: /^(9694[1-4])([ \-]\d{4})?$/,
		GF: /^9[78]3\d{2}$/,
		GN: /^\d{3}$/,
		GP: /^9[78][01]\d{2}$/,
		GS: /^SIQQ 1ZZ$/,
		GU: /^969[123]\d([ \-]\d{4})?$/,
		GW: /^\d{4}$/,
		HM: /^\d{4}$/,
		IQ: /^\d{5}$/,
		KG: /^\d{6}$/,
		LR: /^\d{4}$/,
		LS: /^\d{3}$/,
		MG: /^\d{3}$/,
		MH: /^969[67]\d([ \-]\d{4})?$/,
		MN: /^\d{6}$/,
		MP: /^9695[012]([ \-]\d{4})?$/,
		MQ: /^9[78]2\d{2}$/,
		NC: /^988\d{2}$/,
		NE: /^\d{4}$/,
		VI: /^008(([0-4]\d)|(5[01]))([ \-]\d{4})?$/,
		PF: /^987\d{2}$/,
		PG: /^\d{3}$/,
		PM: /^9[78]5\d{2}$/,
		PN: /^PCRN 1ZZ$/,
		PW: /^96940$/,
		RE: /^9[78]4\d{2}$/,
		SH: /^(ASCN|STHL) 1ZZ$/,
		SJ: /^\d{4}$/,
		SO: /^\d{5}$/,
		SZ: /^[HLMS]\d{3}$/,
		TC: /^TKCA 1ZZ$/,
		WF: /^986\d{2}$/,
		XK: /^\d{5}$/,
		YT: /^976\d{2}$/,
		INTL: /^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/i
	};

	utilities.isValid = function(value) {
		return value !== undefined && value !== null;
	};

	utilities.isInvalid = function(value) {
		return value === undefined || value === null;
	};

	utilities.isBoolean = function(value, allowObjects) {
		return value === true || value === false || (!!allowObjects && value instanceof Boolean);
	};

	utilities.isValidNumber = function(value) {
		return typeof value === "number" && !isNaN(value) && value !== -Infinity && value !== Infinity;
	};

	utilities.isInvalidNumber = function(value) {
		return typeof value !== "number" || isNaN(value) || value === -Infinity || value === Infinity;
	};

	utilities.isEmptyString = function(value, trim) {
		return typeof value !== "string" || (utilities.parseBoolean(trim, true) ? value.trim().length === 0 : value.length === 0);
	};

	utilities.isNonEmptyString = function(value, trim) {
		return typeof value === "string" && (utilities.parseBoolean(trim, true) ? value.trim().length !== 0 : value.length !== 0);
	};

	utilities.isObject = function(value, strict) {
		return value !== undefined && (strict ? value !== null && value.constructor === Object : value instanceof Object && !(value instanceof Function));
	};

	utilities.isObjectStrict = function(value) {
		return value !== undefined && value !== null && value.constructor === Object;
	};

	utilities.isEmptyObject = function(value) {
		return value !== undefined && value !== null && value.constructor === Object && Object.keys(value).length === 0;
	};

	utilities.isNonEmptyObject = function(value) {
		return value !== undefined && value !== null && value.constructor === Object && Object.keys(value).length !== 0;
	};

	utilities.isEmptyArray = function(value) {
		if(utilities.isInvalid(value)) {
			return true;
		}

		if(!Array.isArray(value)) {
			return false;
		}

		return value.length === 0;
	};

	utilities.isNonEmptyArray = function(value) {
		return Array.isArray(value) && value.length !== 0;
	};

	utilities.isDate = function(value) {
		return value instanceof Date;
	};

	utilities.isRegularExpression = function(value) {
		return value instanceof RegExp;
	};

	utilities.isFunction = function(value) {
		return value instanceof Function;
	};

	utilities.isComment = function(value, comment) {
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

	utilities.isVisible = function(element) {
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

	utilities.isHidden = function(element) {
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

	utilities.isEnabled = function(element) {
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

	utilities.isDisabled = function(element) {
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

	utilities.parseBoolean = function(value, defaultValue) {
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
		else {
			if(formattedValue === "true" || formattedValue === "yes" || formattedValue === "on") {
				return true;
			}
			else if(formattedValue === "false" || formattedValue === "no" || formattedValue === "off") {
				return false;
			}

			return defaultValue;
		}
	};

	utilities.parseInteger = function(value, defaultValue) {
		var newValue = NaN;

		if(typeof value === "number") {
			newValue = parseInt(value);
		}
		else if(typeof value === "string") {
			if(validator.isFloat(value)) {
				newValue = parseInt(value);
			}
		}

		if(utilities.isInvalidNumber(newValue) && utilities.isValidNumber(defaultValue)) {
			return parseInt(defaultValue);
		}

		return newValue;
	};

	utilities.parseFloatingPointNumber = function(value, defaultValue) {
		var newValue = NaN;

		if(typeof value === "number") {
			newValue = value;
		}
		else if(typeof value === "string") {
			if(validator.isFloat(value)) {
				newValue = parseFloat(value);
			}
		}

		if(utilities.isInvalidNumber(newValue) && utilities.isValidNumber(defaultValue)) {
			return defaultValue;
		}

		return newValue;
	};

	utilities.parseDate = function(value) {
		if(typeof value === "number") {
			if(utilities.isInvalidNumber(value)) {
				return null;
			}

			return new Date(parseInt(value));
		}
		else if(typeof value === "string") {
			var formattedValue = value.trim();

			if(formattedValue.length === 0) {
				return null;
			}

			var timestamp = null;

			if(validator.isInt(formattedValue)) {
				timestamp = parseInt(formattedValue);
			}
			else {
				timestamp = Date.parse(formattedValue);
			}

			if(utilities.isInvalidNumber(timestamp)) {
				return null;
			}

			return new Date(timestamp);
		}
		else if(value instanceof Date) {
			return value;
		}

		return null;
	};

	utilities.parsePostalCode = function(value) {
		if(utilities.isEmptyString(value)) {
			return null;
		}

		var postalCodeData = value.match(/[ \t]*([A-Z][0-9][A-Z])[_\- \t]?([0-9][A-Z][0-9])[ \t]*/i);

		if(!postalCodeData) {
			return null;
		}

		return (postalCodeData[1] + postalCodeData[2]).toUpperCase();
	};

	utilities.parseEmail = function(value) {
		if(utilities.isEmptyString(value)) {
			return null;
		}

		var emailData = value.trim().toLowerCase().match(/([^+@]+)(\+.*)?(@.+\..+)/);

		if(utilities.isInvalid(emailData) || emailData.length < 4) {
			return null;
		}

		return emailData[1] + emailData[3];
	};

	utilities.parseEmailDomain = function(value) {
		if(utilities.isEmptyString(value)) {
			return null;
		}

		var emailDomainData = value.trim().toLowerCase().match(/([^+@]+)(\+.*)?@(.+\..+)/);

		if(utilities.isInvalid(emailDomainData) || emailDomainData.length < 4) {
			return null;
		}

		return emailDomainData[3];
	};

	utilities.parseStringList = function(value) {
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

	utilities.parseRegularExpression = function(value) {
		if(utilities.isRegularExpression(value)) {
			return value;
		}

		if(utilities.isEmptyString(value)) {
			return null;
		}

		var regExpData = value.match(/\s*\/(.*)\/(.*)\s*/);

		if(!regExpData) {
			return null;
		}

		return new RegExp(regExpData[1], regExpData[2]);
	};

	utilities.parseYouTubeLink = function(value) {
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

	utilities.formatValue = function(value, format, options) {
		if(utilities.isObjectStrict(options)) {
			options = {
				throwErrors: utilities.parseBoolean(options.throwErrors, false),
				verbose: utilities.parseBoolean(options.verbose, true)
			};
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

		var formatTypes = ["boolean", "integer", "float", "number", "string", "object", "array", "date", "function"];

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
				if(format.type === "number") {
					format.type = "float";
				}
				else if(format.type === "string") {
					if(format.trim !== undefined) {
						var originalTrim = format.trim;

						format.trim = utilities.parseBoolean(format.trim);

						if(format.trim === null) {
							errorMessage = "Invalid optional trim format value - expected boolean, received \"" + utilities.toString(originalTrim) + "\".";
						}
					}

					if(utilities.isInvalid(errorMessage)) {
						if(format.case !== undefined) {
							if(utilities.isEmptyString(format.case)) {
								errorMessage = "Invalid optional case format value - expected non-empty string.";
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
							errorMessage = "Invalid optional strict format value - expected boolean, received \"" + utilities.toString(originalStrict) + "\".";
						}
					}

					if(utilities.isInvalid(errorMessage)) {
						if(format.order !== undefined) {
							var originalOrder = format.order;

							format.order = utilities.parseBoolean(format.order);

							if(format.order === null) {
								errorMessage = "Invalid optional order format value - expected boolean, received \"" + utilities.toString(originalOrder) + "\".";
							}
						}
					}

					if(utilities.isInvalid(errorMessage)) {
						if(format.removeExtra !== undefined) {
							var originalRemoveExtra = format.removeExtra;

							format.removeExtra = utilities.parseBoolean(format.removeExtra);

							if(format.removeExtra === null) {
								errorMessage = "Invalid optional removeExtra format value - expected boolean, received \"" + utilities.toString(originalRemoveExtra) + "\".";
							}
						}
					}
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
					errorMessage = "Invalid optional required format value - expected boolean, received \"" + utilities.toString(format.required) + "\".";
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
		else if(format.type === "object") {
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

			if(utilities.isInvalid(errorMessage)) {
				if(utilities.isObjectStrict(format.format)) {
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
		else if(format.type === "function") {
			formattedValue = value;

			if(!utilities.isFunction(formattedValue)) {
				errorMessage = "Invalid function value: \"" + utilities.toString(value) + "\".";
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
					var message = "Validation check failed!";

					if(options.throwErrors) {
						throw new Error(message);
					}
					else if(options.verbose) {
						console.error(message);
					}

					return null;
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

	utilities.formatObject = function(object, format, removeExtra, throwErrors) {
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

	utilities.formatStringList = function(value, stringify) {
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

	utilities.trimString = function(value, defaultValue) {
		return typeof value === "string" ? value.trim() : (defaultValue === undefined ? null : defaultValue);
	};

	utilities.trimWhitespace = function(value, trimNewlines) {
		if(typeof value !== "string") {
			return null;
		}

		var trimmedString = value.replace(/^[ \t]+|[ \t]+$/gm, "");

		if(utilities.parseBoolean(trimNewlines, false)) {
			trimmedString = trimmedString.replace(/\r\n?|\n/g, "");
		}

		return trimmedString;
	};

	utilities.replaceNonBreakingSpaces = function(value) {
		return typeof value === "string" ? value.replace(/&nbsp;/gi, " ") : value;
	};

	utilities.indentText = function(value, amount, indent, clearEmptyLines) {
		if(typeof value !== "string") {
			return null;
		}

		var formattedAmount = utilities.parseInteger(amount, 1);

		if(formattedAmount < 0) {
			formattedAmount = 1;
		}

		var formattedIndent = typeof indent === "string" ? indent : "\t";
		var indentation = "";

		for(var i = 0; i < formattedAmount; i++) {
			indentation += formattedIndent;
		}

		if(!utilities.parseBoolean(clearEmptyLines, true)) {
			return value.replace(/^/gm, indentation);
		}

		var line = null;
		var lines = value.split(/\r\n?|\n/g);
		var indentedParagraph = "";

		for(var i = 0; i < lines.length; i++) {
			line = lines[i];

			indentedParagraph += (utilities.isEmptyString(line) ? "" : indentation + line) + ((i < lines.length - 1) ? "\n" : "");
		}

		return indentedParagraph;
	};

	utilities.trimLeadingZeroes = function(value) {
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

	utilities.addLeadingZeroes = function(value, expectedLength) {
		if(utilities.isInvalid(value)) {
			return null;
		}

		var formattedValue = value.toString();
		var formattedExpectedLength = utilities.parseInteger(expectedLength);

		if(utilities.isInvalidNumber(formattedExpectedLength) || formattedExpectedLength < 0) {
			return formattedValue;
		}

		var numberOfZeroes = formattedExpectedLength - formattedValue.length;

		for(var i = 0; i < numberOfZeroes; i++) {
			formattedValue = "0" + formattedValue;
		}

		return formattedValue;
	};

	utilities.toString = function(value) {
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
		else if(utilities.isFunction(value)) {
			return value.toString();
		}
		else if(value instanceof Date) {
			return value.toString();
		}

		return JSON.stringify(value);
	};

	utilities.compareDates = function(a, b) {
		a = utilities.parseDate(a);
		b = utilities.parseDate(b);

		if(a === null && b === null) {
			return 0;
		}

		if(a === null) {
			return -1;
		}

		if(b === null) {
			return 1;
		}

		return a.getTime() - b.getTime();
	};

	utilities.compareCasePercentage = function(value) {
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

	utilities.reverseString = function(value) {
		if(typeof value !== "string") {
			return null;
		}

		var reverse = "";

		for(var i = 0; i < value.length; i++) {
			reverse += value[value.length - i - 1];
		}

		return reverse;
	};

	utilities.createError = function(message, status) {
		var error = new Error(message);
		error.status = utilities.parseInteger(status, 500);
		return error;
	};

	utilities.clone = function(value) {
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
		else if(typeof Buffer !== "undefined" && value instanceof Buffer) {
			return new Buffer(value);
		}
		else if(value instanceof Object) {
			var copy = null;

			if(value instanceof Error) {
				copy = new Error(value.message);
			}
			else {
				copy = { };
			}

			for(var attribute in value) {
				if(value.hasOwnProperty(attribute)) {
					copy[attribute] = utilities.clone(value[attribute]);
				}
			}

			return copy;
		}

		return object;
	};

	utilities.merge = function(a, b, copy, deepMerge) {
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

	utilities.calculateAge = function(value) {
		var currentDate = new Date();
		var formattedDate = utilities.parseDate(value);

		if(formattedDate === null || formattedDate > currentDate) {
			return -1;
		}

		return Math.floor(((currentDate - formattedDate) / 1000 / (60 * 60 * 24)) / 365.25);
	};

	utilities.prependSlash = function(value) {
		if(typeof value !== "string") {
			return null;
		}

		var formattedValue = value.trim();

		if(formattedValue.length === 0) { return formattedValue; }

		if(formattedValue[0] !== "/" && formattedValue[0] !== "\\") {
			formattedValue = "/" + formattedValue;
		}

		return formattedValue;
	};

	utilities.appendSlash = function(value) {
		if(typeof value !== "string") { return null; }

		var formattedValue = value.trim();

		if(formattedValue.length === 0) {
			return formattedValue;
		}

		if(formattedValue[formattedValue.length - 1] !== "/" && formattedValue[formattedValue.length - 1] !== "\\") {
			formattedValue += "/";
		}

		return formattedValue;
	};

	utilities.joinPaths = function(base, path) {
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

	utilities.createQueryString = function(value, includeQuestionMark) {
		return !utilities.isObject(value) ? "" : (utilities.parseBoolean(includeQuestionMark, false) ? "?" : "") + Object.keys(value).map(function(key) {
			return encodeURIComponent(key) + "=" + encodeURIComponent(value[key]);
		}).join("&");
	};

	utilities.createRange = function(start, end) {
		var formattedStart = utilities.parseInteger(start);
		var formattedEnd = utilities.parseInteger(end);

		if(utilities.isInvalidNumber(formattedEnd)) {
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

	utilities.futureMonths = function(value, prependZero) {
		var date = utilities.parseDate(value);

		if(date === null) {
			return null;
		}

		var currentDate = new Date();
		var month = 0;

		if(date.getFullYear() == currentDate.getFullYear()) {
			month = currentDate.getMonth();
		}

		var months = [];

		prependZero = utilities.parseBoolean(prependZero, true);

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

	utilities.visibleElements = function(elements) {
		if(utilities.isEmptyArray(elements)) {
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

	utilities.hiddenElements = function(elements) {
		if(utilities.isEmptyArray(elements)) {
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

	utilities.enabledElements = function(elements) {
		if(utilities.isEmptyArray(elements)) {
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

	utilities.disabledElements = function(elements) {
		if(utilities.isEmptyArray(elements)) {
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

	utilities.elementsWithAttribute = function(elements, attribute, hasAttribute) {
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

	utilities.elementsWithoutAttribute = function(elements, attribute, hasAttribute) {
		return utilities.elementsWithAttribute(elements, attribute, false);
	};

	utilities.matchAttribute = function(element, attribute, value) {
		if(!utilities.isObject(element)) {
			return false;
		}

		if(utilities.isEmptyString(attribute)) {
			return true;
		}

		return element[attribute.trim()] === value;
	};

	utilities.generateVersions = function(version, prefix, suffix) {
		if(!Array.isArray(version)) {
			return null;
		}

		var versions = [];
		var value = null;

		for(var i = 0; i < version.length; i++) {
			value = "";

			if(utilities.isValid(prefix)) {
				value += prefix;
			}

			for(var j = 0; j <= i; j++) {
				if(j > 0) {
					value += "_";
				}

				value += version[j];
			}

			if(utilities.isValid(suffix)) {
				value += suffix;
			}

			versions.push(value);
		}

		return versions;
	};

	utilities.parseVersion = function(value, trimTrailingZeroes) {
		var formattedValue = typeof value === "number" ? value.toString() : value;

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

		return version;
	};

	utilities.compareVersions = function(v1, v2, throwErrors) {
		throwErrors =  utilities.parseBoolean(throwErrors, false);

		if(utilities.isEmptyString(v1) || utilities.isEmptyString(v2)) {
			if(throwErrors) {
				throw new Error("Cannot compare invalid or empty versions.");
			}

			return null;
		}

		v1 = v1.trim();
		v2 = v2.trim();

		if(!v1.match(/([0-9]\.?)+/) || !v2.match(/([0-9]\.?)+/)) {
			if(throwErrors) {
				throw new Error("Cannot compare improperly formatted versions.");
			}

			return null;
		}

		var a = null;
		var b = null;
		var index = 0;
		var v1data = v1.split(/[\. \t]+/g);
		var v2data = v2.split(/[\. \t]+/g);

		while(true) {
			if(index >= v1data.length) {
				if(v1data.length === v2data.length) {
					return 0;
				}

				for(var i = index; i < v2data.length; i++) {
					b = utilities.parseInteger(v2data[i]);

					if(b !== 0) {
						return -1;
					}
				}

				return 0;
			}

			if(index >= v2data.length) {
				if(v2data.length === v1data.length) {
					return 0;
				}

				for(var i = index; i < v1data.length; i++) {
					a = utilities.parseInteger(v1data[i]);

					if(a !== 0) {
						return 1;
					}
				}

				return 0;
			}

			a = utilities.parseInteger(v1data[index]);
			b = utilities.parseInteger(v2data[index]);

			if(a > b) {
				return  1;
			}
			else if(a < b) {
				return -1;
			}

			index++;
		}
	};

	utilities.hasPostalCodeValidator = function(country) {
		if(typeof country !== "string") {
			return false;
		}

		var formattedCountry = country.trim().toUpperCase();

		if(formattedCountry.length === 0) {
			return false;
		}

		return utilities.isRegularExpression(postalCodeValidators[formattedCountry]);
	};

	utilities.validatePostalCode = function(value, country) {
		if(typeof country !== "string") {
			return false;
		}

		var formattedCountry = country.trim().toUpperCase();

		if(formattedCountry.length === 0 || !utilities.isRegularExpression(postalCodeValidators[formattedCountry])) {
			return false;
		}

		return postalCodeValidators[formattedCountry].test(value);
	};

	return utilities;

}));
