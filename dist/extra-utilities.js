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
	}

	let utilities = { };

	utilities.HalfPI = 1.57079632679489661923;
	utilities.QuarterPI = 0.78539816339744830962;
	utilities.TwoPI = 6.28318530717958647693;

	const postalCodeValidators = {
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

		let commentStartIndex = -1;

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

		if(value === undefined || value === null) {
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

		const formattedValue = value.trim().toLowerCase();

		if(formattedValue.length === 0) {
			return defaultValue;
		}

		if(formattedValue.length === 1) {
			const character = formattedValue.charAt(0);

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
		let newValue = NaN;

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
		let newValue = NaN;

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
			const formattedValue = value.trim();

			if(formattedValue.length === 0) {
				return null;
			}

			let timestamp = null;

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

		const postalCodeData = value.match(/[ \t]*([A-Z][0-9][A-Z])[_\- \t]?([0-9][A-Z][0-9])[ \t]*/i);

		if(!postalCodeData) {
			return null;
		}

		return (postalCodeData[1] + postalCodeData[2]).toUpperCase();
	};

	utilities.parseEmail = function(value) {
		if(utilities.isEmptyString(value)) {
			return null;
		}

		const emailData = value.trim().toLowerCase().match(/([^+@]+)(\+.*)?(@.+\..+)/);

		if(utilities.isInvalid(emailData) || emailData.length < 4) {
			return null;
		}

		return emailData[1] + emailData[3];
	};

	utilities.parseEmailDomain = function(value) {
		if(utilities.isEmptyString(value)) {
			return null;
		}

		const emailDomainData = value.trim().toLowerCase().match(/([^+@]+)(\+.*)?@(.+\..+)/);

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

		const data = value.split(/[;,]+/);
		let formattedList = [];
		let formattedValue = null;

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

		const regExpData = value.match(/\s*\/(.*)\/(.*)\s*/);

		if(!regExpData) {
			return null;
		}

		return new RegExp(regExpData[1], regExpData[2]);
	};

	utilities.parseYouTubeLink = function(value) {
		if(utilities.isEmptyString(value)) {
			return null;
		}

		const formattedValue = value.trim();
		const linkData = formattedValue.match(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/i);

		if(linkData && linkData[1].length >= 11) {
			return linkData[1];
		}

		if(formattedValue.match(/[A-Z0-9_-]{11,}/i)) {
			return formattedValue;
		}

		return null;
	};

	utilities.formatStringList = function(value, stringify) {
		let data = null;

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

		let formattedList = "";
		let formattedValue = null;

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

		let trimmedString = value.replace(/^[ \t]+|[ \t]+$/gm, "");

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

		let formattedAmount = utilities.parseInteger(amount, 1);

		if(formattedAmount < 0) {
			formattedAmount = 1;
		}

		const formattedIndent = typeof indent === "string" ? indent : "\t";
		let indentation = "";

		for(var i = 0; i < formattedAmount; i++) {
			indentation += formattedIndent;
		}

		if(!utilities.parseBoolean(clearEmptyLines, true)) {
			return value.replace(/^/gm, indentation);
		}

		let line = null;
		let lines = value.split(/\r\n?|\n/g);
		let indentedParagraph = "";

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

		let formattedValue = value.trim();

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

		let formattedValue = value.toString();
		const formattedExpectedLength = utilities.parseInteger(expectedLength);

		if(utilities.isInvalidNumber(formattedExpectedLength) || formattedExpectedLength < 0) {
			return formattedValue;
		}

		const numberOfZeroes = formattedExpectedLength - formattedValue.length;

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

		let c = null;
		let upper = 0;
		let lower = 0;
		const lowerA = "a".charCodeAt();
		const lowerZ = "z".charCodeAt();
		const upperA = "A".charCodeAt();
		const upperZ = "Z".charCodeAt();

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

		let reverse = "";

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
		else if(value instanceof Date) {
			let copy = new Date();
			copy.setTime(value.getTime());

			return copy;
		}
		else if(value instanceof Array) {
			let copy = [];

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
			let copy = null;

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

		let newObject = null;

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

		let attribute = null;
		let value = null;
		let newValue = null;
		const attributes = Object.keys(b);

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
		const currentDate = new Date();
		let formattedDate = utilities.parseDate(value);

		if(formattedDate === null || formattedDate > currentDate) {
			return -1;
		}

		return Math.floor(((currentDate - formattedDate) / 1000 / (60 * 60 * 24)) / 365.25);
	};

	utilities.prependSlash = function(value) {
		if(typeof value !== "string") {
			return null;
		}

		let formattedValue = value.trim();

		if(formattedValue.length === 0) { return formattedValue; }

		if(formattedValue[0] !== "/" && formattedValue[0] !== "\\") {
			formattedValue = "/" + formattedValue;
		}

		return formattedValue;
	};

	utilities.appendSlash = function(value) {
		if(typeof value !== "string") { return null; }

		let formattedValue = value.trim();

		if(formattedValue.length === 0) {
			return formattedValue;
		}

		if(formattedValue[formattedValue.length - 1] !== "/" && formattedValue[formattedValue.length - 1] !== "\\") {
			formattedValue += "/";
		}

		return formattedValue;
	};

	utilities.joinPaths = function(base, path) {
		const formattedBase = typeof base === "string" ? base.trim().replace(/[\/\\]+$/, "") : null;
		const formattedPath = typeof path === "string" ? path.trim().replace(/^[\/\\]+/, "") : null;
		let newPath = "";

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
		let formattedStart = utilities.parseInteger(start);
		let formattedEnd = utilities.parseInteger(end);

		if(utilities.isInvalidNumber(formattedEnd)) {
			formattedEnd = formattedStart;
			formattedStart = 0;
		}

		if(utilities.isInvalidNumber(formattedStart) || utilities.isInvalidNumber(formattedEnd) || formattedStart > formattedEnd) {
			return [];
		}

		let range = [];

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

		const currentDate = new Date();
		let month = 0;

		if(date.getFullYear() == currentDate.getFullYear()) {
			month = currentDate.getMonth();
		}

		let months = [];

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

		let visibleElements = [];

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

		let hiddenElements = [];

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

		let enabledElements = [];

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

		let disabledElements = [];

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

		let element = null;
		let filteredElements = [];

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

	utilities.clamp = function(value, min, max) {
		return utilities.isInvalidNumber(value) || utilities.isInvalidNumber(min) || utilities.isInvalidNumber(max) ? NaN : value < min ? min : value > max ? max : value;
	};

	utilities.distance = function(a, b) {
		return utilities.isInvalidNumber(a) || utilities.isInvalidNumber(b) ? NaN : Math.abs(b - a);
	};

	utilities.radiansToDegrees = function(value) {
		return utilities.isInvalidNumber(value) ? NaN : value * (180 / Math.PI);
	};

	utilities.degreesToRadians = function(value) {
		return utilities.isInvalidNumber(value) ? NaN : value * (Math.PI / 180);
	};

	utilities.compareAnglesDegrees = function(a, b) {
		if(utilities.isInvalidNumber(a) || utilities.isInvalidNumber(b)) {
			return NaN;
		}

		if(a == b) {
			return 0;
		}

		let c = a % 360;
		let d = b % 360;

		if(c < 0) {
			c += 360;
		}

		if(d < 0) {
			d += 360;
		}

		if(c === d) {
			return 0;
		}

		return Math.cos(utilities.degreesToRadians(a - b) + (Math.PI / 2)) < 0 ? -1 : 1;
	};

	utilities.compareAnglesRadians = function(a, b) {
		return utilities.isInvalidNumber(a) || utilities.isInvalidNumber(b) ? NaN : utilities.compareAnglesDegrees(utilities.radiansToDegrees(a), utilities.radiansToDegrees(b));
	};

	utilities.lerp = function(a, b, amount) {
		if(utilities.isInvalidNumber(a) || utilities.isInvalidNumber(b) || utilities.isInvalidNumber(amount)) {
			return NaN;
		}

		if(amount === 0) {
			return a;
		}
		else if(amount === 1) {
			return b;
		}

		return a + (b - a) * amount;
	};

	utilities.normalize = function(value, min, max) {
		return utilities.isInvalidNumber(value) || utilities.isInvalidNumber(min) || utilities.isInvalidNumber(max) ? NaN : (value - min) / (max - min);
	};

	utilities.hasPostalCodeValidator = function(country) {
		if(typeof country !== "string") {
			return false;
		}

		const formattedCountry = country.trim().toUpperCase();

		if(formattedCountry.length === 0) {
			return false;
		}

		return utilities.isRegularExpression(postalCodeValidators[formattedCountry]);
	};

	utilities.validatePostalCode = function(value, country) {
		if(typeof country !== "string") {
			return false;
		}

		const formattedCountry = country.trim().toUpperCase();

		if(formattedCountry.length === 0 || !utilities.isRegularExpression(postalCodeValidators[formattedCountry])) {
			return false;
		}

		return postalCodeValidators[formattedCountry].test(value);
	};

	return utilities;

}));
