"use strict";

global.validator = undefined;
global.changeCase = undefined;

var utilities = require("../dist/extra-utilities.js");
var chai = require("chai");
var expect = chai.expect;

var testDate = new Date();

var emptyFunction = function() { };
var emptyFunctionString = emptyFunction.toString();

var testRegExp = new RegExp(".+");

var testData = [
	undefined,
	null,
	false,
	true,
	new Boolean(false),
	new Boolean(true),
	0,
	1,
	3.141592654,
	NaN,
	Infinity,
	-Infinity,
	"",
	"test",
	" trim\t",
	{ },
	{ nice: "meme" },
	[ ],
	[0],
	testDate,
	emptyFunction,
	testRegExp
];

describe("Utilities", function() {
	describe("isValid", function() {
		it("should be a function", function() {
			expect(utilities.isValid).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [false, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];

			for(var i = 0; i < testData.length; i++) {
				expect(utilities.isValid(testData[i])).to.equal(results[i]);
			}
		});
	});

	describe("isInvalid", function() {
		it("should be a function", function() {
			expect(utilities.isInvalid).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

			for(var i = 0; i < testData.length; i++) {
				expect(utilities.isInvalid(testData[i])).to.equal(results[i]);
			}
		});
	});

	describe("isBoolean", function() {
		it("should be a function", function() {
			expect(utilities.isBoolean).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

			for(var i = 0; i < testData.length; i++) {
				expect(utilities.isBoolean(testData[i])).to.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value when objects are allowed", function() {
			var results = [false, false, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

			for(var i = 0; i < testData.length; i++) {
				expect(utilities.isBoolean(testData[i], true)).to.equal(results[i]);
			}
		});
	});

	describe("isValidNumber", function() {
		it("should be a function", function() {
			expect(utilities.isValidNumber).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [false, false, false, false, false, false, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false];

			for(var i = 0; i < testData.length; i++) {
				expect(utilities.isValidNumber(testData[i])).to.equal(results[i]);
			}
		});
	});

	describe("isInvalidNumber", function() {
		it("should be a function", function() {
			expect(utilities.isInvalidNumber).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [true, true, true, true, true, true, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, true];

			for(var i = 0; i < testData.length; i++) {
				expect(utilities.isInvalidNumber(testData[i])).to.equal(results[i]);
			}
		});
	});

	describe("isEmptyString", function() {
		var newTestData = testData.concat(" ", "\t", " \t");

		it("should be a function", function() {
			expect(utilities.isEmptyString).to.be.a("function");
		});

		it("should produce the correct result for each test value with trim disabled", function() {
			var results = [true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, true, true, true, true, true, true, true, false, false, false];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.isEmptyString(newTestData[i], false)).to.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value with trim enabled", function() {
			var results = [true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, true, true, true, true, true, true, true, true, true, true];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.isEmptyString(newTestData[i], true)).to.equal(results[i]);
			}
		});
	});

	describe("isNonEmptyString", function() {
		var newTestData = testData.concat(" ", "\t", " \t");

		it("should be a function", function() {
			expect(utilities.isNonEmptyString).to.be.a("function");
		});

		it("should produce the correct result for each test value with trim disabled", function() {
			var results = [false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, true, true, true];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.isNonEmptyString(newTestData[i], false)).to.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value with trim enabled", function() {
			var results = [false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.isNonEmptyString(newTestData[i], true)).to.equal(results[i]);
			}
		});
	});

	describe("isObject", function() {
		function Aunty(donna) { this.donna = donna; }

		var newTestData = testData.concat(
			new Boolean(),
			new Number(),
			new Number(-1.1),
			new String(),
			new String("Corporate Spy"),
			new Object(),
			new Map(),
			new Array(),
			new Error(),
			new Error("2pidgeons.exe"),
			new Aunty(),
			(function() { return function() { }; })
		);

		it("should be a function", function() {
			expect(utilities.isObject).to.be.a("function");
		});

		it("should produce the correct result for each test value with strict disabled", function() {
			var results = [false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, true, true, true, true, true, false, true, true, true, true, true, true, true, true, true, true, true, false];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.isObject(newTestData[i], false)).to.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value with strict enabled", function() {
			var results = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.isObject(newTestData[i], true)).to.equal(results[i]);
			}
		});
	});

	describe("isObjectStrict", function() {
		function Aunty(donna) { this.donna = donna; }

		var newTestData = testData.concat(
			new Boolean(),
			new Number(),
			new Number(-1.1),
			new String(),
			new String("Corporate Spy"),
			new Object(),
			new Map(),
			new Array(),
			new Error(),
			new Error("2pidgeons.exe"),
			new Aunty(),
			(function() { return function() { }; })
		);

		it("should be a function", function() {
			expect(utilities.isObjectStrict).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.isObjectStrict(newTestData[i])).to.equal(results[i]);
			}
		});
	});

	describe("isEmptyObject", function() {
		it("should be a function", function() {
			expect(utilities.isEmptyObject).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false];

			for(var i = 0; i < testData.length; i++) {
				expect(utilities.isEmptyObject(testData[i])).to.equal(results[i]);
			}
		});
	});

	describe("isNonEmptyObject", function() {
		it("should be a function", function() {
			expect(utilities.isNonEmptyObject).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false];

			for(var i = 0; i < testData.length; i++) {
				expect(utilities.isNonEmptyObject(testData[i])).to.equal(results[i]);
			}
		});
	});

	describe("isEmptyArray", function() {
		it("should be a function", function() {
			expect(utilities.isEmptyArray).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, true, true, true];

			for(var i = 0; i < testData.length; i++) {
				expect(utilities.isEmptyArray(testData[i])).to.equal(results[i]);
			}
		});
	});

	describe("isNonEmptyArray", function() {
		it("should be a function", function() {
			expect(utilities.isNonEmptyArray).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false];

			for(var i = 0; i < testData.length; i++) {
				expect(utilities.isNonEmptyArray(testData[i])).to.equal(results[i]);
			}
		});
	});

	describe("isDate", function() {
		it("should be a function", function() {
			expect(utilities.isDate).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false];

			for(var i = 0; i < testData.length; i++) {
				expect(utilities.isDate(testData[i])).to.equal(results[i]);
			}
		});
	});

	describe("isError", function() {
		var newTestData = testData.concat(new Error("The following advertisement is intended for Jim Boonie only."), utilities.createError("We're giving you land, it's free.", 420), { error: true, message: "Two bedrooms, no rugs, it's got a pool in the back." });

		it("should be a function", function() {
			expect(utilities.isError).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.isError(newTestData[i])).to.equal(results[i]);
			}
		});
	});

	describe("isRegularExpression", function() {
		var newTestData = testData.concat(/v/im, new RegExp("la", "g"));

		it("should be a function", function() {
			expect(utilities.isRegularExpression).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.isRegularExpression(newTestData[i])).to.equal(results[i]);
			}
		});
	});

	describe("isFunction", function() {
		it("should be a function", function() {
			expect(utilities.isFunction).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false];

			for(var i = 0; i < testData.length; i++) {
				expect(utilities.isFunction(testData[i])).to.equal(results[i]);
			}
		});
	});

	describe("isComment", function() {
		var newTestData = testData.concat("/", "//", "//a", " // b", "\t \t//cd", " e // f", "l/o/l", "/l/m/a/o/", "#", " # x", "\t\t # y z", "hash # tag");

		it("should be a function", function() {
			expect(utilities.isComment).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, false, false, false, false, false, false, false];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.isComment(newTestData[i])).to.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value with custom comment type", function() {
			var results = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, false];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.isComment(newTestData[i], "#")).to.equal(results[i]);
			}
		});
	});

	describe("isVisible", function() {
		var newTestData = testData.concat(
			{ visible: "nope" },
			{ visible: false },
			{ visible: true },
			{ visible: function() { return false; } },
			{ visible: function() { return true; } },
			{ hidden: "avi" },
			{ hidden: false },
			{ hidden: true },
			{ hidden: function() { return false; } },
			{ hidden: function() { return true; } }
		);

		it("should be a function", function() {
			expect(utilities.isVisible).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, true, true, true, true, true, false, true, true, false, true, false, true, true, true, false, true, false];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.isVisible(newTestData[i])).to.equal(results[i]);
			}
		});
	});

	describe("isHidden", function() {
		var newTestData = testData.concat(
			{ visible: "nice" },
			{ visible: false },
			{ visible: true },
			{ visible: function() { return false; } },
			{ visible: function() { return true; } },
			{ hidden: "meme" },
			{ hidden: false },
			{ hidden: true },
			{ hidden: function() { return false; } },
			{ hidden: function() { return true; } }
		);

		it("should be a function", function() {
			expect(utilities.isHidden).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [true, true, true, true, false, false, true, true, true, true, true, true, true, true, true, false, false, false, false, false, true, false, false, true, false, true, false, false, false, true, false, true];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.isHidden(newTestData[i])).to.equal(results[i]);
			}
		});
	});

	describe("isEnabled", function() {
		var newTestData = testData.concat(
			{ enabled: "door" },
			{ enabled: false },
			{ enabled: true },
			{ enabled: function() { return false; } },
			{ enabled: function() { return true; } },
			{ disabled: "stuck" },
			{ disabled: false },
			{ disabled: true },
			{ disabled: function() { return false; } },
			{ disabled: function() { return true; } }
		);

		it("should be a function", function() {
			expect(utilities.isEnabled).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, true, true, true, true, true, false, true, true, false, true, false, true, true, true, false, true, false];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.isEnabled(newTestData[i])).to.equal(results[i]);
			}
		});
	});

	describe("isDisabled", function() {
		var newTestData = testData.concat(
			{ enabled: "ayy" },
			{ enabled: false },
			{ enabled: true },
			{ enabled: function() { return false; } },
			{ enabled: function() { return true; } },
			{ disabled: "lmao" },
			{ disabled: false },
			{ disabled: true },
			{ disabled: function() { return false; } },
			{ disabled: function() { return true; } }
		);

		it("should be a function", function() {
			expect(utilities.isDisabled).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [true, true, true, true, false, false, true, true, true, true, true, true, true, true, true, false, false, false, false, false, true, false, false, true, false, true, false, false, false, true, false, true];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.isDisabled(newTestData[i])).to.equal(results[i]);
			}
		});
	});

	describe("parseBoolean", function() {
		var newTestData = testData.concat(" ", "\t", "f", "T", "N", "y", "0", "1", "fALSE", "True", "no", "YES", "Off", "ON", "x");

		it("should be a function", function() {
			expect(utilities.parseBoolean).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [null, null, false, true, false, true, false, true, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, false, true, false, true, false, true, false, true, false, true, false, true, null];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.parseBoolean(newTestData[i])).to.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value with a custom default", function() {
			var results = [true, true, false, true, false, true, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, true, false, true, false, true, false, true, false, true, false, true, true];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.parseBoolean(newTestData[i], true)).to.equal(results[i]);
			}
		});
	});

	describe("parseInteger", function() {
		var newTestData = testData.concat(-69, -3.33333, 88, "-32", "-1", "0", "1", "64", "-1.1", "0.48", "2.71828");

		it("should be a function", function() {
			expect(utilities.parseInteger).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [NaN, NaN, NaN, NaN, NaN, NaN, 0, 1, 3, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, -69, -3, 88, -32, -1, 0, 1, 64, -1, 0, 2];

			for(var i = 0; i < newTestData.length; i++) {
				if(isNaN(results[i])) {
					expect(isNaN(utilities.parseInteger(newTestData[i]))).to.equal(true);
				}
				else {
					expect(utilities.parseInteger(newTestData[i])).to.equal(results[i]);
				}
			}
		});

		it("should produce the correct result for each test value with a custom default", function() {
			var defaultInteger = 420;
			var results = [defaultInteger, defaultInteger, defaultInteger, defaultInteger, defaultInteger, defaultInteger, 0, 1, 3, defaultInteger, defaultInteger, defaultInteger, defaultInteger, defaultInteger, defaultInteger, defaultInteger, defaultInteger, defaultInteger, defaultInteger, defaultInteger, defaultInteger, defaultInteger, -69, -3, 88, -32, -1, 0, 1, 64, -1, 0, 2];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.parseInteger(newTestData[i], defaultInteger)).to.equal(results[i]);
			}
		});
	});

	describe("parseFloatingPointNumber", function() {
		var newTestData = testData.concat(-69, -3.33333, 88, "-32", "-1", "0", "1", "64", "-1.1", "0.48", "2.71828");

		it("should be a function", function() {
			expect(utilities.parseFloatingPointNumber).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [NaN, NaN, NaN, NaN, NaN, NaN, 0, 1, 3.141592654, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, -69, -3.33333, 88, -32, -1, 0, 1, 64, -1.1, 0.48, 2.71828];

			for(var i = 0; i < newTestData.length; i++) {
				if(isNaN(results[i])) {
					expect(isNaN(utilities.parseFloatingPointNumber(newTestData[i]))).to.equal(true);
				}
				else {
					expect(utilities.parseFloatingPointNumber(newTestData[i])).to.equal(results[i]);
				}
			}
		});

		it("should produce the correct result for each test value with a custom default", function() {
			var defaultFloat = 6.9;
			var results = [defaultFloat, defaultFloat, defaultFloat, defaultFloat, defaultFloat, defaultFloat, 0, 1, 3.141592654, defaultFloat, defaultFloat, defaultFloat, defaultFloat, defaultFloat, defaultFloat, defaultFloat, defaultFloat, defaultFloat, defaultFloat, defaultFloat, defaultFloat, defaultFloat, -69, -3.33333, 88, -32, -1, 0, 1, 64, -1.1, 0.48, 2.71828];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.parseFloatingPointNumber(newTestData[i], defaultFloat)).to.equal(results[i]);
			}
		});
	});

	describe("parseDate", function() {
		var newTestData = testData.concat("June 5, 2012", "June 18, 1987 3:30 PM", "2018-02-19T06:19:33Z", testDate.getTime(), testDate.toString(), testDate.getTime().toString());

		it("should be a function", function() {
			expect(utilities.parseDate).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [null, null, null, null, null, null, new Date(0), new Date(1), null, null, null, null, null, null, null, null, null, null, null, testDate, null, null, new Date("June 5, 2012"), new Date("June 18, 1987 3:30 PM"), new Date("2018-02-19T06:19:33Z"), testDate, new Date(testDate.toString()), testDate];

			for(var i = 0; i < newTestData.length; i++) {
				if(results[i] === null) {
					expect(utilities.parseDate(newTestData[i])).to.equal(null);
				}
				else {
					expect(utilities.parseDate(newTestData[i])).to.deep.equal(results[i]);
				}
			}
		});

		it("should produce the correct result for each test value with a custom default", function() {
			var defaultDate = new Date("October 21, 2015 4:29 PM");
			var results = [defaultDate, defaultDate, defaultDate, defaultDate, defaultDate, defaultDate, new Date(0), new Date(1), defaultDate, defaultDate, defaultDate, defaultDate, defaultDate, defaultDate, defaultDate, defaultDate, defaultDate, defaultDate, defaultDate, testDate, defaultDate, defaultDate, new Date("June 5, 2012"), new Date("June 18, 1987 3:30 PM"), new Date("2018-02-19T06:19:33Z"), testDate, new Date(testDate.toString()), testDate];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.parseDate(newTestData[i], defaultDate)).to.deep.equal(results[i]);
			}
		});
	});

	describe("parseTime", function() {
		var newTestData = testData.concat("9:30 AM", "11:59 PM", "12:00 AM", "12:01 AM", "11:59 AM", "12:00 PM", "12:01 PM", "1632", "2359", "0000", "0001", "1159", "1200", "1201", "2400", "12:60 AM", "13:00 PM", "3:60 AM", "4:77 PM", "0161", "2401", "2188", "2520");

		it("should be a function", function() {
			expect(utilities.parseTime).to.be.a("function");
		});

		it("should produce the correct result for each test value and return null for invalid values", function() {
			var results = [
				null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
				{ regular: { raw: "9:30 AM", hour: 9, minutes: 30, period: "AM", morning: true }, military: { raw: "0930", hour: 9, minutes: 30 } },
				{ regular: { raw: "11:59 PM", hour: 11, minutes: 59, period: "PM", morning: false }, military: { raw: "2359", hour: 23, minutes: 59 } },
				{ regular: { raw: "12:00 AM", hour: 12, minutes: 0, period: "AM", morning: true }, military: { raw: "0000", hour: 0, minutes: 0 } },
				{ regular: { raw: "12:01 AM", hour: 12, minutes: 1, period: "AM", morning: true }, military: { raw: "0001", hour: 0, minutes: 1 } },
				{ regular: { raw: "11:59 AM", hour: 11, minutes: 59, period: "AM", morning: true }, military: { raw: "1159", hour: 11, minutes: 59 } },
				{ regular: { raw: "12:00 PM", hour: 12, minutes: 0, period: "PM", morning: false }, military: { raw: "1200", hour: 12, minutes: 0 } },
				{ regular: { raw: "12:01 PM", hour: 12, minutes: 1, period: "PM", morning: false }, military: { raw: "1201", hour: 12, minutes: 1 } },
				{ regular: { raw: "4:32 PM", hour: 4, minutes: 32, period: "PM", morning: false }, military: { raw: "1632", hour: 16, minutes: 32 } },
				{ regular: { raw: "11:59 PM", hour: 11, minutes: 59, period: "PM", morning: false }, military: { raw: "2359", hour: 23, minutes: 59 } },
				{ regular: { raw: "12:00 AM", hour: 12, minutes: 0, period: "AM", morning: true }, military: { raw: "0000", hour: 0, minutes: 0 } },
				{ regular: { raw: "12:01 AM", hour: 12, minutes: 1, period: "AM", morning: true }, military: { raw: "0001", hour: 0, minutes: 1 } },
				{ regular: { raw: "11:59 AM", hour: 11, minutes: 59, period: "AM", morning: true }, military: { raw: "1159", hour: 11, minutes: 59 } },
				{ regular: { raw: "12:00 PM", hour: 12, minutes: 0, period: "PM", morning: false }, military: { raw: "1200", hour: 12, minutes: 0 } },
				{ regular: { raw: "12:01 PM", hour: 12, minutes: 1, period: "PM", morning: false }, military: { raw: "1201", hour: 12, minutes: 1 } },
				{ regular: { raw: "12:00 AM", hour: 12, minutes: 0, period: "AM", morning: true }, military: { raw: "0000", hour: 0, minutes: 0 } },
				null, null, null, null, null, null, null, null
			];

			for(var i = 0; i < newTestData.length; i++) {
				if(results[i] === null) {
					expect(utilities.parseTime(newTestData[i])).to.equal(null);
				}
				else {
					expect(utilities.parseTime(newTestData[i])).to.deep.equal(results[i]);
				}
			}
		});

		it("should produce the correct result for each test value and throw an error when specified for invalid values", function() {
			var results = [
				null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
				{ regular: { raw: "9:30 AM", hour: 9, minutes: 30, period: "AM", morning: true }, military: { raw: "0930", hour: 9, minutes: 30 } },
				{ regular: { raw: "11:59 PM", hour: 11, minutes: 59, period: "PM", morning: false }, military: { raw: "2359", hour: 23, minutes: 59 } },
				{ regular: { raw: "12:00 AM", hour: 12, minutes: 0, period: "AM", morning: true }, military: { raw: "0000", hour: 0, minutes: 0 } },
				{ regular: { raw: "12:01 AM", hour: 12, minutes: 1, period: "AM", morning: true }, military: { raw: "0001", hour: 0, minutes: 1 } },
				{ regular: { raw: "11:59 AM", hour: 11, minutes: 59, period: "AM", morning: true }, military: { raw: "1159", hour: 11, minutes: 59 } },
				{ regular: { raw: "12:00 PM", hour: 12, minutes: 0, period: "PM", morning: false }, military: { raw: "1200", hour: 12, minutes: 0 } },
				{ regular: { raw: "12:01 PM", hour: 12, minutes: 1, period: "PM", morning: false }, military: { raw: "1201", hour: 12, minutes: 1 } },
				{ regular: { raw: "4:32 PM", hour: 4, minutes: 32, period: "PM", morning: false }, military: { raw: "1632", hour: 16, minutes: 32 } },
				{ regular: { raw: "11:59 PM", hour: 11, minutes: 59, period: "PM", morning: false }, military: { raw: "2359", hour: 23, minutes: 59 } },
				{ regular: { raw: "12:00 AM", hour: 12, minutes: 0, period: "AM", morning: true }, military: { raw: "0000", hour: 0, minutes: 0 } },
				{ regular: { raw: "12:01 AM", hour: 12, minutes: 1, period: "AM", morning: true }, military: { raw: "0001", hour: 0, minutes: 1 } },
				{ regular: { raw: "11:59 AM", hour: 11, minutes: 59, period: "AM", morning: true }, military: { raw: "1159", hour: 11, minutes: 59 } },
				{ regular: { raw: "12:00 PM", hour: 12, minutes: 0, period: "PM", morning: false }, military: { raw: "1200", hour: 12, minutes: 0 } },
				{ regular: { raw: "12:01 PM", hour: 12, minutes: 1, period: "PM", morning: false }, military: { raw: "1201", hour: 12, minutes: 1 } },
				{ regular: { raw: "12:00 AM", hour: 12, minutes: 0, period: "AM", morning: true }, military: { raw: "0000", hour: 0, minutes: 0 } },
				null, null, null, null, null, null, null, null
			];

			for(var i = 0; i < newTestData.length; i++) {
				var errorThrown = false;

				try {
					if(results[i] === null) {
						utilities.parseTime(newTestData[i], true);
					}
					else {
						expect(utilities.parseTime(newTestData[i], true)).to.deep.equal(results[i]);
					}
				}
				catch(error) {
					errorThrown = true;
				}

				expect(errorThrown).to.equal(results[i] === null);
			}
		});
	});

	describe("parsePostalCode", function() {
		var newTestData = testData.concat("654321", "1A2B3C", "P6B 1M7", "H0H0H0", "J1I-3J8");

		it("should be a function", function() {
			expect(utilities.parsePostalCode).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "P6B1M7", "H0H0H0", "J1I3J8"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.parsePostalCode(newTestData[i])).to.equal(results[i]);
			}
		});
	});

	describe("parseEmail", function() {
		var newTestData = testData.concat("mark@broden.zac", "@aunty.donna", "surprise@ketchup", "slip@", "@slap", "@slop.", "@", "@.", " x@y.z \t", "test+123@test.com");

		it("should be a function", function() {
			expect(utilities.parseEmail).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "mark@broden.zac", null, null, null, null, null, null, null, "x@y.z", "test@test.com"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.parseEmail(newTestData[i])).to.equal(results[i]);
			}
		});
	});

	describe("parseEmailDomain", function() {
		var newTestData = testData.concat("mark@broden.zac", "@aunty.donna", "surprise@ketchup", "slip@", "@slap", "@slop.", "@", "@.", " x@y.z\t", "test+123@test.com");

		it("should be a function", function() {
			expect(utilities.parseEmailDomain).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "broden.zac", null, null, null, null, null, null, null, "y.z", "test.com"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.parseEmailDomain(newTestData[i])).to.equal(results[i]);
			}
		});
	});

	describe("parseStringList", function() {
		var newTestData = testData.concat(",", ";", "board,", ",room", "same;", ";tie", " ;\te ,\tx ;\te ,\t \t");

		it("should be a function", function() {
			expect(utilities.parseStringList).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, [], ["test"], ["trim"], null, null, null, null, null, null, null, [], [], ["board"], ["room"], ["same"], ["tie"], ["e", "x", "e"]];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.parseStringList(newTestData[i])).to.deep.equal(results[i]);
			}
		});
	});

	describe("parseRegularExpression", function() {
		var newTestData = testData.concat("/pop[ ]*the[ ]kettle/gmi", "/corporate/m", "/spy/i", "/ayy/gm", "/lmao/g", "/muggachini/");
		var invalidTestData = ["", "/", "/door/stuck", "/y/x"];

		var regExpFlagSupported = {
			sticky: true,
			unicode: true
		};

		try {
			new RegExp("", "y");
		}
		catch(error) {
			regExpFlagSupported.sticky = false;
		}

		try {
			new RegExp("", "u");
		}
		catch(error) {
			regExpFlagSupported.unicode = false;
		}

		if(regExpFlagSupported.unicode) {
			newTestData.push(/a/gmiu);
		}

		if(regExpFlagSupported.sticky) {
			newTestData.push(/b/gmiy);
		}

		newTestData.push(/c/gmi, /d/gm, /e/g, /f/);

		if(regExpFlagSupported.unicode) {
			newTestData.push(new RegExp("1", "gmiu"));
		}

		if(regExpFlagSupported.sticky) {
			newTestData.push(new RegExp("2", "gmiy"));
		}

		newTestData.push(new RegExp("3", "gmi"), new RegExp("4", "gm"), new RegExp("5", "g"), new RegExp("6"));

		it("should be a function", function() {
			expect(utilities.parseRegularExpression).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, /.+/, /pop[ ]*the[ ]kettle/gmi, /corporate/m, /spy/i, /ayy/gm, /lmao/g, /muggachini/];

			if(regExpFlagSupported.unicode) {
				results.push(/a/gmiu);
			}

			if(regExpFlagSupported.sticky) {
				results.push(/b/gmiy);
			}

			results.push(/c/gmi, /d/gm, /e/g, /f/);

			if(regExpFlagSupported.unicode) {
				results.push(/1/gmiu);
			}

			if(regExpFlagSupported.sticky) {
				results.push(/2/gmiy);
			}

			results.push(/3/gmi, /4/gm, /5/g, /6/);

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.parseRegularExpression(newTestData[i])).to.deep.equal(results[i]);
			}
		});

		it("should return null for each regular expression value with invalid flags", function() {
			var errorThrown = null;

			for(var i = 0; i < invalidTestData.length; i++) {
				expect(utilities.parseRegularExpression(invalidTestData[i])).to.equal(null);
				expect(utilities.parseRegularExpression(invalidTestData[i], false)).to.equal(null);
			}
		});

		it("should throw an error when specified for each regular expression value with invalid flags", function() {
			var errorThrown = null;

			for(var i = 0; i < invalidTestData.length; i++) {
				errorThrown = false;

				try {
					utilities.parseRegularExpression(invalidTestData[i], true);
				}
				catch(error) {
					errorThrown = true;
				}

				expect(errorThrown).to.equal(true);
			}
		});
	});

	describe("parseYouTubeLink", function() {
		var newTestData = testData.concat(
			"https://www.youtube.com/watch?v=NUnwFHplBg4",
			"https://youtube.com/watch?v=VqB1uoDTdKM",
			"http://www.youtube.com/watch?v=NgWn7zbgxZ4",
			"http://youtube.com/watch?v=52eQJ5QpfEg",
			"www.youtube.com/watch?v=AX5CtqKX_pU",
			"youtube.com/watch?v=IOIGaIhF_wI",
			"https://www.youtube.com/v/4QZ2AbBuVB4",
			"https://youtube.com/v/VeAJ9U5nbVQ",
			"http://www.youtube.com/v/Ywsoxoc68Oc",
			"http://youtube.com/v/OEEEy1dMceI",
			"www.youtube.com/v/b4YC-4n0ap0",
			"youtube.com/v/EQiSgWGAc24",
			"https://www.youtu.be/watch?v=Dkm8Hteeh6M",
			"https://youtu.be/watch?v=87je-QAPZIU",
			"http://www.youtu.be/watch?v=w-0CS-T1HUQ",
			"http://youtu.be/watch?v=QrGrOK8oZG8",
			"www.youtu.be/watch?v=ssr1PMSNvwk",
			"youtu.be/watch?v=cd4-UnU8lWY",
			"https://www.youtu.be/v/x7ZrKehQ_xc",
			"https://youtu.be/v/z874bjpO9d8",
			"http://www.youtu.be/v/Op6kgayifzU",
			"http://youtu.be/v/U7Rn4KS3TCY",
			"www.youtu.be/v/8NArIVIQ4BI",
			"youtu.be/v/kOWEb9Lt98Y",
			"-BG9lhTg6xY",
			"UiVWItLdvAE"
		);

		it("should be a function", function() {
			expect(utilities.parseYouTubeLink).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "NUnwFHplBg4", "VqB1uoDTdKM", "NgWn7zbgxZ4", "52eQJ5QpfEg", "AX5CtqKX_pU", "IOIGaIhF_wI", "4QZ2AbBuVB4", "VeAJ9U5nbVQ", "Ywsoxoc68Oc", "OEEEy1dMceI", "b4YC-4n0ap0", "EQiSgWGAc24", "Dkm8Hteeh6M", "87je-QAPZIU", "w-0CS-T1HUQ", "QrGrOK8oZG8", "ssr1PMSNvwk", "cd4-UnU8lWY", "x7ZrKehQ_xc", "z874bjpO9d8", "Op6kgayifzU", "U7Rn4KS3TCY", "8NArIVIQ4BI", "kOWEb9Lt98Y", "-BG9lhTg6xY", "UiVWItLdvAE"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.parseYouTubeLink(newTestData[i])).to.equal(results[i]);
			}
		});
	});

	describe("formatValue", function() {
		var stringCaseFunctionNames = ["camel", "constant", "dot", "header", "lower", "lowerFirst", "no", "param", "pascal", "path", "sentence", "snake", "swap", "title", "upper", "upperFirst"];

		it("should be a function", function() {
			expect(utilities.formatValue).to.be.a("function");
		});

		it("should return a copy of the original value if no format is specified", function() {
			for(var i = 0; i < testData.length; i++) {
				expect(utilities.formatValue(testData[i])).to.deep.equal(testData[i]);
			}
		});

		it("should return a copy of the original value for any format that is not a strict object", function() {
			expect(utilities.formatValue("We need more meat.", testDate)).to.equal("We need more meat.");
			expect(utilities.formatValue(69, [4, 2, 0], { throwErrors: false })).to.equal(69);
		});

		it("should return null for any format that has an empty or missing type property", function() {
			expect(utilities.formatValue({ }, { meme: "dude" })).to.equal(null);
			expect(utilities.formatValue({ }, { ghost: "man" }, { throwErrors: false })).to.equal(null);
		});

		it("should throw an error for any format that has an empty or missing type property when specified", function() {
			var errorThrown = false;
			try { utilities.formatValue({ }, { ketchup: "Slip, slap slop!" }, { throwErrors: true }); }
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.equal(true);
		});

		it("should return null for any format that has an invalid type property", function() {
			expect(utilities.formatValue({ }, { type: "barrels" })).to.equal(null);
			expect(utilities.formatValue({ }, { type: "get some" }, { throwErrors: false })).to.equal(null);
		});

		it("should throw an error for any format that has an invlid type property when specified", function() {
			var errorThrown = false;
			try { utilities.formatValue({ }, { type: "serious?" }, { throwErrors: true }); }
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.equal(true);
		});

		it("should return null for any format that has an invalid nullable property", function() {
			expect(utilities.formatValue(null, { type: "string", nullable: Infinity })).to.equal(null);
			expect(utilities.formatValue(null, { type: "boolean", nullable: emptyFunction }, { throwErrors: false })).to.equal(null);
		});

		it("should throw an error for any format that has an invlid nullable property when specified", function() {
			var errorThrown = false;
			try { utilities.formatValue(null, { type: "integer", nullable: "Does spider have pus pus?" }, { throwErrors: true }); }
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.equal(true);
		});

		it("should return null for any format that has an invalid required property", function() {
			expect(utilities.formatValue(null, { type: "function", required: NaN })).to.equal(null);
			expect(utilities.formatValue(null, { type: "regexp", required: testDate }, { throwErrors: false })).to.equal(null);
		});

		it("should throw an error for any format that has an invlid required property when specified", function() {
			var errorThrown = false;
			try { utilities.formatValue(null, { type: "array", required: -3.1337 }, { throwErrors: true }); }
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.equal(true);
		});

		it("should return null for any format that has an invalid parser property", function() {
			expect(utilities.formatValue(null, { type: "string", parser: 1337 })).to.equal(null);
			expect(utilities.formatValue(null, { type: "array", parser: [] }, { throwErrors: false })).to.equal(null);
		});

		it("should throw an error for any format that has an invlid parser property when specified", function() {
			var errorThrown = false;
			try { utilities.formatValue(null, { type: "number", parser: "da wae" }, { throwErrors: true }); }
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.equal(true);
		});

		it("should return null for any format that has an invalid validator property", function() {
			expect(utilities.formatValue(null, { type: "integer", validator: new Error("I need healing!") })).to.equal(null);
			expect(utilities.formatValue(null, { type: "object", validator: -Infinity }, { throwErrors: false })).to.equal(null);
		});

		it("should throw an error for any format that has an invlid validator property when specified", function() {
			var errorThrown = false;
			try { utilities.formatValue(null, { type: "function", validator: testDate }, { throwErrors: true }); }
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.equal(true);
		});

		it("should return null for any format that has an invalid formatter property", function() {
			expect(utilities.formatValue(null, { type: "number", formatter: new Boolean(false) })).to.equal(null);
			expect(utilities.formatValue(null, { type: "date", formatter: NaN }, { throwErrors: false })).to.equal(null);
		});

		it("should throw an error for any format that has an invlid formatter property when specified", function() {
			var errorThrown = false;
			try { utilities.formatValue(null, { type: "float", formatter: /lolwut/i }, { throwErrors: true }); }
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.equal(true);
		});

		it("should return null for any string format that has an invalid trim property", function() {
			expect(utilities.formatValue(Infinity, { type: "string", trim: -Infinity })).to.equal(null);
			expect(utilities.formatValue(NaN, { type: "string", trim: "IndexOutOfBoundsException" }, { throwErrors: false })).to.equal(null);
		});

		it("should throw an error for any string format that has an invlid trim property when specified", function() {
			var errorThrown = false;
			try { utilities.formatValue([], { type: "string", trim: emptyFunction }, { throwErrors: true }); }
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.equal(true);
		});

		it("should return null for any string format that has an invalid case property", function() {
			expect(utilities.formatValue(7, { type: "string", case: "NullPointerException" })).to.equal(null);
			expect(utilities.formatValue("hi", { type: "string", case: 3.141592654 }, { throwErrors: false })).to.equal(null);
		});

		it("should throw an error for any string format that has an invlid case property when specified", function() {
			var errorThrown = false;
			try { utilities.formatValue([], { type: "string", case: false }, { throwErrors: true }); }
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.equal(true);
		});

		it("should return null for any string format that has an invalid nonEmpty property", function() {
			expect(utilities.formatValue(-Infinity, { type: "string", nonEmpty: NaN })).to.equal(null);
			expect(utilities.formatValue(testDate, { type: "string", nonEmpty: emptyFunction }, { throwErrors: false })).to.equal(null);
		});

		it("should throw an error for any string format that has an invlid nonEmpty property when specified", function() {
			var errorThrown = false;
			try { utilities.formatValue(emptyFunction, { type: "string", nonEmpty: new Error("8=====D ~") }, { throwErrors: true }); }
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.equal(true);
		});

		it("should return null for any object format that has an invalid strict property", function() {
			expect(utilities.formatValue("I wonder if anyone will ever read this.", { type: "object", strict: emptyFunction })).to.equal(null);
			expect(utilities.formatValue("How many memes will they understand?", { type: "object", strict: testDate }, { throwErrors: false })).to.equal(null);
		});

		it("should throw an error for any object format that has an invlid strict property when specified", function() {
			var errorThrown = false;
			try { utilities.formatValue("Probably not many.", { type: "object", strict: -Infinity }, { throwErrors: true }); }
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.equal(true);
		});

		it("should return null for any object format that has an invalid autopopulate property", function() {
			expect(utilities.formatValue("So many unit tests.", { type: "object", autopopulate: 3 })).to.equal(null);
			expect(utilities.formatValue("So little time.", { type: "object", autopopulate: "This should be a boolean or something." }, { throwErrors: false })).to.equal(null);
		});

		it("should throw an error for any object format that has an invlid autopopulate property when specified", function() {
			var errorThrown = false;
			try { utilities.formatValue("Wau.", { type: "object", autopopulate: "This should also be a boolean." }, { throwErrors: true }); }
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.equal(true);
		});

		it("should return null for any object format that has an invalid order property", function() {
			expect(utilities.formatValue("Very test.", { type: "object", order: /regular expression lol/g })).to.equal(null);
			expect(utilities.formatValue("Much unit.", { type: "object", order: "139 & Lenox Ave." }, { throwErrors: false })).to.equal(null);
		});

		it("should throw an error for any object format that has an invlid order property when specified", function() {
			var errorThrown = false;
			try { utilities.formatValue("Wow.", { type: "object", order: "That's the danger zone!" }, { throwErrors: true }); }
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.equal(true);
		});

		it("should return null for any object format that has an invalid removeExtra property", function() {
			expect(utilities.formatValue({ hot: "soup" }, { type: "object", removeExtra: "I hope they make Bio Cop." })).to.equal(null);
			expect(utilities.formatValue(["corporate", "spy"], { type: "object", removeExtra: "That would be the best." }, { throwErrors: false })).to.equal(null);
		});

		it("should throw an error for any object format that has an invlid removeExtra property when specified", function() {
			var errorThrown = false;
			try { utilities.formatValue("Manborg is definitely the movie of our century.", { type: "object", removeExtra: "NUMBER FIVE IS ALIVE!" }, { throwErrors: true }); }
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.equal(true);
		});

		it("should return null for any object format that has an invalid format property", function() {
			expect(utilities.formatValue(["i", "did", "not", "hit", "her"], { type: "object", format: "Ever watch The Room?" })).to.equal(null);
			expect(utilities.formatValue({ oh: "hai mark" }, { type: "object", format: "Tommy Wiseau is the greatest." }, { throwErrors: false })).to.equal(null);
		});

		it("should throw an error for any object format that has an invlid format property when specified", function() {
			var errorThrown = false;
			try { utilities.formatValue("Cheep cheep cheep cheep!", { type: "object", format: "You're my favourite customer!" }, { throwErrors: true }); }
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.equal(true);
		});

		it("should return null for any object format that has a format property that is a non-strict object", function() {
			expect(utilities.formatValue(null, { type: "object", format: new RegExp("Johnny's home!") })).to.equal(null);
			expect(utilities.formatValue(4096, { type: "object", format: ["not", "a", "real", "object"] }, { throwErrors: false })).to.equal(null);
		});

		it("should throw an error for any object format that has a format property that is a non-strict object when specified", function() {
			var errorThrown = false;
			try { utilities.formatValue(Infinity, { type: "object", format: testDate }, { throwErrors: true }); }
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.equal(true);
		});

		it("should return null for any object format that has an invalid nonEmpty property", function() {
			expect(utilities.formatValue(emptyFunction, { type: "object", format: new Error(500) })).to.equal(null);
			expect(utilities.formatValue(null, { type: "object", format: NaN }, { throwErrors: false })).to.equal(null);
		});

		it("should throw an error for any object format that has an invalid nonEmpty property when specified", function() {
			var errorThrown = false;
			try { utilities.formatValue(new Boolean(false), { type: "object", format: null }, { throwErrors: true }); }
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.equal(true);
		});

		it("should return null for any array format that has an invalid format property", function() {
			expect(utilities.formatValue(["Neil Breen"], { type: "array", format: "With such hits as Double Down!" })).to.equal(null);
			expect(utilities.formatValue({ director: { of: "Our Century" } }, { type: "array", format: "And Pass Thru." }, { throwErrors: false })).to.equal(null);
		});

		it("should throw an error for any array format that has an invlid format property when specified", function() {
			var errorThrown = false;
			try { utilities.formatValue({ alien: true, secretAgent: true, bioTerrorist: true, warVetran: true }, { type: "array", format: "Just how good is he at this stuff, Rich?" }, { throwErrors: true }); }
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.equal(true);
		});

		it("should return null for any array format that has a format property that is a non-strict object", function() {
			expect(utilities.formatValue("Satellite TV", { type: "array", format: new Error("He loves tuna!") })).to.equal(null);
			expect(utilities.formatValue("That's a lot of laptops!", { type: "array", format: testDate }, { throwErrors: false })).to.equal(null);
		});

		it("should throw an error for any array format that has a format property that is a non-strict object when specified", function() {
			var errorThrown = false;
			try { utilities.formatValue("Talk about his ballsack!", { type: "array", format: ["yes", "you", "see", "his", "ballsack"] }, { throwErrors: true }); }
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.equal(true);
		});

		it("should return null for any array format that has an invalid nonEmpty property", function() {
			expect(utilities.formatValue("Magical cancer curing powers!", { type: "array", nonEmpty: emptyFunction })).to.equal(null);
			expect(utilities.formatValue(["nothing", "but", "meaningless", "stuff"], { type: "array", nonEmpty: NaN }, { throwErrors: false })).to.equal(null);
		});

		it("should throw an error for any array format that has an invlid nonEmpty property when specified", function() {
			var errorThrown = false;
			try { utilities.formatValue({ found: "footage" }, { type: "array", nonEmpty: testDate }, { throwErrors: true }); }
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.equal(true);
		});

		it("should correctly format boolean values", function() {
			var values = [false, true, new Boolean(false), new Boolean(true), 0, 1, "f", "T", "N", "y", "0", "1", "fALSE", "True", "no", "YES", "Off", "ON"];
			var formats = [{ type: "bool"}, { type: "boolean" }, { type: "BOOL"}, { type: "bOoLeAn" }];
			var results = [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true];

			for(var i = 0; i < values.length; i++) {
				for(var j = 0; j < formats.length; j++) {
					expect(utilities.formatValue(values[i], formats[j])).to.equal(results[i]);
				}
			}
		});

		it("should return null when formatting invalid boolean values", function() {
			expect(utilities.formatValue(-Infinity, { type: "bool" })).to.equal(null);
			expect(utilities.formatValue(-Infinity, { type: "bool" }, { throwErrors: false })).to.equal(null);
		});

		it("should throw an error when formatting invalid boolean values when specified", function() {
			var errorThrown = false;
			try { utilities.formatValue(NaN, { type: "bool" }, { throwErrors: true }); }
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.equal(true);
		});

		it("should correctly format integer values", function() {
			var values = [0, 1, -69, -3.33333, 88, "-32", "-1", "0", "1", "64", "-1.1", "0.48", "2.71828"];
			var formats = [{ type: "int"}, { type: "integer" }, { type: "INT"}, { type: "iNtEgEr" }];
			var results = [0, 1, -69, -3, 88, -32, -1, 0, 1, 64, -1, 0, 2];

			for(var i = 0; i < values.length; i++) {
				for(var j = 0; j < formats.length; j++) {
					expect(utilities.formatValue(values[i], formats[j])).to.equal(results[i]);
				}
			}
		});

		it("should return null when formatting invalid integer values", function() {
			expect(utilities.formatValue(NaN, { type: "int" })).to.equal(null);
			expect(utilities.formatValue(NaN, { type: "int" }, { throwErrors: false })).to.equal(null);
		});

		it("should throw an error when formatting invalid integer values when specified", function() {
			var errorThrown = false;
			try { utilities.formatValue(Infinity, { type: "int" }, { throwErrors: true }); }
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.equal(true);
		});

		it("should correctly format float values", function() {
			var values = [0, 1, -69, -3.33333, 88, "-32", "-1", "0", "1", "64", "-1.1", "0.48", "2.71828"];
			var formats = [{ type: "float"}, { type: "number" }, { type: "FLOAT"}, { type: "nUmBeR" }];
			var results = [0, 1, -69, -3.33333, 88, -32, -1, 0, 1, 64, -1.1, 0.48, 2.71828];

			for(var i = 0; i < values.length; i++) {
				for(var j = 0; j < formats.length; j++) {
					expect(utilities.formatValue(values[i], formats[j])).to.equal(results[i]);
				}
			}
		});

		it("should return null when formatting invalid float values", function() {
			expect(utilities.formatValue([], { type: "float" })).to.equal(null);
			expect(utilities.formatValue([], { type: "float" }, { throwErrors: false })).to.equal(null);
		});

		it("should throw an error when formatting invalid float values when specified", function() {
			var errorThrown = false;
			try { utilities.formatValue(emptyFunction, { type: "float" }, { throwErrors: true }); }
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.equal(true);
		});

		it("should correctly format string values", function() {
			function func() { throw new Error("Do you like your new toy?"); };
			var values = testData.slice(2).concat(new Error("So here's this giant enemy crab."), utilities.createError("new fone who dis", 416), func, /but{1,2}s?/gmi);
			var formats = [{ type: "string"}, { type: "StRiNg" }];
			var results = ["false", "true", "false", "true", "0", "1", "3.141592654", "NaN", "Infinity", "-Infinity", "", "test", " trim\t", "{}", "{\"nice\":\"meme\"}", "[]", "[0]", testDate.toString(), emptyFunctionString, "/.+/", "{\"message\":\"So here's this giant enemy crab.\"}", "{\"message\":\"new fone who dis\",\"status\":416}", func.toString(), "/but{1,2}s?/gmi"];

			for(var i = 0; i < values.length; i++) {
				for(var j = 0; j < formats.length; j++) {
					expect(utilities.formatValue(values[i], formats[j])).to.equal(results[i]);
				}
			}
		});

		it("should correctly trim string values", function() {
			var values = ["", " ", "\t", " trim\t", "\t twilight\tmeets\thappy\tdays \t", "sunshine"];
			var format = { type: "string", trim: true };
			var results = ["", "", "", "trim", "twilight\tmeets\thappy\tdays", "sunshine"];

			for(var i = 0; i < values.length; i++) {
				expect(utilities.formatValue(values[i], format)).to.equal(results[i]);
			}
		});

		it("should return null for empty string values when nonEmpty is set to true", function() {
			var values = ["", " ", "\t", " \t", "\t ", "  \t  \t\t ", "\tlong brown hair", "big white lips "];
			var format = { type: "string", nonEmpty: true };
			var options = [{ verbose: true}, { verbose: false }];
			var results = [null, " ", "\t", " \t", "\t ", "  \t  \t\t ", "\tlong brown hair", "big white lips "];

			for(var i = 0; i < values.length; i++) {
				for(var j = 0; j < options.length; j++) {
					expect(utilities.formatValue(values[i], format)).to.equal(results[i]);
					expect(utilities.formatValue(values[i], format, options[j])).to.equal(results[i]);
				}
			}
		});

		it("should return null for empty string values when nonEmpty and trim are set to true", function() {
			var values = ["", " ", "\t", " \t", "\t ", "  \t  \t\t ", "\tduke nukem", "let god sort 'em out "];
			var format = { type: "string", nonEmpty: true, trim: true };
			var options = [{ verbose: true}, { verbose: false }];
			var results = [null, null, null, null, null, null, "duke nukem", "let god sort 'em out"];

			for(var i = 0; i < values.length; i++) {
				for(var j = 0; j < options.length; j++) {
					expect(utilities.formatValue(values[i], format)).to.equal(results[i]);
					expect(utilities.formatValue(values[i], format, options[j])).to.equal(results[i]);
				}
			}
		});

		it("should throw an error when specified for empty string values when nonEmpty is set to true", function() {
			var values = ["", " ", "\t", " \t", "\t ", "  \t  \t\t ", "\tcherry pepsi", "private caller "];
			var format = { type: "string", nonEmpty: true };
			var options = [{ throwErrors: true }, { throwErrors: true, verbose: true }, { throwErrors: true, verbose: false }];
			var results = [null, " ", "\t", " \t", "\t ", "  \t  \t\t ", "\tcherry pepsi", "private caller "];

			for(var i = 0; i < values.length; i++) {
				for(var j = 0; j < options.length; j++) {
					var errorThrown = false;
					try { utilities.formatValue(values[i], format, options[j]); }
					catch(error) { errorThrown = true; }
					expect(errorThrown).to.equal(results[i] === null);
				}
			}
		});

		it("should throw an error when specified for empty string values when nonEmpty and trim are set to true", function() {
			var values = ["", " ", "\t", " \t", "\t ", "  \t  \t\t ", "\tflamingosis", "a groovy thing "];
			var format = { type: "string", nonEmpty: true, trim: true };
			var options = [{ throwErrors: true }, { throwErrors: true, verbose: true }, { throwErrors: true, verbose: false }];
			var results = [null, null, null, null, null, null, "flamingosis", "a groovy thing"];

			for(var i = 0; i < values.length; i++) {
				for(var j = 0; j < options.length; j++) {
					var errorThrown = false;
					try { utilities.formatValue(values[i], format, options[j]); }
					catch(error) { errorThrown = true; }
					expect(errorThrown).to.equal(results[i] === null);
				}
			}
		});

		it("should correctly transform the case of a string value using each of the available case functions", function() {
			var modifiedCaseFunctionNames = ["Camel", "CONSTANT", "Dot", "HEADER", "Lower", "LOWER_FIRST", "No", "PARAM", "Pascal", "PATH", "Sentence", "SNAKE", "Swap", "TITLE", "Upper", "upper-first"];
			var changeCaseData = ["CAMEL_CASE", "constantCase", "DotCase", "header-case", "LOWER CASE", "LOWER_FIRST", "No case", "param/case", "pascal_case", "Path-Case", "SENTENCE_CASE", "snakeCase", "SwapCase", "TITLE.CASE", "upper-case", "upper first"];
			var changeCaseResults = ["camelCase", "CONSTANT_CASE", "dot.case", "Header-Case", "lower case", "lOWER_FIRST", "no case", "param-case", "PascalCase", "path/case", "Sentence case", "snake_case", "sWAPcASE", "Title Case", "UPPER-CASE", "Upper first"];

			for(var i = 0; i < changeCaseData.length; i++) {
				expect(utilities.formatValue(changeCaseData[i], { type: "string", case: stringCaseFunctionNames[i] })).to.equal(changeCaseResults[i]);
				expect(utilities.formatValue(changeCaseData[i], { type: "string", case: modifiedCaseFunctionNames[i] })).to.equal(changeCaseResults[i]);
			}
		});

		it("should correctly format date values", function() {
			var values = [0, 1, testDate, "June 5, 2012", "June 18, 1987 3:30 PM", "2018-02-19T06:19:33Z", testDate.getTime(), testDate.toString(), testDate.getTime().toString()];
			var formats = [{ type: "date"}, { type: "DaTe" }];
			var results = [new Date(0), new Date(1), testDate, new Date("June 5, 2012"), new Date("June 18, 1987 3:30 PM"), new Date("2018-02-19T06:19:33Z"), testDate, new Date(testDate.toString()), testDate];

			for(var i = 0; i < values.length; i++) {
				for(var j = 0; j < formats.length; j++) {
					expect(utilities.formatValue(values[i], formats[j])).to.deep.equal(results[i]);
				}
			}
		});

		it("should return null when formatting invalid date values", function() {
			expect(utilities.formatValue(-Infinity, { type: "date" })).to.equal(null);
			expect(utilities.formatValue(Infinity, { type: "date" }, { throwErrors: false })).to.equal(null);
		});

		it("should throw an error when formatting invalid date values when specified", function() {
			var errorThrown = false;
			try { utilities.formatValue(NaN, { type: "date" }, { throwErrors: true }); }
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.equal(true);
		});

		var invalidRegExpValues = testData.slice(-1, 1).concat("/", "/door/stuck", "/y/x");

		it("should correctly format regular expression values", function() {
			var values = [testRegExp, "/pop[ ]*the[ ]kettle/gmi", "/corporate/m", "/spy/i", "/ayy/gm", "/lmao/g", "/muggachini/"];
			var results = [/.+/, /pop[ ]*the[ ]kettle/gmi, /corporate/m, /spy/i, /ayy/gm, /lmao/g, /muggachini/];

			var regExpFlagSupported = {
				sticky: true,
				unicode: true
			};

			try {
				new RegExp("", "y");
			}
			catch(error) {
				regExpFlagSupported.sticky = false;
			}

			try {
				new RegExp("", "u");
			}
			catch(error) {
				regExpFlagSupported.unicode = false;
			}

			if(regExpFlagSupported.unicode) {
				values.push(/a/gmiu);
				results.push(/a/gmiu);
			}

			if(regExpFlagSupported.sticky) {
				values.push(/b/gmiy);
				results.push(/b/gmiy);
			}

			values.push(/c/gmi, /d/gm, /e/g, /f/);
			results.push(/c/gmi, /d/gm, /e/g, /f/);

			if(regExpFlagSupported.unicode) {
				values.push(new RegExp("1", "gmiu"));
				results.push(/1/gmiu);
			}

			if(regExpFlagSupported.sticky) {
				values.push(new RegExp("2", "gmiy"));
				results.push(/2/gmiy);
			}

			values.push(new RegExp("3", "gmi"), new RegExp("4", "gm"), new RegExp("5", "g"), new RegExp("6"));
			results.push(/3/gmi, /4/gm, /5/g, /6/);

			it("should be a function", function() {
				expect(utilities.parseRegularExpression).to.be.a("function");
			});

			var formats = [{ type: "regex"}, { type: "rEgEx" }, { type: "regexp"}, { type: "rEgExP" }, { type: "regularexpression"}, { type: "REGULARexpression" }];

			for(var i = 0; i < values.length; i++) {
				for(var j = 0; j < formats.length; j++) {
					expect(utilities.formatValue(values[i], formats[j])).to.deep.equal(results[i]);
				}
			}
		});

		it("should return null when formatting invalid regular expression values", function() {
			for(var i = 0; i < invalidRegExpValues.length; i++) {
				expect(utilities.formatValue(invalidRegExpValues[i], { type: "regex" })).to.equal(null);
				expect(utilities.formatValue(invalidRegExpValues[i], { type: "regex" }, { throwErrors: false })).to.equal(null);
			}
		});

		it("should throw an error when formatting invalid regular expression values when specified", function() {
			for(var i = 0; i < invalidRegExpValues.length; i++) {
				var errorThrown = false;
				try { utilities.formatValue(invalidRegExpValues[i], { type: "regex" }, { throwErrors: true }); }
				catch(error) { errorThrown = true; }
				expect(errorThrown).to.equal(true);
			}
		});

		var invalidFunctionValues = testData.slice(2).filter(function(value, index) {
			return !(value instanceof Function);
		});

		it("should correctly format function values", function() {
			function testFunction(meme) {
				if(meme.isDank) {
					console.log("airhorn.wav");
				}
			};

			var values = [emptyFunction, testFunction];
			var formats = [{ type: "func"}, { type: "FUNC" }, { type: "function" }, { type: "FuNcTiOn" }];
			var results = [emptyFunction, testFunction];

			for(var i = 0; i < values.length; i++) {
				for(var j = 0; j < formats.length; j++) {
					expect(utilities.formatValue(values[i], formats[j])).to.deep.equal(results[i]);
				}
			}
		});

		it("should return null when formatting invalid function values", function() {
			for(var i = 0; i < invalidFunctionValues.length; i++) {
				expect(utilities.formatValue(invalidFunctionValues[i], { type: "function" })).to.equal(null);
				expect(utilities.formatValue(invalidFunctionValues[i], { type: "func" }, { throwErrors: false })).to.equal(null);
			}
		});

		it("should throw an error when formatting invalid function values when specified", function() {
			for(var i = 0; i < invalidFunctionValues.length; i++) {
				var errorThrown = false;
				try { utilities.formatValue(invalidFunctionValues[i], { type: "func" }, { throwErrors: true }); }
				catch(error) { errorThrown = true; }
				expect(errorThrown).to.equal(true);
			}
		});

		it("should correctly format simple object values", function() {
			var values = [
				{ },
				{ enjoy: "yourself" },
				testDate,
				testRegExp,
				[[]],
				[[[7331]]],
				new Boolean(false),
				new Boolean(true)
			];

			var formats = [{ type: "object"}, { type: "oBjEcT" }];

			var results = utilities.clone(values);

			for(var i = 0; i < values.length; i++) {
				for(var j = 0; j < formats.length; j++) {
					expect(utilities.formatValue(values[i], formats[j])).to.deep.equal(results[i]);
				}
			}
		});

		var invalidObjectValues = testData.slice(2).filter(function(value, index) {
			return !utilities.isObject(value);
		});

		it("should return null when formatting invalid simple object values", function() {
			for(var i = 0; i < invalidObjectValues.length; i++) {

				expect(utilities.formatValue(invalidObjectValues[i], { type: "object" })).to.equal(null);
				expect(utilities.formatValue(invalidObjectValues[i], { type: "object" }, { throwErrors: false })).to.equal(null);
			}
		});

		it("should throw an error when specified while formatting invalid simple object values", function() {
			var errorThrown = null;

			for(var i = 0; i < invalidObjectValues.length; i++) {
				errorThrown = false;
				try { utilities.formatValue(invalidObjectValues[i], { type: "object" }, { throwErrors: true }); }
				catch(error) { errorThrown = true; }
				expect(errorThrown).to.equal(true);
			}
		});

		it("should correctly format stringified object values", function() {
			var values = [
				{ },
				{ enjoy: "yourself" },
				[[]],
				[[[7331]]]
			];

			var formats = [{ type: "object"}, { type: "oBjEcT" }];

			var results = utilities.clone(values);

			for(var i = 0; i < values.length; i++) {
				for(var j = 0; j < formats.length; j++) {
					expect(utilities.formatValue(JSON.stringify(values[i]), formats[j])).to.deep.equal(results[i]);
				}
			}
		});

		it("should correctly format strict object values", function() {
			var values = [
				{ },
				{ enjoy: "yourself" }
			];

			var formats = [{ type: "object"}, { type: "oBjEcT" }];

			var results = utilities.clone(values);

			for(var i = 0; i < values.length; i++) {
				for(var j = 0; j < formats.length; j++) {
					expect(utilities.formatValue(JSON.stringify(values[i]), formats[j])).to.deep.equal(results[i]);
				}
			}
		});

		it("should correctly format stringified strict object values", function() {
			var values = [
				{ },
				{ enjoy: "yourself" }
			];

			var formats = [{ type: "object"}, { type: "oBjEcT" }];

			var results = utilities.clone(values);

			for(var i = 0; i < values.length; i++) {
				for(var j = 0; j < formats.length; j++) {
					expect(utilities.formatValue(JSON.stringify(values[i]), formats[j])).to.deep.equal(results[i]);
				}
			}
		});

		var invalidStrictObjectValues = [
			[],
			"[]",
			testDate,
			testRegExp,
			[[]],
			[[[7331]]],
			new Boolean(false),
			new Boolean(true)
		];

		it("should return null when formatting invalid strict object values", function() {
			for(var i = 0; i < invalidStrictObjectValues.length; i++) {

				expect(utilities.formatValue(invalidStrictObjectValues[i], { type: "object", strict: true })).to.equal(null);
				expect(utilities.formatValue(invalidStrictObjectValues[i], { type: "object", strict: true }, { throwErrors: false })).to.equal(null);
			}
		});

		it("should throw an error when specified while formatting invalid strict object values", function() {
			var errorThrown = null;

			for(var i = 0; i < invalidStrictObjectValues.length; i++) {
				errorThrown = false;
				try { utilities.formatValue(invalidStrictObjectValues[i], { type: "object", strict: true }, { throwErrors: true }); }
				catch(error) { errorThrown = true; }
				expect(errorThrown).to.equal(true);
			}
		});

		it("should correctly generate objects with default values when autopopulate is set to true", function() {
			var values = [
				{ },
				{ the: null },
				{ the: { game: "lost" } }
			];

			var formats = [
				{
					type: "object",
					autopopulate: true
				},
				{
					type: "object",
					autopopulate: true,
					format: {
						the: {
							type: "string",
							default: "what?"
						},
						gangnam: {
							type: "string",
							default: "style"
						}
					}
				},
				{
					type: "object",
					autopopulate: true,
					format: {
						the: {
							type: "object",
							nullable: true,
							autopopulate: true,
							format: {
								ha: {
									type: "string",
									default: "ha"
								}
							}
						}
					}
				},
				{
					type: "object",
					autopopulate: true,
					format: {
						the: {
							type: "object",
							autopopulate: true,
							default: {
								fake: "news"
							},
							format: {
								ha: {
									type: "string",
									default: "ha"
								}
							}
						}
					}
				}
			];

			var results = [
				utilities.clone(values),
				[
					{
						the: "what?",
						gangnam: "style"
					},
					{
						the: "what?",
						gangnam: "style"
					},
					{
						the: JSON.stringify({
							game: "lost"
						}),
						gangnam: "style"
					}
				],
				[
					{
						the: {
							ha: "ha"
						}
					},
					{
						the: {
							ha: "ha"
						}
					},
					{
						the: {
							game: "lost",
							ha: "ha"
						}
					}
				],
				[
					{
						the: {
							fake: "news",
							ha: "ha"
						}
					},
					{
						the: {
							fake: "news",
							ha: "ha"
						}
					},
					{
						the: {
							game: "lost",
							ha: "ha"
						}
					},
				]
			];

			for(var i = 0; i < formats.length; i++) {
				for(var j = 0; j < values.length; j++) {
					expect(utilities.formatValue(values[j], formats[i])).to.deep.equal(results[i][j]);
					expect(utilities.formatValue(JSON.stringify(values[j]), formats[i], { throwErrors: false })).to.deep.equal(results[i][j]);
					expect(utilities.formatValue(values[j], formats[i])).to.deep.equal(results[i][j]);
					expect(utilities.formatValue(JSON.stringify(values[j]), formats[i], { throwErrors: false })).to.deep.equal(results[i][j]);
				}
			}
		});

		it("should correctly remove extraneous attributes from objects when removeExtra is set to true and a valid format is specified", function() {
			var values = [
				{ },
				{ number: "5", is: { alive: true, dead: "no" } }
			];

			var formats = [
				{
					type: "object",
					removeExtra: true
				},
				{
					type: "object",
					removeExtra: true,
					format: {
						number: {
							type: "integer"
						}
					}
				},
				{
					type: "object",
					removeExtra: true,
					format: {
						is: {
							type: "object"
						}
					}
				},
				{
					type: "object",
					removeExtra: true,
					format: {
						is: {
							type: "object",
							removeExtra: true,
							format: {
								compute: {
									type: "int"
								}
							}
						}
					}
				},
				{
					type: "object",
					removeExtra: true,
					format: {
						is: {
							type: "object",
							removeExtra: true,
							format: {
								dead: {
									type: "boolean"
								}
							}
						}
					}
				}
			];

			var results = [
				utilities.clone(values),
				[
					{ },
					{ number: 5 },
				],
				[
					{ },
					{ is: { alive: true, dead: "no" } }
				],
				[
					{ },
					{ is: { } }
				],
				[
					{ },
					{ is: { dead: false } }
				]
			];

			for(var i = 0; i < formats.length; i++) {
				for(var j = 0; j < values.length; j++) {
					expect(utilities.formatValue(values[j], formats[i])).to.deep.equal(results[i][j]);
					expect(utilities.formatValue(JSON.stringify(values[j]), formats[i], { throwErrors: false })).to.deep.equal(results[i][j]);
					expect(utilities.formatValue(values[j], formats[i])).to.deep.equal(results[i][j]);
					expect(utilities.formatValue(JSON.stringify(values[j]), formats[i], { throwErrors: false })).to.deep.equal(results[i][j]);
				}
			}
		});

		it("should correctly re-order object attributes when order is set to true and a valid format is specified", function() {
			var values = [
				{ },
				{ d: null, b: 1, a: "2", c: "three" }
			];

			var formats = [
				{
					type: "object",
					order: true
				},
				{
					type: "object",
					order: true,
					format: {
						a: { type: "integer" },
						b: { type: "float" },
						c: { type: "string" },
						d: { type: "date", nullable: true }
					}
				},
				{
					type: "object",
					order: true,
					format: {
						c: { type: "string" },
						b: { type: "number" }
					}
				}
			];

			var results = [
				[
					{ },
					{ d: null, b: 1, a: "2", c: "three" }
				],
				[
					{ },
					{ a: 2, b: 1, c: "three", d: null },
				],
				[
					{ },
					{ c: "three", b: 1, a: "2", d: null }
				]
			];

			for(var i = 0; i < formats.length; i++) {
				for(var j = 0; j < values.length; j++) {
					expect(utilities.formatValue(values[j], formats[i])).to.deep.equal(results[i][j]);
					expect(utilities.formatValue(JSON.stringify(values[j]), formats[i], { throwErrors: false })).to.deep.equal(results[i][j]);
					expect(utilities.formatValue(values[j], formats[i])).to.deep.equal(results[i][j]);
					expect(utilities.formatValue(JSON.stringify(values[j]), formats[i], { throwErrors: false })).to.deep.equal(results[i][j]);
				}
			}
		});

		it("should return null when formatting object values and nonEmpty is set to true", function() {
			expect(utilities.formatValue({ }, { type: "object", nonEmpty: true })).to.equal(null);
			expect(utilities.formatValue({ }, { type: "OBJECT", nonEmpty: true }, { throwErrors: false })).to.equal(null);
			expect(utilities.formatValue("{ }", { type: "oBjEcT", nonEmpty: true })).to.equal(null);
			expect(utilities.formatValue("{ }", { type: "oBJECt", nonEmpty: true }, { throwErrors: false })).to.equal(null);
		});

		it("should throw an error when specified while formatting empty object values and nonEmpty is set to true", function() {
			var errorThrown = false;
			try { utilities.formatValue({ }, { type: "object", nonEmpty: true }, { throwErrors: true }); }
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.equal(true);

			errorThrown = false;
			try { utilities.formatValue("{ }", { type: "object", nonEmpty: true }, { throwErrors: true }); }
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.equal(true);
		});

		it("should return null when formatting invalid strict object values", function() {
			for(var i = 0; i < invalidStrictObjectValues.length; i++) {

				expect(utilities.formatValue(invalidStrictObjectValues[i], { type: "object", strict: true })).to.equal(null);
				expect(utilities.formatValue(invalidStrictObjectValues[i], { type: "object", strict: true }, { throwErrors: false })).to.equal(null);
			}
		});

		it("should throw an error when specified while formatting invalid strict object values", function() {
			var errorThrown = null;

			for(var i = 0; i < invalidStrictObjectValues.length; i++) {
				errorThrown = false;
				try { utilities.formatValue(invalidStrictObjectValues[i], { type: "object", strict: true }, { throwErrors: true }); }
				catch(error) { errorThrown = true; }
				expect(errorThrown).to.equal(true);
			}
		});

		var invalidArrayValues = testData.slice(2).filter(function(value, index) {
			return !Array.isArray(value);
		});

		invalidArrayValues.push("[", "{ }", "[no]");

		it("should correctly format array values", function() {
			var arrayValues = [];
			arrayValues.push([]);
			arrayValues.push([4, 2, 0]);
			arrayValues.push([3, "inches", ["blood"], { u: "wot" }, false, null]);

			var arrayResults = utilities.clone(arrayValues);

			var formats = [{ type: "array"}, { type: "aRrAy" }];

			for(var i = 0; i < arrayValues.length; i++) {
				for(var j = 0; j < formats.length; j++) {
					expect(utilities.formatValue(arrayValues[i], formats[j])).to.deep.equal(arrayResults[i]);
					expect(utilities.formatValue(JSON.stringify(arrayValues[i]), formats[j])).to.deep.equal(arrayResults[i]);
					expect(utilities.formatValue(arrayValues[i], formats[j])).to.deep.equal(arrayResults[i]);
					expect(utilities.formatValue(JSON.stringify(arrayValues[i]), formats[j])).to.deep.equal(arrayResults[i]);
				}
			}
		});

		it("should omit undefined values from arrays", function() {
			expect(utilities.formatValue([undefined], { type: "array" })).to.deep.equal([]);
			expect(utilities.formatValue([undefined], { type: "array", format: { type: "string" } })).to.deep.equal([]);
		});

		it("should return null when formatting invalid array values", function() {
			for(var i = 0; i < invalidArrayValues.length; i++) {
				expect(utilities.formatValue(invalidArrayValues[i], { type: "array" })).to.equal(null);
				expect(utilities.formatValue(invalidArrayValues[i], { type: "ARRAY" }, { throwErrors: false })).to.equal(null);
			}
		});

		it("should throw an error when formatting invalid array values when specified", function() {
			for(var i = 0; i < invalidArrayValues.length; i++) {
				var errorThrown = false;
				try { utilities.formatValue(invalidArrayValues[i], { type: "array" }, { throwErrors: true }); }
				catch(error) { errorThrown = true; }
				expect(errorThrown).to.equal(true);
			}
		});

		it("should return null when formatting empty array values and nonEmpty is set to true", function() {
			expect(utilities.formatValue([], { type: "array", nonEmpty: true })).to.equal(null);
			expect(utilities.formatValue([], { type: "ARRAY", nonEmpty: true }, { throwErrors: false })).to.equal(null);
			expect(utilities.formatValue("[]", { type: "array", nonEmpty: true })).to.equal(null);
			expect(utilities.formatValue("[]", { type: "ARRAY", nonEmpty: true }, { throwErrors: false })).to.equal(null);
		});

		it("should throw an error when specified while formatting empty array values and nonEmpty is set to true", function() {
			var errorThrown = false;
			try { utilities.formatValue([], { type: "array", nonEmpty: true }, { throwErrors: true }); }
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.equal(true);

			errorThrown = false;
			try { utilities.formatValue("[]", { type: "array", nonEmpty: true }, { throwErrors: true }); }
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.equal(true);
		});

		it("should correctly format arrays with format options", function() {
			function func() { throw new Error("How about some fresh memes?"); };

			function testFunction(meme) {
				if(meme.isDank) {
					console.log("airhorn.wav");
				}
			};

			var regExpValues = [testRegExp, "/pop[ ]*the[ ]kettle/gmi", "/corporate/m", "/spy/i", "/ayy/gm", "/lmao/g", "/muggachini/"];
			var regExpResults = [/.+/, /pop[ ]*the[ ]kettle/gmi, /corporate/m, /spy/i, /ayy/gm, /lmao/g, /muggachini/];

			var regExpFlagSupported = {
				sticky: true,
				unicode: true
			};

			try {
				new RegExp("", "y");
			}
			catch(error) {
				regExpFlagSupported.sticky = false;
			}

			try {
				new RegExp("", "u");
			}
			catch(error) {
				regExpFlagSupported.unicode = false;
			}

			if(regExpFlagSupported.unicode) {
				regExpValues.push(/a/gmiu);
				regExpResults.push(/a/gmiu);
			}

			if(regExpFlagSupported.sticky) {
				regExpValues.push(/b/gmiy);
				regExpResults.push(/b/gmiy);
			}

			regExpValues.push(/c/gmi, /d/gm, /e/g, /f/);
			regExpResults.push(/c/gmi, /d/gm, /e/g, /f/);

			if(regExpFlagSupported.unicode) {
				regExpValues.push(new RegExp("1", "gmiu"));
				regExpResults.push(/1/gmiu);
			}

			if(regExpFlagSupported.sticky) {
				regExpValues.push(new RegExp("2", "gmiy"));
				regExpResults.push(/2/gmiy);
			}

			regExpValues.push(new RegExp("3", "gmi"), new RegExp("4", "gm"), new RegExp("5", "g"), new RegExp("6"));
			regExpResults.push(/3/gmi, /4/gm, /5/g, /6/);

			var arrayValues = [];
			arrayValues.push([]);
			arrayValues.push([6, 9]);
			arrayValues.push([5, "finger", ["death"], { punch: "!" }, true, null]);
			arrayValues.push([[[420]]]);

			var arrayResults = utilities.clone(arrayValues);

			var objectValues = [
				[{ }],
				[{ dynatron: "rise to the stars" }],
				[testDate],
				[testRegExp],
				[[]],
				[[[7331]]],
				[new Boolean(false)],
				[new Boolean(true)]
			];

			var stringifiedObjectValues = [];

			for(var i = 0; i < objectValues.length; i++) {
				stringifiedObjectValues.push(JSON.stringify(objectValues[i]));
			}

			objectValues.concat(stringifiedObjectValues);

			var objectResults = utilities.clone(objectValues);
			objectResults.concat(objectResults);

			var typedArrayValues = [
				{
					formats: [
						{ type: "bool"},
						{ type: "boolean" },
						{ type: "BOOL"},
						{ type: "bOoLeAn" }
					],
					values: [
						["false"],
						["true"],
						[false, true, new Boolean(false), new Boolean(true), 0, 1, "f", "T", "N", "y", "0", "1", "fALSE", "True", "no", "YES", "Off", "ON"]
					],
					results: [
						[false],
						[true],
						[false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true]
					]
				},
				{
					formats: [
						{ type: "int"},
						{ type: "integer" },
						{ type: "INT"},
						{ type: "iNtEgEr" }
					],
					values: [
						[0],
						["-32"],
						[0, 1, -69, -3.33333, 88, "-32", "-1", "0", "1", "64", "-1.1", "0.48", "2.71828"]
					],
					results: [
						[0],
						[-32],
						[0, 1, -69, -3, 88, -32, -1, 0, 1, 64, -1, 0, 2]
					]
				},
				{
					formats: [
						{ type: "float"},
						{ type: "number" },
						{ type: "FLOAT"},
						{ type: "nUmBeR" }
					],
					values: [
						[6.9],
						["-1.337"],
						[0, 1, -69, -3.33333, 88, "-32", "-1", "0", "1", "64", "-1.1", "0.48", "2.71828"]
					],
					results: [
						[6.9],
						[-1.337],
						[0, 1, -69, -3.33333, 88, -32, -1, 0, 1, 64, -1.1, 0.48, 2.71828]
					]
				},
				{
					formats: [
						{ type: "string"},
						{ type: "StRiNg" }
					],
					values: [
						testData.slice(2).concat(new Error("So here's this giant enemy crab."), utilities.createError("new fone who dis", 416), func, /but{1,2}s?/gmi)
					],
					results: [
						["false", "true", "false", "true", "0", "1", "3.141592654", "NaN", "Infinity", "-Infinity", "", "test", " trim\t", "{}", "{\"nice\":\"meme\"}", "[]", "[0]", testDate.toString(), emptyFunctionString, "/.+/", "{\"message\":\"So here's this giant enemy crab.\"}", "{\"message\":\"new fone who dis\",\"status\":416}", func.toString(), "/but{1,2}s?/gmi"]
					]
				},
				{
					formats: [
						{ type: "date"},
						{ type: "DaTe" }
					],
					values: [
						[0, 1, testDate, "June 5, 2012", "June 18, 1987 3:30 PM", "2018-02-19T06:19:33Z", testDate.getTime(), testDate.toString(), testDate.getTime().toString()]
					],
					results: [
						[new Date(0), new Date(1), testDate, new Date("June 5, 2012"), new Date("June 18, 1987 3:30 PM"), new Date("2018-02-19T06:19:33Z"), testDate, new Date(testDate.toString()), testDate]
					]
				},
				{
					formats: [
						{ type: "regex"},
						{ type: "rEgEx" },
						{ type: "regexp"},
						{ type: "rEgExP" },
						{ type: "regularexpression"},
						{ type: "REGULARexpression" }
					],
					values: [
						regExpValues
					],
					results: [
						regExpResults
					]
				},
				{
					formats: [
						{ type: "func"},
						{ type: "FUNC" },
						{ type: "function" },
						{ type: "FuNcTiOn" }
					],
					values: [
						[emptyFunction, func, testFunction]
					],
					results: [
						[emptyFunction, func, testFunction]
					]
				},
				{
					formats: [
						{ type: "object"},
						{ type: "oBjEcT" }
					],
					values: objectValues,
					results: objectResults
				},
				{
					formats: [
						{ type: "array"},
						{ type: "aRrAy" }
					],
					values: [
						arrayValues,
						JSON.stringify(arrayValues)
					],
					results: [
						arrayResults,
						arrayResults
					]
				}
			];

			for(var i = 0; i < typedArrayValues.length; i++) {
				for(var j = 0; j < typedArrayValues[i].values.length; j++) {
					for(var k = 0; k < typedArrayValues[i].formats.length; k++) {
						expect(utilities.formatValue(typedArrayValues[i].values[j], { type: "array", format: typedArrayValues[i].formats[k] })).to.deep.equal(typedArrayValues[i].results[j]);
					}
				}
			}
		});

		it("should return null when formatting invalid array values with format options", function() {
			expect(utilities.formatValue([{ vanilla: emptyFunction }], { type: "array", format: { vanilla: { type: "integer" } } })).to.equal(null);
			expect(utilities.formatValue([{ flamingosis: testDate }], { type: "array", format: { flamingosis: { type: "bool" } } }, { throwErrors: false })).to.equal(null);
		});

		it("should throw an error when specified while formatting invalid array values with format options", function() {
			var errorThrown = false;
			try { utilities.formatValue([{ saint: "pepsi" }], { type: "array", format: { saint: { type: "float" } } }, { throwErrors: true }); }
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.equal(true);
		});

		it("should correctly apply a parser function to a value before formatting", function() {
			expect(utilities.formatValue("( . Y . )", {
				type: "object",
				format: {
					message: {
						type: "string"
					},
					halfLength: {
						type: "float"
					}
				},
				parser: function(value, format, options) {
					return {
						message: value,
						halfLength: JSON.stringify(value.length / 2)
					}
				}
			})).to.deep.equal({ message: "( . Y . )", halfLength: 4.5 });
		});

		it("should return null if an error is thrown in a parser function", function() {
			expect(utilities.formatValue(420, {
				type: "integer",
				parser: function(value, format, options) {
					throw new Error("ur mum");
				}
			})).to.deep.equal(null);
		});

		it("should allow errors to be thrown from a parser function when specified", function() {
			var errorThrown = false;
			try {
				utilities.formatValue(420, {
					type: "integer",
					parser: function(value, format, options) {
						throw new Error("ur mum");
					}
				}, { throwErrors: true });
			}
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.deep.equal(true);
		});

		it("should correctly apply a validator function to a value after formatting where the value is valid", function() {
			expect(utilities.formatValue("1.337", {
				type: "number",
				validator: function(value, format, options) {
					return value > 0;
				}
			})).to.deep.equal(1.337);

			expect(utilities.formatValue(599.99, {
				type: "integer",
				validator: function(value, format, options) {
					return value > 0;
				}
			}, { throwErrors: true })).to.deep.equal(599);
		});

		it("should return null when a validator function check fails", function() {
			expect(utilities.formatValue(420.69, {
				type: "int",
				validator: function(value, format, options) {
					return value === 420.69;
				}
			})).to.deep.equal(null);
		});

		it("should return null if an error is thrown in a validator function", function() {
			expect(utilities.formatValue("wat", {
				type: "string",
				validator: function(value, format, options) {
					throw new Error("gtfo noob");
				}
			})).to.deep.equal(null);
		});

		it("should throw an error when specified if a validator function check fails", function() {
			var errorThrown = false;
			try {
				utilities.formatValue("{ \"ants\": [\"in\", \"my\", \"eyes\", \"johnson\"] }", {
					type: "object",
					validator: function(value, format, options) {
						return value.ants.length === 2;
					}
				}, { throwErrors: true });
			}
			catch(error) { errorThrown = true ; }
			expect(errorThrown).to.deep.equal(true);
		});

		it("should allow errors to be thrown from a validator function when specified", function() {
			var errorThrown = false;
			try {
				utilities.formatValue({ smooth: "schleem" }, {
					type: "string",
					validator: function(value, format, options) {
						throw new Error("Plumbus!");
					}
				}, { throwErrors: true });
			}
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.deep.equal(true);
		});

		it("should correctly apply a formatter function to a value after validation", function() {
			expect(utilities.formatValue("{ \"sled\": \"durst\" }", {
				type: "object",
				format: {
					sled: {
						type: "string"
					}
				},
				formatter: function(value, format, options) {
					var attributes = Object.keys(value);
					var formattedValue = "";

					for(var i = 0; i < attributes.length; i++) {
						if(formattedValue.length !== 0) {
							formattedValue += " ";
						}

						formattedValue += attributes[i] + " " + value[attributes[i]];
					}

					return formattedValue;
				}
			})).to.deep.equal("sled durst");
		});

		it("should return null if an error is thrown in a formatter function", function() {
			expect(utilities.formatValue({ mr: { poopy: "butthole" } }, {
				type: "object",
				format: {
					poopy: {
						type: "string"
					}
				},
				formatter: function(value, format, options) {
					throw new Error("Is something wrong, Beth?");
				}
			})).to.deep.equal(null);
		});

		it("should allow errors to be thrown from a formatter function when specified", function() {
			var errorThrown = false;
			try {
				utilities.formatValue({ real: ["fake", "doors"] }, {
					type: "object",
					format: {
						real: {
							type: "array"
						}
					},
					formatter: function(value, format, options) {
						throw new Error("Hey are you tired of real doors cluttering up your house?");
					}
				}, { throwErrors: true });
			}
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.deep.equal(true);
		});

		it("should allow for nullable values when specified", function() {
			expect(utilities.formatValue(null, { type: "string", nullable: true })).to.equal(null);
			expect(utilities.formatValue(null, { type: "string", nullable: true }, { throwErrors: false })).to.equal(null);
			expect(utilities.formatValue(null, { type: "string", nullable: true }, { throwErrors: true })).to.equal(null);
		});

		it("should return null for null values when nullable is set to false", function() {
			expect(utilities.formatValue(null, { type: "int", nullable: false })).to.equal(null);
			expect(utilities.formatValue(null, { type: "int", nullable: false }, { throwErrors: false })).to.equal(null);
		});

		it("should throw an error for null values when nullable is set to false", function() {
			var errorThrown = false;
			try { utilities.formatValue(null, { type: "int", nullable: false }, { throwErrors: true }); }
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.equal(true);
		});

		it("should allow for nullable object attributes when specified", function() {
			expect(utilities.formatValue({ null: null }, { type: "object", format: { null: { type: "bool", nullable: true } } })).to.deep.equal({ null: null });
			expect(utilities.formatValue({ null: null }, { type: "object", format: { null: { type: "bool", nullable: true } } }, { throwErrors: false })).to.deep.equal({ null: null });
			expect(utilities.formatValue({ null: null }, { type: "object", format: { null: { type: "bool", nullable: true } } }, { throwErrors: true })).to.deep.equal({ null: null });
		});

		it("should return null for null object attributes while nullable is set to false", function() {
			expect(utilities.formatValue({ null: null }, { type: "object", format: { null: { type: "bool", nullable: false } } })).to.equal(null);
			expect(utilities.formatValue({ null: null }, { type: "object", format: { null: { type: "bool", nullable: false } } }, { throwErrors: false })).to.equal(null);
		});

		it("should throw an error when specified for null object attributes while nullable is set to false", function() {
			var errorThrown = false;
			try { utilities.formatValue({ null: null }, { type: "object", format: { null: { type: "bool", nullable: false } } }, { throwErrors: true }); }
			catch(error) { errorThrown = true; }
			expect(errorThrown).to.equal(true);
		});

		var missingValues = [undefined, null];

		it("should substitute a default value when none is specified", function() {
			function testFunction() {
				return 2+2 === 4;
			}

			var formats = [
				{ type: "boolean", default: true },
				{ type: "bool", default: true },
				{ type: "integer", default: -8 },
				{ type: "int", default: 360 },
				{ type: "float", default: 3.141592654 },
				{ type: "number", default: -13.37 },
				{ type: "string", default: "eyeholes" },
				{ type: "regex", default: /a (slice|piece) of toast/i },
				{ type: "regexp", default: /ga(zorpazorp|r)field/ig },
				{ type: "regularexpression", default: /strawberry (schmiggles|shortcake)/igm },
				{ type: "function", default: emptyFunction },
				{ type: "func", default: testFunction },
				{ type: "object", default: { two: "brothers" } },
				{ type: "array", default: ["alien", "invasion", "tomato", "monster", "mexican", "armada", "brothers", "who", "are", "just", "regular", "brothers", "running", "in", "a", "van", "from", "an", "asteroid", "and", "all", "sorts", "of", "things", "the", "movie"] },
			];

			for(var i = 0; i < formats.length; i++) {
				for(var j = 0; j < missingValues.length; j++) {
					expect(utilities.formatValue(missingValues[j], formats[i])).to.deep.equal(formats[i].default);
					expect(utilities.formatValue(missingValues[j], utilities.merge(formats[i], { required: true }))).to.deep.equal(formats[i].default);
				}
			}
		});

		it("should return null when a required value is missing and no default is specified", function() {
			var format = {
				type: "string",
				required: true
			};

			for(var i = 0; i < missingValues.length; i++) {
				expect(utilities.formatValue(missingValues[i], format)).to.equal(null);
			}
		});

		it("should throw an error when specified if a required value is missing and no default is specified", function() {
			var format = {
				type: "string",
				required: true
			};

			var options = {
				throwErrors: true
			};

			var errorThrown = null;
			for(var i = 0; i < missingValues.length; i++) {
				errorThrown = false;
				try { utilities.formatValue(missingValues[i], format, options); }
				catch(error) { errorThrown = true; }
				expect(errorThrown).to.equal(true);
			}
		});

		it("should format a complex object", function() {
			function errorFunc() {
				throw new Error("y u do dis");
			}

			var value = {
				firstName: " Kevin \t",
				age: "30",
				birthday: "June 18, 1987",
				height: "183",
				password: "dnstuff",
				verify: "/[a-z]+42/i",
				isAlive: "Yes",
				error: errorFunc,
				exception: null,
				movies: ["Alien 3", " The boondock saints", "FIGHT CLUB\t", 9 ],
				albums: [
					{
						artist: "IN FLAMES",
						album: "Clayman",
						genre: "Melodic Death Metal",
						country: "Sweden"
					},
					{
						artist: "PreEmptive Strike 0.1  ",
						album: "Lethal Defence Systems",
						year: 2006,
						genre: "aggrotech"
					},
					{
						artist: "God Module",
						album: "\tviscera"
					},
					{
						artist: "TERRORFAKT",
						album: "deconstruction",
						year: "2002"
					},
					undefined
				],
				codeNames: {
					p: "how THE solar SYSTEM was WON",
					o: "rick sanchez",
					n: "VICTOR CHARLIE",
					m: "mAX dAMAGE",
					l: "Operation Desert Storm",
					k: "FROG FOOT",
					j: "PHILADELPHIA EXPERIMENT",
					i: "Ivo Robotnik",
					h: "Colonel Bossman",
					g: "LO Wang",
					f: "CALEB",
					e: "ION MAIDEN",
					d: "jamesBond",
					c: "serious_sam",
					b: "joanna dark",
					a: "DUKE NUKEM"
				},
				garbage: [
					{ },
					{ saint: "pepsi" },
					testDate,
					testRegExp,
					[[]],
					[[[7331]]],
					new Boolean(false),
					new Boolean(true),
					"{ }",
					"[]",
					"{ \"enjoy\": \"yourself\" }"
				],
				trash: [undefined]
			};

			var format = {
				type: "object",
				strict: true,
				nullable: true,
				required: true,
				format: {
					firstName: {
						type: "string",
						trim: true,
						nonEmpty: true,
						nullable: false
					},
					age: {
						type: "integer"
					},
					birthday: {
						type: "date",
						required: true
					},
					height: {
						type: "float",
						formatter: function(value, format, options) {
							if(utilities.isInvalidNumber(value)) {
								return -1;
							}

							return value / 100;
						}
					},
					password: {
						type: "string",
						nonEmpty: true,
						required: true,
						parser: function(value, format, options) {
							if(utilities.isEmptyString(value)) {
								return "password";
							}

							return value.toUpperCase() + 42;
						},
						validator: function(value, format, options) {
							return utilities.isNonEmptyString(value) && value.length >= 6;
						},
						formatter: function(value, format, options) {
							if(utilities.isEmptyString(value)) {
								return "";
							}

							var formattedValue = "";

							for(var i = 0; i < value.length; i++) {
								formattedValue += "*";
							}

							return formattedValue;
						}
					},
					verify: {
						type: "regex",
						required: true,
						validator: function(value, format, options) {
							if(!utilities.isRegularExpression(value)) {
								return false;
							}

							return value.ignoreCase && value.source.endsWith("42");
						}
					},
					isAlive: {
						type: "boolean",
						required: true
					},
					error: {
						type: "func"
					},
					exception: {
						type: "function",
						nullable: true
					},
					movies: {
						type: "array",
						format: {
							type: "string",
							case: "title",
							trim: true
						},
						parser: function(value, format, options) {
							if(!utilities.isNonEmptyArray(value)) {
								return [];
							}

							var formattedValue = [];

							for(var i = 0; i < value.length; i++) {
								if(utilities.isEmptyString(value[i])) {
									continue;
								}

								formattedValue.push(value[i]);
							}

							return formattedValue;
						}
					},
					albums: {
						type: "array",
						nonEmpty: true,
						required: true,
						format: {
							type: "object",
							removeExtra: true,
							nonEmpty: true,
							format: {
								artist: {
									type: "string",
									trim: true,
									nonEmpty: true,
									required: true
								},
								album: {
									type: "string",
									case: "title",
									trim: true,
									nonEmpty: true,
									required: true
								},
								year: {
									type: "integer"
								},
								genre: {
									type: "string",
									case: "title",
									trim: true,
									nonEmpty: true,
									default: "Unknown"
								}
							}
						}
					},
					codeNames: {
						type: "object",
						order: true,
						format: {
							a: { type: "string", case: "camel" },
							b: { type: "string", case: "constant" },
							c: { type: "string", case: "dot" },
							d: { type: "string", case: "header" },
							e: { type: "string", case: "lower" },
							f: { type: "string", case: "lowerFirst" },
							g: { type: "string", case: "no" },
							h: { type: "string", case: "param" },
							i: { type: "string", case: "pascal" },
							j: { type: "string", case: "path" },
							k: { type: "string", case: "sentence" },
							l: { type: "string", case: "snake" },
							m: { type: "string", case: "swap" },
							n: { type: "string", case: "title" },
							o: { type: "string", case: "upper" },
							p: { type: "string", case: "upperFirst" },
							q: {
								type: "object",
								autopopulate: true,
								format: {
									dr: {
										type: "string",
										default: "Tran"
									},
									phd: {
										type: "string",
										default: "ass kicking"
									}
								}
							}
						}
					},
					extra: {
						type: "object",
						default: {
							dank: "memes"
						},
						autopopulate: true,
						nonEmpty: true,
						format: {
							ayy: {
								type: "string",
								required: true,
								nonEmpty: true,
								default: "lmao"
							}
						}
					},
					garbage: {
						type: "array",
						format: {
							type: "object"
						}
					},
					trash: {
						type: "array"
					}
				}
			};

			var result = {
				firstName: "Kevin",
				age: 30,
				birthday: new Date("June 18, 1987"),
				height: 1.83,
				password: "*********",
				verify: /[a-z]+42/i,
				isAlive: true,
				error: errorFunc,
				exception: null,
				movies: [
					"Alien 3",
					"The Boondock Saints",
					"Fight Club",
				],
				albums: [
					{
						artist: "IN FLAMES",
						album: "Clayman",
						genre: "Melodic Death Metal"
					},
					{
						artist: "PreEmptive Strike 0.1",
						album: "Lethal Defence Systems",
						year: 2006,
						genre: "Aggrotech"
					},
					{
						artist: "God Module",
						album: "Viscera",
						genre: "Unknown"
					},
					{
						artist: "TERRORFAKT",
						album: "Deconstruction",
						year: 2002,
						genre: "Unknown"
					}
				],
				codeNames: {
					a: "dukeNukem",
					b: "JOANNA_DARK",
					c: "serious.sam",
					d: "James-Bond",
					e: "ion maiden",
					f: "cALEB",
					g: "lo wang",
					h: "colonel-bossman",
					i: "IvoRobotnik",
					j: "philadelphia/experiment",
					k: "Frog foot",
					l: "operation_desert_storm",
					m: "Max Damage",
					n: "Victor Charlie",
					o: "RICK SANCHEZ",
					p: "How THE solar SYSTEM was WON",
					q: {
						dr: "Tran",
						phd: "ass kicking"
					}
				},
				garbage: [
					{ },
					{ saint: "pepsi" },
					testDate,
					testRegExp,
					[[]],
					[[[7331]]],
					new Boolean(false),
					new Boolean(true),
					{ },
					[],
					{ "enjoy": "yourself" }
				],
				trash: [],
				extra: {
					dank: "memes",
					ayy: "lmao"
				}
			};

			var options = {
				throwErrors: true,
				verbose: true
			}

			expect(utilities.formatValue(value, format, options)).to.deep.equal(result);
		});
	});

	describe("formatObject", function() {
		it("should be a function", function() {
			expect(utilities.formatObject).to.be.a("function");
		});
	});

	describe("formatStringList", function() {
		var newTestData = testData.concat(",", ";", "board,", ",room", "same;", ";tie", " ;\te ,\tx ;\te ,\t \t");
		newTestData.push(["SURPRISE", "KETCHUP"]);
		newTestData.push([2, "pigeons", ".", "exe"]);
		newTestData.push(["", " ", "\t"]);
		newTestData.push(["cant", { make: "it" }]);

		it("should be a function", function() {
			expect(utilities.formatStringList).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, "", "test", "trim", null, null, "", "", null, null, null, "", "", "board", "room", "same", "tie", "e, x, e", "SURPRISE, KETCHUP", "pigeons, ., exe", "", "cant"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.formatStringList(newTestData[i])).to.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value with stringify set to false", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, "", "test", "trim", null, null, "", "0", null, null, null, "", "", "board", "room", "same", "tie", "e, x, e", "SURPRISE, KETCHUP", "2, pigeons, ., exe", "", "cant, [object Object]"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.formatStringList(newTestData[i], false)).to.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value with stringify set to true", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, "", "test", "trim", null, null, "", "0", null, null, null, "", "", "board", "room", "same", "tie", "e, x, e", "SURPRISE, KETCHUP", "2, pigeons, ., exe", "", "cant, {\"make\":\"it\"}"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.formatStringList(newTestData[i], true)).to.equal(results[i]);
			}
		});
	});

	describe("leftShift", function() {
		var newTestData = testData.concat(-8, -1, -0.33, 0.64, 4, 88, 0xFFFFFFFF);

		it("should be a function", function() {
			expect(utilities.leftShift).to.be.a("function");
		});

		it("should produce the correct result for each pair of test values", function() {
			var results = [
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, 0, 0, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, 0, 0, NaN, NaN, 0, 0, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, 1, 2, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, 0.00390625, 0.5, NaN, NaN, 16, 309485009821345068724781056, Infinity],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, -8, -16, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, -0.03125, -4, NaN, NaN, -128, -2475880078570760549798248448, -Infinity],
				[NaN, NaN, NaN, NaN, NaN, NaN, -1, -2, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, -0.00390625, -0.5, NaN, NaN, -16, -309485009821345068724781056, -Infinity],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, 4, 8, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, 0.015625, 2, NaN, NaN, 64, 1237940039285380274899124224, Infinity],
				[NaN, NaN, NaN, NaN, NaN, NaN, 88, 176, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, 0.34375, 44, NaN, NaN, 1408, 27234680864278366047780732928, Infinity],
				[NaN, NaN, NaN, NaN, NaN, NaN, 4294967295, 8589934590, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, 16777215.99609375, 2147483647.5, NaN, NaN, 68719476720, 1329227995475430863082461991555563520, Infinity],
			];

			for(var i = 0; i < newTestData.length; i++) {
				for(var j = 0; j < newTestData.length; j++) {
					if(isNaN(results[i][j])) {
						expect(isNaN(utilities.leftShift(newTestData[i], newTestData[j]))).to.equal(true);
					}
					else {
						expect(utilities.leftShift(newTestData[i], newTestData[j])).to.equal(results[i][j]);
					}
				}
			}
		});
	});

	describe("rightShift", function() {
		var newTestData = testData.concat(-8, -1, -0.33, 0.64, 4, 88, 0xFFFFFFFF);

		it("should be a function", function() {
			expect(utilities.rightShift).to.be.a("function");
		});

		it("should produce the correct result for each pair of test values", function() {
			var TODO = "TODO";

			var results = [
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, 0, 0, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, 0, 0, NaN, NaN, 0, 0, 0],
				[NaN, NaN, NaN, NaN, NaN, NaN, 1, 0.5, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, 256, 2, NaN, NaN, 0.0625, 3.2311742677852643549664402033983e-27, 0],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, -8, -4, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, -2048, -16, NaN, NaN, -0.5, -2.5849394142282114839731521627186e-26, 0],
				[NaN, NaN, NaN, NaN, NaN, NaN, -1, -0.5, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, -256, -2, NaN, NaN, -0.0625, -3.2311742677852643549664402033983e-27, 0],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
				[NaN, NaN, NaN, NaN, NaN, NaN, 4, 2, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, 1024, 8, NaN, NaN, 0.25, 1.2924697071141057419865760813593e-26, 0],
				[NaN, NaN, NaN, NaN, NaN, NaN, 88, 44, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, 22528, 176, NaN, NaN, 5.5, 2.8434333556510326323704673789905e-25, 0],
				[NaN, NaN, NaN, NaN, NaN, NaN, 4294967295, 2147483647.5, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, 1099511627520, 8589934590, NaN, NaN, 268435455.9375, 1.3877787804583282487510131496169e-17, 0],
			];

			for(var i = 0; i < newTestData.length; i++) {
				for(var j = 0; j < newTestData.length; j++) {
					console.log("rightShift<" + i + "," + j + ">(" + newTestData[i] + ", " + newTestData[j] + "): " + utilities.toString(utilities.rightShift(newTestData[i], newTestData[j])) + " [Expect: " + utilities.toString(results[i][j]) + "]");

					if(isNaN(results[i][j])) {
						expect(isNaN(utilities.rightShift(newTestData[i], newTestData[j]))).to.equal(true);
					}
					else {
						expect(utilities.rightShift(newTestData[i], newTestData[j])).to.equal(results[i][j]);
					}
				}
			}
		});
	});

	describe("trimString", function() {
		var newTestData = testData.concat("   \t broden  kelly\t    \t");

		it("should be a function", function() {
			expect(utilities.trimString).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, "", "test", "trim", null, null, null, null, null, null, null, "broden  kelly"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.trimString(newTestData[i])).to.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value with a custom default", function() {
			var results = ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "", "test", "trim", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "broden  kelly"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.trimString(newTestData[i], "empty")).to.equal(results[i]);
			}
		});
	});

	describe("trimNullTerminatedString", function() {
		var newTestData = testData.concat("   \t broden  kelly\t    \t", "\0", "MODMGR.EXE\0", "\0DUKESTAR.MAP", "2009.MAP\0\0\0\0", "EI.GRP\0EI.CON", "1999.GRP\0 1999.CON\0");

		it("should be a function", function() {
			expect(utilities.trimNullTerminatedString).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, "", "test", " trim\t", null, null, null, null, null, null, null, "   \t broden  kelly\t    \t", "", "MODMGR.EXE", "", "2009.MAP", "EI.GRP", "1999.GRP"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.trimNullTerminatedString(newTestData[i])).to.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value with a custom default", function() {
			var results = ["nil", "nil", "nil", "nil", "nil", "nil", "nil", "nil", "nil", "nil", "nil", "nil", "", "test", " trim\t", "nil", "nil", "nil", "nil", "nil", "nil", "nil", "   \t broden  kelly\t    \t", "", "MODMGR.EXE", "", "2009.MAP", "EI.GRP", "1999.GRP"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.trimNullTerminatedString(newTestData[i], "nil")).to.equal(results[i]);
			}
		});
	});

	describe("trimWhitespace", function() {
		var newTestData = testData.concat(" white space \t", "new\r\nlines\t\n");

		it("should be a function", function() {
			expect(utilities.trimWhitespace).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, "", "test", "trim", null, null, null, null, null, null, null, "white space", "new\r\nlines\n"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.trimWhitespace(newTestData[i])).to.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value with trim new lines set to true", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, "", "test", "trim", null, null, null, null, null, null, null, "white space", "newlines"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.trimWhitespace(newTestData[i], true)).to.equal(results[i]);
			}
		});
	});

	describe("trimTrailingNewlines", function() {
		var newTestData = testData.concat("new\r\nlines\t\n", "windows\r\n", "mac \r");

		it("should be a function", function() {
			expect(utilities.trimTrailingNewlines).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, "", "test", " trim", null, null, null, null, null, null, null, "new\r\nlines", "windows", "mac"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.trimTrailingNewlines(newTestData[i])).to.equal(results[i]);
			}
		});
	});

	describe("replaceNonBreakingSpaces", function() {
		var newTestData = testData.concat("&nbsp;", "a&nbsp;paragraph &nbsp; or \tsomething&nbsp");

		it("should be a function", function() {
			expect(utilities.replaceNonBreakingSpaces).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, "", "test", " trim\t", null, null, null, null, null, null, null, " ", "a paragraph   or \tsomething&nbsp"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.replaceNonBreakingSpaces(newTestData[i])).to.equal(results[i]);
			}
		});
	});

	describe("indentText", function() {
		var newTestData = testData.concat("lol \n\t", "door\r\n\tstuck ", "\tcant\rmake\nit\t");

		it("should be a function", function() {
			expect(utilities.indentText).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, "", "\ttest", "\t trim\t", null, null, null, null, null, null, null, "\tlol \n", "\tdoor\n\t\tstuck ", "\t\tcant\n\tmake\n\tit\t"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.indentText(newTestData[i])).to.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value with custom amount", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, "", "\t\t\ttest", "\t\t\t trim\t", null, null, null, null, null, null, null, "\t\t\tlol \n", "\t\t\tdoor\n\t\t\t\tstuck ", "\t\t\t\tcant\n\t\t\tmake\n\t\t\tit\t"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.indentText(newTestData[i], 3)).to.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value with no amount", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, "", "test", " trim\t", null, null, null, null, null, null, null, "lol \n", "door\n\tstuck ", "\tcant\nmake\nit\t"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.indentText(newTestData[i], 0)).to.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value with invalid amount", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, "", "\ttest", "\t trim\t", null, null, null, null, null, null, null, "\tlol \n", "\tdoor\n\t\tstuck ", "\t\tcant\n\tmake\n\tit\t"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.indentText(newTestData[i], null)).to.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value with negative amount", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, "", "test", " trim\t", null, null, null, null, null, null, null, "lol \n", "door\n\tstuck ", "\tcant\nmake\nit\t"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.indentText(newTestData[i], -420)).to.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value with custom amount and indentation", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, "", "?!?!test", "?!?! trim\t", null, null, null, null, null, null, null, "?!?!lol \n", "?!?!door\n?!?!\tstuck ", "?!?!\tcant\n?!?!make\n?!?!it\t"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.indentText(newTestData[i], 2, "?!")).to.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value with custom amount and space indentation", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, "", "    test", "     trim\t", null, null, null, null, null, null, null, "    lol \n", "    door\n    \tstuck ", "    \tcant\n    make\n    it\t"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.indentText(newTestData[i], 4, " ")).to.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value with custom amount and empty indentation", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, "", "test", " trim\t", null, null, null, null, null, null, null, "lol \n", "door\n\tstuck ", "\tcant\nmake\nit\t"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.indentText(newTestData[i], 69, "")).to.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value with custom amount and invalid indentation", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, "", "\t\t\t\t\ttest", "\t\t\t\t\t trim\t", null, null, null, null, null, null, null, "\t\t\t\t\tlol \n", "\t\t\t\t\tdoor\n\t\t\t\t\t\tstuck ", "\t\t\t\t\t\tcant\n\t\t\t\t\tmake\n\t\t\t\t\tit\t"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.indentText(newTestData[i], 5, null)).to.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value with invalid amount and indentation", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, "", "\ttest", "\t trim\t", null, null, null, null, null, null, null, "\tlol \n", "\tdoor\n\t\tstuck ", "\t\tcant\n\tmake\n\tit\t"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.indentText(newTestData[i], null, null)).to.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value with custom amount and indentation and clear empty lines set to false", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, "( . Y . )", "( . Y . )test", "( . Y . ) trim\t", null, null, null, null, null, null, null, "( . Y . )lol \n( . Y . )\t", "( . Y . )door\n( . Y . )\tstuck ", "( . Y . )\tcant\n( . Y . )make\n( . Y . )it\t"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.indentText(newTestData[i], 1, "( . Y . )", false)).to.equal(results[i]);
			}
		});
	});

	describe("trimLeadingZeroes", function() {
		var newTestData = testData.concat(" ", "\t", "0", "00", "000", "420", "007", "00000010L");

		it("should be a function", function() {
			expect(utilities.trimLeadingZeroes).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, "", "test", "trim", null, null, null, null, null, null, null, "", "", "0", "0", "0", "420", "7", "10L"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.trimLeadingZeroes(newTestData[i])).to.equal(results[i]);
			}
		});
	});

	describe("addLeadingZeroes", function() {
		var newTestData = testData.concat(" ", "\t", "0", "007", "Corporate Spy");

		it("should be a function", function() {
			expect(utilities.addLeadingZeroes).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [null, null, "false", "true", "false", "true", "0", "1", "3.141592654", "NaN", "Infinity", "-Infinity", "", "test", " trim\t", "[object Object]", "[object Object]", "", "0", testDate.toString(), emptyFunctionString, "/.+/", " ", "\t", "0", "007", "Corporate Spy"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.addLeadingZeroes(newTestData[i])).to.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value with an expected length of 5", function() {
			var results = [null, null, "false", "0true", "false", "0true", "00000", "00001", "3.141592654", "00NaN", "Infinity", "-Infinity", "00000", "0test", " trim\t", "[object Object]", "[object Object]", "00000", "00000", testDate.toString(), emptyFunctionString, "0/.+/", "0000 ", "0000\t", "00000", "00007", "Corporate Spy"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.addLeadingZeroes(newTestData[i], 5)).to.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value with an expected length of 20", function() {
			var functionStringPadded = emptyFunctionString;

			for(var i = emptyFunctionString.length; i < 20; i++) {
				functionStringPadded = "0" + functionStringPadded;
			}

			var results = [null, null, "000000000000000false", "0000000000000000true", "000000000000000false", "0000000000000000true", "00000000000000000000", "00000000000000000001", "0000000003.141592654", "00000000000000000NaN", "000000000000Infinity", "00000000000-Infinity", "00000000000000000000", "0000000000000000test", "00000000000000 trim\t", "00000[object Object]", "00000[object Object]", "00000000000000000000", "00000000000000000000", testDate.toString(), functionStringPadded, "0000000000000000/.+/", "0000000000000000000 ", "0000000000000000000\t", "00000000000000000000", "00000000000000000007", "0000000Corporate Spy"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.addLeadingZeroes(newTestData[i], 20)).to.equal(results[i]);
			}
		});
	});

	describe("toString", function() {
		function func() { console.log("All this talk of tea is getting me thirsty, shall I pop the kettle on?"); };

		var newTestData = testData.concat(new Error("There are tales of pots."), utilities.createError("A watched pot never boils.", 69), func, /delicious.*muggachini/gmi);

		it("should be a function", function() {
			expect(utilities.toString).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = ["undefined", "null", "false", "true", "false", "true", "0", "1", "3.141592654", "NaN", "Infinity", "-Infinity", "", "test", " trim\t", "{}", "{\"nice\":\"meme\"}", "[]", "[0]", testDate.toString(), emptyFunctionString, "/.+/", "{\"message\":\"There are tales of pots.\"}", "{\"message\":\"A watched pot never boils.\",\"status\":69}", func.toString(), "/delicious.*muggachini/gmi"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.toString(newTestData[i])).to.equal(results[i]);
			}
		});
	});

	describe("compareDates", function() {
		var newTestData = testData.concat("June 5, 2012", "June 18, 1987 3:30 PM", "2018-02-19T06:19:33Z", testDate.getTime(), testDate.toString(), testDate.getTime().toString());

		it("should be a function", function() {
			expect(utilities.compareDates).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [
				[0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, -1, -1, -1, -1, -1, -1],
				[0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, -1, -1, -1, -1, -1, -1],
				[0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, -1, -1, -1, -1, -1, -1],
				[0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, -1, -1, -1, -1, -1, -1],
				[0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, -1, -1, -1, -1, -1, -1],
				[0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, -1, -1, -1, -1, -1, -1],
				[1, 1, 1, 1, 1, 1, 0, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 - testDate.getTime(), 1, 1, 0 - new Date(newTestData[22]).getTime(), 0 - new Date(newTestData[23]).getTime(), 0 - new Date(newTestData[24]).getTime(), 0 - testDate.getTime(), 0 - new Date(testDate.toString()).getTime(), 0 - testDate.getTime()],
				[1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 - testDate.getTime(), 1, 1, 1 - new Date(newTestData[22]).getTime(), 1 - new Date(newTestData[23]).getTime(), 1 - new Date(newTestData[24]).getTime(), 1 - testDate.getTime(), 1 - new Date(testDate.toString()).getTime(), 1 - testDate.getTime()],
				[0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, -1, -1, -1, -1, -1, -1],
				[0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, -1, -1, -1, -1, -1, -1],
				[0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, -1, -1, -1, -1, -1, -1],
				[0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, -1, -1, -1, -1, -1, -1],
				[0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, -1, -1, -1, -1, -1, -1],
				[0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, -1, -1, -1, -1, -1, -1],
				[0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, -1, -1, -1, -1, -1, -1],
				[0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, -1, -1, -1, -1, -1, -1],
				[0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, -1, -1, -1, -1, -1, -1],
				[0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, -1, -1, -1, -1, -1, -1],
				[0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, -1, -1, -1, -1, -1, -1],
				[1, 1, 1, 1, 1, 1, testDate.getTime(), testDate.getTime() - 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, testDate.getTime() - new Date(newTestData[22]).getTime(), testDate.getTime() - new Date(newTestData[23]).getTime(), testDate.getTime() - new Date(newTestData[24]).getTime(), 0, testDate.getTime() - new Date(testDate.toString()).getTime(), 0],
				[0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, -1, -1, -1, -1, -1, -1],
				[0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, -1, -1, -1, -1, -1, -1],
				[1, 1, 1, 1, 1, 1, new Date(newTestData[22]).getTime(), new Date(newTestData[22]).getTime() - 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, new Date(newTestData[22]).getTime() - testDate.getTime(), 1, 1, 0, new Date(newTestData[22]).getTime() - new Date(newTestData[23]).getTime(), new Date(newTestData[22]).getTime() - new Date(newTestData[24]).getTime(), new Date(newTestData[22]).getTime() - testDate.getTime(), new Date(newTestData[22]).getTime() - new Date(testDate.toString()).getTime(), new Date(newTestData[22]).getTime() - testDate.getTime()],
				[1, 1, 1, 1, 1, 1, new Date(newTestData[23]).getTime(), new Date(newTestData[23]).getTime() - 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, new Date(newTestData[23]).getTime() - testDate.getTime(), 1, 1, new Date(newTestData[23]).getTime() - new Date(newTestData[22]).getTime(), 0, new Date(newTestData[23]).getTime() - new Date(newTestData[24]).getTime(), new Date(newTestData[23]).getTime() - testDate.getTime(), new Date(newTestData[23]).getTime() - new Date(testDate.toString()).getTime(), new Date(newTestData[23]).getTime() - testDate.getTime()],
				[1, 1, 1, 1, 1, 1, new Date(newTestData[24]).getTime(), new Date(newTestData[24]).getTime() - 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, new Date(newTestData[24]).getTime() - testDate.getTime(), 1, 1, new Date(newTestData[24]).getTime() - new Date(newTestData[22]).getTime(), new Date(newTestData[24]).getTime() - new Date(newTestData[23]).getTime(), 0, new Date(newTestData[24]).getTime() - testDate.getTime(), new Date(newTestData[24]).getTime() - new Date(testDate.toString()).getTime(), new Date(newTestData[24]).getTime() - testDate.getTime()],
				[1, 1, 1, 1, 1, 1, testDate.getTime(), testDate.getTime() - 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, testDate.getTime() - new Date(newTestData[22]).getTime(), testDate.getTime() - new Date(newTestData[23]).getTime(), testDate.getTime() - new Date(newTestData[24]).getTime(), 0, testDate.getTime() - new Date(testDate.toString()).getTime(), 0],
				[1, 1, 1, 1, 1, 1, new Date(testDate.toString()).getTime(), new Date(testDate.toString()).getTime() - 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, new Date(testDate.toString()).getTime() - testDate.getTime(), 1, 1, new Date(testDate.toString()).getTime() - new Date(newTestData[22]).getTime(), new Date(testDate.toString()).getTime() - new Date(newTestData[23]).getTime(), new Date(testDate.toString()).getTime() - new Date(newTestData[24]).getTime(), new Date(testDate.toString()).getTime() - testDate.getTime(), 0, new Date(testDate.toString()).getTime() - testDate.getTime()],
				[1, 1, 1, 1, 1, 1, testDate.getTime(), testDate.getTime() - 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, testDate.getTime() - new Date(newTestData[22]).getTime(), testDate.getTime() - new Date(newTestData[23]).getTime(), testDate.getTime() - new Date(newTestData[24]).getTime(), 0, testDate.getTime() - new Date(testDate.toString()).getTime(), 0],
			];

			for(var i = 0; i < newTestData.length; i++) {
				for(var j = 0; j < newTestData.length; j++) {
					expect(utilities.compareDates(newTestData[i], newTestData[j])).to.equal(results[i][j]);
				}
			}
		});
	});

	describe("compareCasePercentage", function() {
		var newTestData = testData.concat("X", "y", "Ab", "cD", "if it's out there, i'll find it.", "NEED SOMETHING DESTROYED?", "xX_YoLo_420_SwAg_MaSt3r_Xx");

		it("should be a function", function() {
			expect(utilities.compareCasePercentage).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -4, -4, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, -22, 22, -1];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.compareCasePercentage(newTestData[i])).to.equal(results[i]);
			}
		});
	});

	describe("reverseString", function() {
		var newTestData = testData.concat("Take it back a little.", "XotoX");

		it("should be a function", function() {
			expect(utilities.reverseString).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, "", "tset", "\tmirt ", null, null, null, null, null, null, null, ".elttil a kcab ti ekaT", "XotoX"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.reverseString(newTestData[i])).to.equal(results[i]);
			}
		});

		it("should properly handle values with unicode and special characters", function() {
			var newTestData = [
				"mañana mañana",
				"ma\xF1ana",
				"foo\u0303\u035C\u035D\u035Ebar",
				"foo\uD834\uDF06bar",
				"foo\uD834\uDF06\u0303bar",
				"foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar",
				"H\u0339\u0319\u0326\u032E\u0349\u0329\u0317\u0317\u0367\u0307\u030F\u030A\u033EE\u0368\u0346\u0352\u0306\u036E\u0303\u034F\u0337\u032E\u0323\u032B\u0324\u0323 \u0335\u031E\u0339\u033B\u0300\u0309\u0313\u036C\u0351\u0361\u0345C\u036F\u0302\u0350\u034F\u0328\u031B\u0354\u0326\u031F\u0348\u033BO\u031C\u034E\u034D\u0359\u035A\u032C\u031D\u0323\u033D\u036E\u0350\u0357\u0300\u0364\u030D\u0300\u0362M\u0334\u0321\u0332\u032D\u034D\u0347\u033C\u031F\u032F\u0326\u0309\u0312\u0360\u1E1A\u031B\u0319\u031E\u032A\u0317\u0365\u0364\u0369\u033E\u0351\u0314\u0350\u0345\u1E6E\u0334\u0337\u0337\u0317\u033C\u034D\u033F\u033F\u0313\u033D\u0350H\u0319\u0319\u0314\u0304\u035C",
				"Ich weiß nicht.",
				"добрыя модульныя",
				"τα ωραία δοκιμές"
			];

			var newResults = [
				"anañam anañam",
				"ana\xF1am",
				"rabo\u0303\u035C\u035D\u035Eof",
				"rab\uD834\uDF06oof",
				"rab\uD834\uDF06\u0303oof",
				"rab\uD834\uDF06\u0303\u035C\u035D\u035Eoof",
				"H\u0319\u0319\u0314\u0304\u035C\u1E6E\u0334\u0337\u0337\u0317\u033C\u034D\u033F\u033F\u0313\u033D\u0350\u1E1A\u031B\u0319\u031E\u032A\u0317\u0365\u0364\u0369\u033E\u0351\u0314\u0350\u0345M\u0334\u0321\u0332\u032D\u034D\u0347\u033C\u031F\u032F\u0326\u0309\u0312\u0360O\u031C\u034E\u034D\u0359\u035A\u032C\u031D\u0323\u033D\u036E\u0350\u0357\u0300\u0364\u030D\u0300\u0362C\u036F\u0302\u0350\u034F\u0328\u031B\u0354\u0326\u031F\u0348\u033B \u0335\u031E\u0339\u033B\u0300\u0309\u0313\u036C\u0351\u0361\u0345E\u0368\u0346\u0352\u0306\u036E\u0303\u034F\u0337\u032E\u0323\u032B\u0324\u0323H\u0339\u0319\u0326\u032E\u0349\u0329\u0317\u0317\u0367\u0307\u030F\u030A\u033E",
				".thcin ßiew hcI",
				"яыньлудом яырбод",
				"ςέμικοδ αίαρω ατ"
			];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.reverseString(newTestData[i])).to.equal(newResults[i]);
			}
		});
	});

	describe("createError", function() {
		it("should be a function", function() {
			expect(utilities.createError).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var error = null;

			for(var i = 0; i < testData.length; i++) {
				error = utilities.createError(testData[i]);

				expect(utilities.isError(error)).to.equal(true);

				if(testData[i] === undefined) {
					expect(error.message).to.equal("");
				}
				else if(testData[i] === null) {
					expect(error.message).to.equal("null");
				}
				else {
					expect(error.message).to.equal(testData[i].toString());
				}

				expect(error.status).to.equal(500);
			}
		});

		it("should produce the correct result for each test value and custom status code", function() {
			var error = null;
			var testStatusCodes = [-420, -1, 0, 1, 201, 422, 500, 9000, 3.50, NaN, -Infinity, Infinity];

			for(var i = 0; i < testData.length; i++) {
				for(var j = 0; j < testStatusCodes.length; j++) {
					error = utilities.createError(testData[i], testStatusCodes[j]);

					expect(utilities.isError(error)).to.equal(true);

					if(testData[i] === undefined) {
						expect(error.message).to.equal("");
					}
					else if(testData[i] === null) {
						expect(error.message).to.equal("null");
					}
					else {
						expect(error.message).to.equal(testData[i].toString());
					}

					expect(error.status).to.equal(utilities.isValidNumber(testStatusCodes[j]) ? parseInt(testStatusCodes[j]) : 500);
				}
			}
		});
	});

	describe("clone", function() {
		it("should be a function", function() {
			expect(utilities.clone).to.be.a("function");
		});

		it("should result in primitive types being equal", function() {
			var clone = null;

			for(var i = 0; i < testData.length; i++) {
				if(!utilities.isObject(testData[i])) {
					clone = utilities.clone(testData[i]);

					if(typeof testData[i] === "number" && testData[i] !== Infinity && testData[i] !== -Infinity && isNaN(testData[i])) {
						expect(isNaN(clone)).to.equal(true);
					}
					else {
						expect(testData[i]).to.equal(clone);
					}
				}
			}
		});

		it("should result in non-primitive types not being equal", function() {
			var clone = null;

			for(var i = 0; i < testData.length; i++) {
				if(utilities.isObject(testData[i])) {
					clone = utilities.clone(testData[i]);

					expect(testData[i]).to.not.equal(clone);
				}
			}
		});

		it("should produce values that are equal by stringified comparison", function() {
			var clone = null;

			for(var i = 0; i < testData.length; i++) {
				clone = utilities.clone(testData[i]);

				expect(testData[i]).to.deep.equal(clone);
			}
		});

		it("should retain object classes for cloned values", function() {
			expect(utilities.clone(new Boolean()) instanceof Boolean).to.equal(true);
			expect(utilities.clone(new Date()) instanceof Date).to.equal(true);
			expect(utilities.clone([]) instanceof Array).to.equal(true);
			expect(utilities.clone(new Array()) instanceof Array).to.equal(true);
			expect(utilities.clone(new Set()) instanceof Set).to.equal(true);
			expect(utilities.clone(new Map()) instanceof Map).to.equal(true);
			expect(utilities.clone(/./) instanceof RegExp).to.equal(true);
			expect(utilities.clone(new RegExp()) instanceof RegExp).to.equal(true);
			expect(utilities.clone(new Error()) instanceof Error).to.equal(true);
			expect(utilities.clone({ }) instanceof Object).to.equal(true);
			expect(utilities.clone(new Object()) instanceof Object).to.equal(true);
		});

		it("should successfully clone array values", function() {
			var arrayValues = [];
			arrayValues.push([]);
			arrayValues.push([0]);
			arrayValues.push([42, "reasons", ["for"], { ur: "mum" }, false]);
			arrayValues.push([[[1337]]]);

			var clone = null;

			for(var i = 0; i < arrayValues.length; i++) {
				clone = utilities.clone(arrayValues[i]);

				expect(clone instanceof Array).to.equal(true);
				expect(clone).to.deep.equal(arrayValues[i]);
			}
		});

		it("should successfully clone a complex object", function() {
			var subObject = {
				nice: "meme"
			};

			var object = [
				null,
				"2pigons.exe",
				function() {
					return 420;
				},
				{
					door: "stuck",
					stuff: subObject
				},
				[6, 9]
			];

			var clone = utilities.clone(object);

			expect(object).to.not.equal(clone);
			expect(object).to.deep.equal(clone);

			for(var index in object) {
				if(utilities.isObject(object[index])) {
					expect(object[index]).to.not.equal(clone[index]);
				}
				else {
					expect(object[index]).to.equal(clone[index]);
				}
			}
		});

		it("should successfully clone a complex regular expression", function() {
			var regExpFlagSupported = {
				sticky: true,
				unicode: true
			};

			try {
				new RegExp("", "y");
			}
			catch(error) {
				regExpFlagSupported.sticky = false;
			}

			try {
				new RegExp("", "u");
			}
			catch(error) {
				regExpFlagSupported.unicode = false;
			}

			var regExp = new RegExp("([A-Za-z]*)([0-9]+)", "gmi" + (regExpFlagSupported.sticky ? "y" : "") + (regExpFlagSupported.unicode ? "u" : ""));
			var clone = utilities.clone(regExp);

			expect(regExp).to.not.equal(clone);
			expect(regExp).to.deep.equal(clone);

			for(var attribute in ["source", "global", "multiline", "ignoreCase", "sticky", "unicode"]) {
				expect(regExp[attribute]).to.equal(clone[attribute]);
			}
		});

		it("should successfully clone a complex error", function() {
			var error = utilities.createError("Pickle surprise!", 420);
			var clone = utilities.clone(error);

			expect(error).to.not.equal(clone);
			expect(utilities.toString(error)).to.equal(utilities.toString(clone));

			for(var attribute in error) {
				expect(error[attribute]).to.equal(clone[attribute]);
			}

			for(var attribute in ["fileName", "lineNumber", "columnNumber", "stack"]) {
				expect(error[attribute]).to.equal(clone[attribute]);
			}
		});

		it("should successfully clone a buffer", function() {
			var buffer = null;
			var message = "I'm making a note here: HUGE SUCCESS!";

			if(Buffer.from instanceof Function) {
				buffer = Buffer.from(message)
			}
			else {
				buffer = new Buffer(message);
			}

			var clone = utilities.clone(buffer);

			expect(buffer).to.not.equal(clone);
			expect(buffer.toString()).to.equal(clone.toString());
		});

		it("should successfully clone an object with an undefined attribute value", function() {
			var object = { undefined: undefined };
			var clone = utilities.clone(object);

			expect(object).to.not.equal(clone);
			expect(object).to.deep.equal(clone);
		});
	});

	describe("merge", function() {
		var newTestData = testData.concat(
			{
				new: {
					phone: {
						who: "dis"
					}
				},
				ketchup: ["slip", "slap", "slop"]
			},
			{
				nice: "hat",
				spooky: {
					ghost: true,
					man: "sleepin' in yo bed",
					yeah: "yeah yeah!",
					radar: {
						jammed: true,
						type: "strawberry"
					}
				},
				ketchup: ["muckin'", "around"]
			},
			{
				new: 69,
				nice: "pants",
				spooky: {
					ghost: false,
					man: false,
					radar: {
						jammed: false,
						type: null,
						bleeps: true,
						creeps: true,
						sweeps: true
					}
				},
				dank: 420
			}
		);

		newTestData.push([6, 9]);
		newTestData.push(["ayy", "lmao"]);

		it("should be a function", function() {
			expect(utilities.merge).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.merge(newTestData[i])).to.deep.equal(utilities.merge(newTestData[i]));
				expect(utilities.merge(newTestData[i], true)).to.deep.equal(utilities.merge(newTestData[i]));
				expect(utilities.merge(newTestData[i], false)).to.deep.equal(utilities.merge(newTestData[i]));
				expect(utilities.merge(newTestData[i], true, true)).to.deep.equal(utilities.merge(newTestData[i]));
				expect(utilities.merge(newTestData[i], true, false)).to.deep.equal(utilities.merge(newTestData[i]));
			}
		});

		it("should produce the correct result for each test value pair with copy and deep merge enabled", function() {
			var results = [
				null, null, null, null, new Boolean(false), new Boolean(true), null, null, null, null, null, null, null, null, null,
				[
					{ }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { nice: "meme" }, { }, { }, { }, { }, { },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ }, { }
				],
				[
					{ nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" },
					{ nice: "meme", new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "pants", new: 69, spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ nice: "meme" }, { nice: "meme" }
				],
				null, null, testDate, null, new RegExp(".+"),
				[
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"], nice: "meme" },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["muckin'", "around"], nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } } },
					{ new: 69, ketchup: ["slip", "slap", "slop"], nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] }
				],
				[
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "meme", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["slip", "slap", "slop"], new: { phone: { who: "dis" } } },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "pants", spooky: { ghost: false, man: false, yeah: "yeah yeah!", radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, ketchup: ["muckin'", "around"], new: 69, dank: 420 },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] }
				],
				[
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "meme", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: { phone: { who: "dis" } }, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420, ketchup: ["slip", "slap", "slop"] },
					{ new: 69, nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed",  radar: { jammed: true, type: "strawberry", bleeps: true, creeps: true, sweeps: true }, yeah: "yeah yeah!", }, dank: 420, ketchup: ["muckin'", "around"] },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
				],
				null, null
			];

			for(var i = 0; i < newTestData.length; i++) {
				for(var j = 0; j < newTestData.length; j++) {
					if(Array.isArray(results[i])) {
						expect(utilities.merge(newTestData[i], newTestData[j])).to.deep.equal(results[i][j]);
						expect(utilities.merge(newTestData[i], newTestData[j], true)).to.deep.equal(results[i][j]);
						expect(utilities.merge(newTestData[i], newTestData[j], true, true)).to.deep.equal(results[i][j]);
					}
					else {
						expect(utilities.merge(newTestData[i], newTestData[j])).to.deep.equal(results[i]);
						expect(utilities.merge(newTestData[i], newTestData[j], true)).to.deep.equal(results[i]);
						expect(utilities.merge(newTestData[i], newTestData[j], true, true)).to.deep.equal(results[i]);
					}
				}
			}
		});

		it("should produce the correct result for each test value pair with copy enabled and deep merge disabled", function() {
			var results = [
				null, null, null, null, new Boolean(false), new Boolean(true), null, null, null, null, null, null, null, null, null,
				[
					{ }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { nice: "meme" }, { }, { }, { }, { }, { },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ }, { }
				],
				[
					{ nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" }, { nice: "meme" },
					{ nice: "meme", new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "pants", new: 69, spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ nice: "meme" }, { nice: "meme" }
				],
				null, null, testDate, null, new RegExp(".+"),
				[
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"], nice: "meme" },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["muckin'", "around"], nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } } },
					{ new: 69, ketchup: ["slip", "slap", "slop"], nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
					{ new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] }
				],
				[
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "meme", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["slip", "slap", "slop"], new: { phone: { who: "dis" } } },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, ketchup: ["muckin'", "around"], new: 69, dank: 420 },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] },
					{ nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } }, ketchup: ["muckin'", "around"] }
				],
				[
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "meme", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: { phone: { who: "dis" } }, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420, ketchup: ["slip", "slap", "slop"] },
					{ new: 69, nice: "hat", spooky: { ghost: true, man: "sleepin' in yo bed",  radar: { jammed: true, type: "strawberry" }, yeah: "yeah yeah!", }, dank: 420, ketchup: ["muckin'", "around"] },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
					{ new: 69, nice: "pants", spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
				],
				null, null
			];

			for(var i = 0; i < newTestData.length; i++) {
				for(var j = 0; j < newTestData.length; j++) {
					if(Array.isArray(results[i])) {
						expect(utilities.merge(newTestData[i], newTestData[j], true, false)).to.deep.equal(results[i][j]);
					}
					else {
						expect(utilities.merge(newTestData[i], newTestData[j], true, false)).to.deep.equal(results[i]);
					}
				}
			}
		});

		it("should produce the correct result for each test value pair with copy disabled and deep merge enabled", function() {
			var result = { };

			var results = [
				{ }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { },
				{ nice: "meme" },
				{ nice: "meme" },
				{ nice: "meme" },
				{ nice: "meme" },
				{ nice: "meme" },
				{ nice: "meme" },
				{ nice: "meme", new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
				{ nice: "hat", new: { phone: { who: "dis" } }, ketchup: ["muckin'", "around"], spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } } },
				{ nice: "pants", new: 69, ketchup: ["muckin'", "around"], spooky: { ghost: false, man: false, yeah: "yeah yeah!", radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
				{ nice: "pants", new: 69, ketchup: ["muckin'", "around"], spooky: { ghost: false, man: false, yeah: "yeah yeah!", radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
				{ nice: "pants", new: 69, ketchup: ["muckin'", "around"], spooky: { ghost: false, man: false, yeah: "yeah yeah!", radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 }
			];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.merge(result, newTestData[i], false, true)).to.deep.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value pair with copy and deep merge disabled", function() {
			var result = { };

			var results = [
				{ }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { }, { },
				{ nice: "meme" },
				{ nice: "meme" },
				{ nice: "meme" },
				{ nice: "meme" },
				{ nice: "meme" },
				{ nice: "meme" },
				{ nice: "meme", new: { phone: { who: "dis" } }, ketchup: ["slip", "slap", "slop"] },
				{ nice: "hat", new: { phone: { who: "dis" } }, ketchup: ["muckin'", "around"], spooky: { ghost: true, man: "sleepin' in yo bed", yeah: "yeah yeah!", radar: { jammed: true, type: "strawberry" } } },
				{ nice: "pants", new: 69, ketchup: ["muckin'", "around"], spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
				{ nice: "pants", new: 69, ketchup: ["muckin'", "around"], spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 },
				{ nice: "pants", new: 69, ketchup: ["muckin'", "around"], spooky: { ghost: false, man: false, radar: { jammed: false, type: null, bleeps: true, creeps: true, sweeps: true } }, dank: 420 }
			];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.merge(result, newTestData[i], false, false)).to.deep.equal(results[i]);
			}
		});
	});

	describe("calculateAge", function() {
		var newTestData = testData.concat(
			new Date().setFullYear(new Date().getFullYear() + 1),
			new Date().setFullYear(new Date().getFullYear() - 19)
		);

		it("should be a function", function() {
			expect(utilities.calculateAge).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var start = new Date().getFullYear() - 1970;
			var results = [-1, -1, -1, -1, -1, -1, start, start, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, 19];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.calculateAge(newTestData[i])).to.equal(results[i]);
			}
		});
	});

	describe("getFileName", function() {
		it("should be a function", function() {
			expect(utilities.getFileName).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var newTestData = testData.concat("surprise.ketchup", "/biocratic/zesty_surprise.mp3", "less-gunk/more-funk", "empty/", "also\\", "frank_klepacki\\hell_march.mp3", "\\extra\\fresh");

			var results = [null, null, null, null, null, null, null, null, null, null, null, null, "", "test", "trim", null, null, null, null, null, null, null, "surprise.ketchup", "zesty_surprise.mp3", "more-funk", "", "", "hell_march.mp3", "fresh"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.getFileName(newTestData[i])).to.equal(results[i]);
			}
		});
	});

	describe("getFilePath", function() {
		it("should be a function", function() {
			expect(utilities.getFilePath).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var newTestData = testData.concat("holy.smokes", "/daniel/from.sl", "elektronik/supersonik", "lorn/", "acid-rain\\", "steamed\\hams.avi", "\\bushworld\\adventures");

			var results = [null, null, null, null, null, null, null, null, null, null, null, null, "", "", "", null, null, null, null, null, null, null, "", "/daniel", "elektronik", "lorn", "acid-rain", "steamed", "\\bushworld"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.getFilePath(newTestData[i])).to.equal(results[i]);
			}
		});
	});

	describe("getFileNameNoExtension", function() {
		var newTestData = testData.concat();

		it("should be a function", function() {
			expect(utilities.getFileNameNoExtension).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var newTestData = testData.concat("intergalactic.mosquito", "/lods/of/emon.e", "whats/that/spell", "probly/", "black-salami\\", "wisp\\cresp.chip", "\\here\\comes\\the\\pizza");

			var results = [null, null, null, null, null, null, null, null, null, null, null, null, "", "test", "trim", null, null, null, null, null, null, null, "intergalactic", "emon", "spell", "", "", "cresp", "pizza"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.getFileNameNoExtension(newTestData[i])).to.equal(results[i]);
			}
		});
	});

	describe("getFileExtension", function() {
		var newTestData = testData.concat();

		it("should be a function", function() {
			expect(utilities.getFileExtension).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var newTestData = testData.concat("lex.phantom.hive", "/aunty/donna.au", "beardy/man", "doot/", "clicky-crisp\\", "warm\\it.up", "\\literally\\unplayable\\");

			var results = [null, null, null, null, null, null, null, null, null, null, null, null, "", "", "", null, null, null, null, null, null, null, "hive", "au", "", "", "", "up", ""];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.getFileExtension(newTestData[i])).to.equal(results[i]);
			}
		});
	});

	describe("fileHasExtension", function() {
		var newTestData = testData.concat();

		it("should be a function", function() {
			expect(utilities.fileHasExtension).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var newTestData = testData.concat("pancore-jack.hammer", "/HK/G.11", "mega/drive", "bustin/", "john-cena\\", "deal\\with.it", "\\brave\\new\\rust\\", ".it");

			var extensions = ["", "exe", "hammer", "11", "it"];

			var results = [
				[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true,  false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true,  false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true,  false, true ]
			];

			for(var i = 0; i < extensions.length; i++) {
				for(var j = 0; j < newTestData.length; j++) {
					expect(utilities.fileHasExtension(newTestData[j], extensions[i])).to.equal(results[i][j]);
				}
			}
		});
	});

	describe("reverseFileExtension", function() {
		var newTestData = testData.concat();

		it("should be a function", function() {
			expect(utilities.reverseFileExtension).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var newTestData = testData.concat("lex.phantom.hive", "/aunty/donna.au", "beardy/man", "doot/", "clicky-crisp\\", "warm\\it.up", "\\literally\\unplayable\\");

			var results = [null, null, null, null, null, null, null, null, null, null, null, null, "", "test", "trim", null, null, null, null, null, null, null, "lex.phantom.evih", "/aunty/donna.ua", "beardy/man", "doot/", "clicky-crisp\\", "warm\\it.pu", "\\literally\\unplayable\\"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.reverseFileExtension(newTestData[i])).to.equal(results[i]);
			}
		});
	});

	describe("truncateFileName", function() {
		var newTestData = testData.concat();

		it("should be a function", function() {
			expect(utilities.truncateFileName).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var newTestData = testData.concat("final.space", "/shrivelled/carcasses/of/depress.ion", "hes/in/there", "func_vehicle/", "hardcore-henry\\", "mean\\jerk.time", "\\kraft\\werk\\", "black-salami.mp4");

			var maxLengths = [
				-1,
				0,
				3,
				8,
				12,
				14
			];

			var results = [
				[null, null, null, null, null, null, null, null, null, null, null, null, "", "test", "trim", null, null, null, null, null, null, null, "final.space", "depress.ion", "there", "", "", "jerk.time", "", "black-salami.mp4"],
				[null, null, null, null, null, null, null, null, null, null, null, null, "", "", "", null, null, null, null, null, null, null, "", "", "", "", "", "", "", ""],
				[null, null, null, null, null, null, null, null, null, null, null, null, "", "tes", "tri", null, null, null, null, null, null, null, "fin", "dep", "the", "", "", "jer", "", "bla"],
				[null, null, null, null, null, null, null, null, null, null, null, null, "", "test", "trim", null, null, null, null, null, null, null, "fi.space", "depr.ion", "there", "", "", "jer.time", "", "blac.mp4"],
				[null, null, null, null, null, null, null, null, null, null, null, null, "", "test", "trim", null, null, null, null, null, null, null, "final.space", "depress.ion", "there", "", "", "jerk.time", "", "black-sa.mp4"],
				[null, null, null, null, null, null, null, null, null, null, null, null, "", "test", "trim", null, null, null, null, null, null, null, "final.space", "depress.ion", "there", "", "", "jerk.time", "", "black-sala.mp4"]
			];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.truncateFileName(newTestData[i])).to.equal(results[0][i]);
			}

			for(var i = 0; i < maxLengths.length; i++) {
				for(var j = 0; j < newTestData.length; j++) {
					expect(utilities.truncateFileName(newTestData[j], maxLengths[i])).to.equal(results[i][j]);
				}
			}
		});
	});

	describe("prependSlash", function() {
		var newTestData = testData.concat(
			" ",
			"\t",
			"/ ",
			" /",
			" / ",
			"\\",
			"\\ ",
			" \\",
			" \\ ",
			"/ocean/man",
			" /no/u",
			"habib/tahktar/",
			"\\goliath\\online",
			" \\im\\in\\a\\pickle",
			"finally\\"
		);

		it("should be a function", function() {
			expect(utilities.prependSlash).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, "", "/test", "/trim", null, null, null, null, null, null, null, "", "", "/", "/", "/", "\\", "\\", "\\", "\\", "/ocean/man", "/no/u", "/habib/tahktar/", "\\goliath\\online", "\\im\\in\\a\\pickle", "/finally\\"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.prependSlash(newTestData[i])).to.equal(results[i]);
			}
		});
	});

	describe("appendSlash", function() {
		var newTestData = testData.concat(
			" ",
			"\t",
			"/ ",
			" /",
			" / ",
			"\\",
			"\\ ",
			" \\",
			" \\ ",
			"/take/me/by/the/hand",
			" /ayy/lmao",
			"northern/petrol/",
			"\\door\\stuck",
			" \\do\\u\\kno\\da\\wae",
			"wau\\"
		);

		it("should be a function", function() {
			expect(utilities.appendSlash).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, "", "test/", "trim/", null, null, null, null, null, null, null, "", "", "/", "/", "/", "\\", "\\", "\\", "\\", "/take/me/by/the/hand/", "/ayy/lmao/", "northern/petrol/", "\\door\\stuck/", "\\do\\u\\kno\\da\\wae/", "wau\\"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.appendSlash(newTestData[i])).to.equal(results[i]);
			}
		});
	});

	describe("joinPaths", function() {
		var newTestData = [
			{
				left: null,
				right: null,
				result: ""
			},
			{
				left: null,
				right: "readme.txt",
				result: "readme.txt"
			},
			{
				left: "http://www.nitro404.com",
				right: null,
				result: "http://www.nitro404.com"
			},
			{
				left: "https://api.test.com",
				right: "status",
				result: "https://api.test.com/status"
			},
			{
				left: "https://www.youtube.com/",
				right: "watch?v=TBsdWW7MOew",
				result: "https://www.youtube.com/watch?v=TBsdWW7MOew"
			},
			{
				left: "https://www.reddit.com",
				right: "/r/circlejerk",
				result: "https://www.reddit.com/r/circlejerk"
			},
			{
				left: "https://steamcommunity.com/id/",
				right: "/gabelogannewell",
				result: "https://steamcommunity.com/id/gabelogannewell"
			},
			{
				left: "https://www.youtube.com\\",
				right: "watch?v=FuraQCCsKgE",
				result: "https://www.youtube.com/watch?v=FuraQCCsKgE"
			},
			{
				left: "https://www.youtube.com",
				right: "\\watch?v=eOrMzdXEfhA",
				result: "https://www.youtube.com/watch?v=eOrMzdXEfhA"
			},
			{
				left: "https://www.youtube.com\\",
				right: "\\watch?v=6HFw8TNexyU",
				result: "https://www.youtube.com/watch?v=6HFw8TNexyU"
			},
			{
				left: "https://www.youtube.com//",
				right: "watch?v=NgWn7zbgxZ4",
				result: "https://www.youtube.com/watch?v=NgWn7zbgxZ4"
			},
			{
				left: "https://www.youtube.com",
				right: "//watch?v=0tdyU_gW6WE",
				result: "https://www.youtube.com/watch?v=0tdyU_gW6WE"
			},
			{
				left: "https://www.youtube.com//",
				right: "//watch?v=ygI-2F8ApUM",
				result: "https://www.youtube.com/watch?v=ygI-2F8ApUM"
			},
			{
				left: "https://www.youtube.com\\/",
				right: "watch?v=nxg4C365LbQ",
				result: "https://www.youtube.com/watch?v=nxg4C365LbQ"
			},
			{
				left: "https://www.youtube.com",
				right: "\\/watch?v=1wl5BbUg05M",
				result: "https://www.youtube.com/watch?v=1wl5BbUg05M"
			},
			{
				left: "https://www.youtube.com\\/",
				right: "\\/watch?v=JjJ90jhS84A",
				result: "https://www.youtube.com/watch?v=JjJ90jhS84A"
			}
		];

		it("should be a function", function() {
			expect(utilities.joinPaths).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.joinPaths(newTestData[i].left, newTestData[i].right)).to.equal(newTestData[i].result);
			}
		});
	});

	describe("createQueryString", function() {
		var encodedTestDateString = encodeURIComponent(utilities.toString(testDate));

		var newTestData = testData.concat(
			{ "pickle": "surprise!" },
			{ "bargain": "=/bOyz: #&ePi$oDe, +1?" },
			{ "#you/require, @dd:+!onal&=pylon$?": 420.69 },
			{ who: { dat: "boy" } },
			{ nice: ["meme", "m'lady"] },
			{ a: undefined, b: null, c: false, d: true, e: new Boolean(false), f: new Boolean(true), g: -1, h: 0, i: 1, j: 3.141592654, k: Infinity, l: -Infinity, m: "", n: "test", o: " trim\t", p: {}, q: { nice: "meme" }, r: [], s: [0], t: testDate, u: function() { }, v: new RegExp(".+") }
		);

		var results = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "nice=meme", "", "", "", "", "", "pickle=surprise!", "bargain=%3D%2FbOyz%3A%20%23%26ePi%24oDe%2C%20%2B1%3F", "%23you%2Frequire%2C%20%40dd%3A%2B!onal%26%3Dpylon%24%3F=420.69", "who=%7B%22dat%22%3A%22boy%22%7D", "nice=%5B%22meme%22%2C%22m\'lady%22%5D", "a=undefined&b=null&c=false&d=true&e=false&f=true&g=-1&h=0&i=1&j=3.141592654&k=Infinity&l=-Infinity&m=&n=test&o=%20trim%09&p=%7B%7D&q=%7B%22nice%22%3A%22meme%22%7D&r=%5B%5D&s=%5B0%5D&t=" + encodedTestDateString + "&u=" + encodeURIComponent(emptyFunctionString) + "&v=%2F.%2B%2F"];

		it("should be a function", function() {
			expect(utilities.createQueryString).to.be.a("function");
		});

		it("should produce the correct result for each test value with question marks disabled", function() {
			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.createQueryString(newTestData[i], false)).to.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value with question marks enabled", function() {
			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.createQueryString(newTestData[i], true)).to.equal(results[i].length === 0 ? "" : "?" + results[i]);
			}
		});
	});

	describe("createRange", function() {
		var newTestData = testData.concat(-5, -2, 4, 6);

		it("should be a function", function() {
			expect(utilities.createRange).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [[], [], [], [], [], [], [0], [0, 1], [0, 1, 2, 3], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [0, 1, 2, 3, 4], [0, 1, 2, 3, 4, 5, 6]];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.createRange(newTestData[i])).to.deep.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value pair", function() {
			var results = [
				[[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
				[[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
				[[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
				[[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
				[[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
				[[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
				[[], [], [], [], [], [], [0], [0, 1], [0, 1, 2, 3], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [0, 1, 2, 3, 4], [0, 1, 2, 3, 4, 5, 6]],
				[[], [], [], [], [], [], [], [1], [1, 2, 3], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [1, 2, 3, 4], [1, 2, 3, 4, 5, 6]],
				[[], [], [], [], [], [], [], [], [3], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [3, 4], [3, 4, 5, 6]],
				[[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
				[[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
				[[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
				[[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
				[[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
				[[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
				[[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
				[[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
				[[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
				[[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
				[[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
				[[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
				[[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
				[[], [], [], [], [], [], [-5, -4, -3, -2, -1, 0], [-5, -4, -3, -2, -1, 0, 1], [-5, -4, -3, -2, -1, 0, 1, 2, 3], [], [], [], [], [], [], [], [], [], [], [], [], [], [-5], [-5, -4, -3, -2], [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4], [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6]],
				[[], [], [], [], [], [], [-2, -1, 0], [-2, -1, 0, 1], [-2, -1, 0, 1, 2, 3], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [-2], [-2, -1, 0, 1, 2, 3, 4], [-2, -1, 0, 1, 2, 3, 4, 5, 6]],
				[[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [4], [4, 5, 6]],
				[[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [6]]
			];

			for(var i = 0; i < newTestData.length; i++) {
				for(var j = 0; j < newTestData.length; j++) {
					expect(utilities.createRange(newTestData[i], newTestData[j])).to.deep.equal(results[i][j]);
				}
			}
		});
	});

	describe("futureMonths", function() {
		var newTestData = testData.concat(
			new Date("January 29, 1996"),
			new Date("July 1, " + (testDate.getFullYear() + 1))
		);

		var allMonths = utilities.createRange(1, 12);
		var allMonthsPadded = [];

		for(var i = 0; i < allMonths.length; i++) {
			allMonthsPadded.push((allMonths[i] < 10 ? "0" : "") + allMonths[i]);
		}

		it("should be a function", function() {
			expect(utilities.futureMonths).to.be.a("function");
		});

		it("should produce the correct result for each test value with no prepended zeroes", function() {
			var results = [null, null, null, null, null, null, allMonths, allMonths, null, null, null, null, null, null, null, null, null, null, null, allMonths.slice(testDate.getMonth(), 12), null, null, allMonths, allMonths];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.futureMonths(newTestData[i], false)).to.deep.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value with prepended zeroes", function() {
			var results = [null, null, null, null, null, null, allMonthsPadded, allMonthsPadded, null, null, null, null, null, null, null, null, null, null, null, allMonthsPadded.slice(testDate.getMonth(), 12), null, null, allMonthsPadded, allMonthsPadded];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.futureMonths(newTestData[i], true)).to.deep.equal(results[i]);
			}
		});
	});

	describe("visibleElements", function() {
		var newTestData = testData.concat(
			{ visible: true },
			{ hidden: false }
		);

		var trueFunction = function() { return true; };
		var falseFunction = function() { return false; };

		newTestData.push(
			testData.concat(
				{ visible: "nope" },
				{ visible: false },
				{ visible: true },
				{ visible: falseFunction },
				{ visible: trueFunction },
				{ hidden: "avi" },
				{ hidden: false },
				{ hidden: true },
				{ hidden: trueFunction },
				{ hidden: falseFunction }
			)
		);

		it("should be a function", function() {
			expect(utilities.visibleElements).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [
				[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],
				[new Boolean(false), new Boolean(true), { }, { nice: "meme" }, [], [0], testDate, new RegExp(".+"), { visible: "nope" }, { visible: true }, { visible: trueFunction }, { hidden: "avi" }, { hidden: false }, { hidden: falseFunction }]
			];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.visibleElements(newTestData[i])).to.deep.equal(results[i]);
			}
		});
	});

	describe("hiddenElements", function() {
		var newTestData = testData.concat(
			{ visible: true },
			{ hidden: false }
		);

		var trueFunction = function() { return true; };
		var falseFunction = function() { return false; };

		newTestData.push(
			testData.concat(
				{ visible: "nice" },
				{ visible: false },
				{ visible: true },
				{ visible: falseFunction },
				{ visible: trueFunction },
				{ hidden: "meme" },
				{ hidden: false },
				{ hidden: true },
				{ hidden: falseFunction },
				{ hidden: trueFunction }
			)
		);

		it("should be a function", function() {
			expect(utilities.hiddenElements).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [
				[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [0], [], [], [], [], [],
				[undefined, null, false, true, 0, 1, 3.141592654, NaN, Infinity, -Infinity, "", "test", " trim\t", emptyFunction, { visible: false }, { visible: falseFunction }, { hidden: true }, { hidden: trueFunction }]
			];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.hiddenElements(newTestData[i])).to.deep.equal(results[i]);
			}
		});
	});

	describe("enabledElements", function() {
		var newTestData = testData.concat(
			{ enabled: true },
			{ disabled: false }
		);

		var trueFunction = function() { return true; };
		var falseFunction = function() { return false; };

		newTestData.push(
			testData.concat(
				{ enabled: "door" },
				{ enabled: false },
				{ enabled: true },
				{ enabled: falseFunction },
				{ enabled: trueFunction },
				{ disabled: "stuck" },
				{ disabled: false },
				{ disabled: true },
				{ disabled: falseFunction },
				{ disabled: trueFunction }
			)
		);

		it("should be a function", function() {
			expect(utilities.enabledElements).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [
				[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],
				[new Boolean(false), new Boolean(true), { }, { nice: "meme" }, [], [0], testDate, new RegExp(".+"), { enabled: "door" }, { enabled: true }, { enabled: trueFunction }, { disabled: "stuck" }, { disabled: false }, { disabled: falseFunction }]
			];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.enabledElements(newTestData[i])).to.deep.equal(results[i]);
			}
		});
	});

	describe("disabledElements", function() {
		var newTestData = testData.concat(
			{ enabled: true },
			{ disabled: false }
		);

		var trueFunction = function() { return true; };
		var falseFunction = function() { return false; };

		newTestData.push(
			testData.concat(
				{ enabled: "ayy" },
				{ enabled: false },
				{ enabled: true },
				{ enabled: falseFunction },
				{ enabled: trueFunction },
				{ disabled: "lmao" },
				{ disabled: false },
				{ disabled: true },
				{ disabled: falseFunction },
				{ disabled: trueFunction }
			)
		);

		it("should be a function", function() {
			expect(utilities.disabledElements).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [
				[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [0], [], [], [], [], [],
				[undefined, null, false, true, 0, 1, 3.141592654, NaN, Infinity, -Infinity, "", "test", " trim\t", emptyFunction, { enabled: false }, { enabled: falseFunction }, { disabled: true }, { disabled: trueFunction }]
			];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.disabledElements(newTestData[i])).to.deep.equal(results[i]);
			}
		});
	});

	describe("elementsWithAttribute", function() {
		var newTestData = [
			{ value: [], attribute: "none" },
			{ value: [{ }], attribute: "empty" },
			{ value: [{ undefined: undefined }], attribute: "undefined" },
			{ value: [{ null: null }], attribute: "null" },
			{ value: [{ false: false }], attribute: "false" },
			{ value: [{ true: true }], attribute: "true" },
			{ value: [{ falseBooleanObject: new Boolean(false) }], attribute: "falseBooleanObject" },
			{ value: [{ trueBooleanObject: new Boolean(true) }], attribute: "trueBooleanObject" },
			{ value: [{ NaN: NaN }], attribute: "NaN" },
			{ value: [{ Infinity: Infinity }], attribute: "Infinity" },
			{ value: [{ NegativeInfinity: -Infinity }], attribute: "NegativeInfinity" },
			{ value: [{ zero: 0 }], attribute: "zero" },
			{ value: [{ one: 1 }], attribute: "one" },
			{ value: [{ pi: 3.141592654 }], attribute: "pi" },
			{ value: [{ emptyString: "" }], attribute: "emptyString" },
			{ value: [{ space: " " }], attribute: "space" },
			{ value: [{ tab: "\t" }], attribute: "tab" },
			{ value: [{ emptyObject: { } }], attribute: "emptyObject" },
			{ value: [{ emptyArray: [] }], attribute: "emptyArray" },
			{ value: [{ zeroArray: [0] }], attribute: "zeroArray" },
			{ value: [{ date: testDate }], attribute: "date" },
			{ value: [{ function: emptyFunction }], attribute: "function" },
			{ value: [{ regExp: new RegExp(".+") }], attribute: "regExp" },
			{ value: [{ da: "wae", ugandan: "knuckles" }, { da: "meme", weed: 420 }, { vanilla: "Moonlight" }, 69], attribute: "da" }
		];

		it("should be a function", function() {
			expect(utilities.elementsWithAttribute).to.be.a("function");
		});

		it("should correctly handle invalid arguments", function() {
			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.elementsWithAttribute(newTestData[i])).to.deep.equal([]);

				for(var j = 0; j < newTestData.length; j++) {
					expect(utilities.elementsWithAttribute(newTestData[i], newTestData[j])).to.deep.equal([]);

					for(var k = 0; k < newTestData.length; k++) {
						expect(utilities.elementsWithAttribute(newTestData[i], newTestData[j], newTestData[k])).to.deep.equal([]);
					}
				}
			}
		});

		it("should produce the correct result for each test value", function() {
			var results = [
				[], [], [], [], [{ false: false }], [{ true: true }], [{ falseBooleanObject: new Boolean(false) }], [{ trueBooleanObject: new Boolean(true) }], [{ NaN: NaN }], [{ Infinity: Infinity }], [{ NegativeInfinity: -Infinity }], [{ zero: 0 }], [{ one: 1 }], [{ pi: 3.141592654 }], [{ emptyString: "" }], [{ space: " " }], [{ tab: "\t" }], [{ emptyObject: { } }], [{ emptyArray: [] }], [{ zeroArray: [0] }], [{ date: testDate }], [{ function: emptyFunction }], [{ regExp: new RegExp(".+") }], [{ da: "wae", ugandan: "knuckles" }, { da: "meme", weed: 420 }]
			];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.elementsWithAttribute(newTestData[i].value, newTestData[i].attribute)).to.deep.equal(results[i]);
			}

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.elementsWithAttribute(newTestData[i].value, newTestData[i].attribute, true)).to.deep.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value with has attribute set to false", function() {
			var results = [
				[], [{ }], [{ undefined: undefined }], [{ null: null }], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [{ vanilla: "Moonlight" }]
			];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.elementsWithAttribute(newTestData[i].value, newTestData[i].attribute, false)).to.deep.equal(results[i]);
			}
		});
	});

	describe("elementsWithoutAttribute", function() {
		var newTestData = [
			{ value: [], attribute: "none" },
			{ value: [{ }], attribute: "empty" },
			{ value: [{ undefined: undefined }], attribute: "undefined" },
			{ value: [{ null: null }], attribute: "null" },
			{ value: [{ false: false }], attribute: "false" },
			{ value: [{ true: true }], attribute: "true" },
			{ value: [{ falseBooleanObject: new Boolean(false) }], attribute: "falseBooleanObject" },
			{ value: [{ trueBooleanObject: new Boolean(true) }], attribute: "trueBooleanObject" },
			{ value: [{ NaN: NaN }], attribute: "NaN" },
			{ value: [{ Infinity: Infinity }], attribute: "Infinity" },
			{ value: [{ NegativeInfinity: -Infinity }], attribute: "NegativeInfinity" },
			{ value: [{ zero: 0 }], attribute: "zero" },
			{ value: [{ one: 1 }], attribute: "one" },
			{ value: [{ pi: 3.141592654 }], attribute: "pi" },
			{ value: [{ emptyString: "" }], attribute: "emptyString" },
			{ value: [{ space: " " }], attribute: "space" },
			{ value: [{ tab: "\t" }], attribute: "tab" },
			{ value: [{ emptyObject: { } }], attribute: "emptyObject" },
			{ value: [{ emptyArray: [] }], attribute: "emptyArray" },
			{ value: [{ zeroArray: [0] }], attribute: "zeroArray" },
			{ value: [{ date: testDate }], attribute: "date" },
			{ value: [{ function: function() { } }], attribute: "function" },
			{ value: [{ regExp: new RegExp(".+") }], attribute: "regExp" },
			{ value: [{ da: "wae", ugandan: "knuckles" }, { da: "meme", weed: 420 }, { vanilla: "Moonlight" }, 69], attribute: "da" }
		];

		it("should be a function", function() {
			expect(utilities.elementsWithoutAttribute).to.be.a("function");
		});

		it("should correctly handle invalid arguments", function() {
			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.elementsWithoutAttribute(newTestData[i])).to.deep.equal([]);

				for(var j = 0; j < newTestData.length; j++) {
					expect(utilities.elementsWithoutAttribute(newTestData[i], newTestData[j])).to.deep.equal([]);
				}
			}
		});

		it("should produce the correct result for each test value", function() {
			var results = [
				[], [{ }], [{ undefined: undefined }], [{ null: null }], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [{ vanilla: "Moonlight" }]
			];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.elementsWithoutAttribute(newTestData[i].value, newTestData[i].attribute)).to.deep.equal(results[i]);
			}
		});
	});

	describe("matchAttribute", function() {
		var newTestData = testData.concat(
			{ nice: "ketchup" },
			{ nice: 420 },
			{ nice: undefined },
			{ nice: null },
			{ nice: false },
			{ nice: true },
			{ surprise: "meme", nice: "ketchup" },
			{ surprise: function() { } }
		);

		var attributes = ["nice", "surprise", "length"];

		var values = [undefined, null, false, true, "meme", "ketchup", 420, 0, 1];

		it("should be a function", function() {
			expect(utilities.matchAttribute).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [
				[[false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false]],
				[[false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false]],
				[[false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false]],
				[[false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false]],
				[[true,  false, false, false, false, false, false, false, false], [true,  false, false, false, false, false, false, false, false], [true,  false, false, false, false, false, false, false, false]],
				[[true,  false, false, false, false, false, false, false, false], [true,  false, false, false, false, false, false, false, false], [true,  false, false, false, false, false, false, false, false]],
				[[false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false]],
				[[false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false]],
				[[false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false]],
				[[false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false]],
				[[false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false]],
				[[false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false]],
				[[false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false]],
				[[false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false]],
				[[false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false]],
				[[true,  false, false, false, false, false, false, false, false], [true,  false, false, false, false, false, false, false, false], [true,  false, false, false, false, false, false, false, false]],
				[[false, false, false, false, true,  false, false, false, false], [true,  false, false, false, false, false, false, false, false], [true,  false, false, false, false, false, false, false, false]],
				[[true,  false, false, false, false, false, false, false, false], [true,  false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, true,  false]],
				[[true,  false, false, false, false, false, false, false, false], [true,  false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, true ]],
				[[true,  false, false, false, false, false, false, false, false], [true,  false, false, false, false, false, false, false, false], [true,  false, false, false, false, false, false, false, false]],
				[[false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false]],
				[[true,  false, false, false, false, false, false, false, false], [true,  false, false, false, false, false, false, false, false], [true,  false, false, false, false, false, false, false, false]],
				[[false, false, false, false, false, true,  false, false, false], [true,  false, false, false, false, false, false, false, false], [true,  false, false, false, false, false, false, false, false]],
				[[false, false, false, false, false, false, true,  false, false], [true,  false, false, false, false, false, false, false, false], [true,  false, false, false, false, false, false, false, false]],
				[[true,  false, false, false, false, false, false, false, false], [true,  false, false, false, false, false, false, false, false], [true,  false, false, false, false, false, false, false, false]],
				[[false, true,  false, false, false, false, false, false, false], [true,  false, false, false, false, false, false, false, false], [true,  false, false, false, false, false, false, false, false]],
				[[false, false, true,  false, false, false, false, false, false], [true,  false, false, false, false, false, false, false, false], [true,  false, false, false, false, false, false, false, false]],
				[[false, false, false, true,  false, false, false, false, false], [true,  false, false, false, false, false, false, false, false], [true,  false, false, false, false, false, false, false, false]],
				[[false, false, false, false, false, true,  false, false, false], [false, false, false, false, true,  false, false, false, false], [true,  false, false, false, false, false, false, false, false]],
				[[true,  false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false], [true,  false, false, false, false, false, false, false, false]]
			];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.matchAttribute(newTestData[i])).to.equal(utilities.isObject(newTestData[i]));

				for(var j = 0; j < attributes.length; j++) {
					expect(utilities.matchAttribute(newTestData[i], attributes[j])).to.equal(results[i][j][0]);

					for(var k = 0; k < values.length; k++) {
						expect(utilities.matchAttribute(newTestData[i], attributes[j], values[k])).to.equal(results[i][j][k]);
					}
				}
			}
		});
	});

	describe("generateVersions", function() {
		var additionalTestData = ["420", "007", "2.0", "3.1.0.0", "04.2.00.0", "can't make it", "-3 -9", "00 6 04 00800 0"];

		var additionalPrefixes = ["saint", " vapor"];

		var additionalSuffixes = ["pepsi", "wave\t"];

		it("should be a function", function() {
			expect(utilities.generateVersions).to.be.a("function");
		});

		it("should produce the correct result for each test value with no prefix or suffix", function() {
			var results = [
				["420"],
				["7"],
				["2", "2_0"],
				["3", "3_1", "3_1_0", "3_1_0_0"],
				["4", "4_2", "4_2_0", "4_2_0_0"],
				["can\'t", "can\'t_make", "can\'t_make_it"],
				null,
				["0","0_6", "0_6_4", "0_6_4_800", "0_6_4_800_0"]
			];

			for(var i = 0; i < additionalTestData.length; i++) {
				expect(utilities.generateVersions(additionalTestData[i])).to.deep.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value and prefix", function() {
			var results = [
				[["saint420"], ["vapor420"]],
				[["saint7"], ["vapor7"]],
				[["saint2", "saint2_0"], ["vapor2", "vapor2_0"]],
				[["saint3", "saint3_1", "saint3_1_0", "saint3_1_0_0"], ["vapor3", "vapor3_1", "vapor3_1_0", "vapor3_1_0_0"]],
				[["saint4", "saint4_2", "saint4_2_0", "saint4_2_0_0"], ["vapor4", "vapor4_2", "vapor4_2_0", "vapor4_2_0_0"]],
				[["saintcan\'t", "saintcan\'t_make", "saintcan\'t_make_it"], ["vaporcan\'t", "vaporcan\'t_make", "vaporcan\'t_make_it"]],
				[null, null],
				[["saint0", "saint0_6", "saint0_6_4", "saint0_6_4_800", "saint0_6_4_800_0"], ["vapor0", "vapor0_6", "vapor0_6_4", "vapor0_6_4_800", "vapor0_6_4_800_0"]]
			];

			for(var i = 0; i < additionalTestData.length; i++) {
				for(var j = 0; j < additionalPrefixes.length; j++) {
					expect(utilities.generateVersions(additionalTestData[i], additionalPrefixes[j])).to.deep.equal(results[i][j]);
				}
			}
		});

		it("should produce the correct result for each test value and suffix", function() {
			var results = [
				[["420pepsi"], ["420wave"]],
				[["7pepsi"], ["7wave"]],
				[["2pepsi", "2_0pepsi"], ["2wave", "2_0wave"]],
				[["3pepsi", "3_1pepsi", "3_1_0pepsi", "3_1_0_0pepsi"], ["3wave", "3_1wave", "3_1_0wave", "3_1_0_0wave"]],
				[["4pepsi", "4_2pepsi", "4_2_0pepsi", "4_2_0_0pepsi"], ["4wave", "4_2wave", "4_2_0wave", "4_2_0_0wave"]],
				[["can\'tpepsi", "can\'t_makepepsi", "can\'t_make_itpepsi"], ["can\'twave", "can\'t_makewave", "can\'t_make_itwave"]],
				[null, null],
				[["0pepsi", "0_6pepsi", "0_6_4pepsi", "0_6_4_800pepsi", "0_6_4_800_0pepsi"], ["0wave", "0_6wave", "0_6_4wave", "0_6_4_800wave", "0_6_4_800_0wave"]]
			];

			for(var i = 0; i < additionalTestData.length; i++) {
				for(var j = 0; j < additionalSuffixes.length; j++) {
					expect(utilities.generateVersions(additionalTestData[i], null, additionalSuffixes[j])).to.deep.equal(results[i][j]);
				}
			}
		});

		it("should produce the correct result for each additional test value and prefix / suffix", function() {
			var results = [
				[
					[["saint420pepsi"], ["saint420wave"]],
					[["vapor420pepsi"], ["vapor420wave"]]
				],
				[
					[["saint7pepsi"], ["saint7wave"]],
					[["vapor7pepsi"], ["vapor7wave"]]
				],
				[
					[["saint2pepsi", "saint2_0pepsi"], ["saint2wave", "saint2_0wave"]],
					[["vapor2pepsi", "vapor2_0pepsi"], ["vapor2wave", "vapor2_0wave"]]
				],
				[
					[["saint3pepsi", "saint3_1pepsi", "saint3_1_0pepsi", "saint3_1_0_0pepsi"], ["saint3wave", "saint3_1wave", "saint3_1_0wave", "saint3_1_0_0wave"]],
					[["vapor3pepsi", "vapor3_1pepsi", "vapor3_1_0pepsi", "vapor3_1_0_0pepsi"], ["vapor3wave", "vapor3_1wave", "vapor3_1_0wave", "vapor3_1_0_0wave"]]
				],
				[
					[["saint4pepsi", "saint4_2pepsi", "saint4_2_0pepsi", "saint4_2_0_0pepsi"], ["saint4wave", "saint4_2wave", "saint4_2_0wave", "saint4_2_0_0wave"]],
					[["vapor4pepsi", "vapor4_2pepsi", "vapor4_2_0pepsi", "vapor4_2_0_0pepsi"], ["vapor4wave", "vapor4_2wave", "vapor4_2_0wave", "vapor4_2_0_0wave"]]
				],
				[
					[["saintcan\'tpepsi", "saintcan\'t_makepepsi", "saintcan\'t_make_itpepsi"], ["saintcan\'twave", "saintcan\'t_makewave", "saintcan\'t_make_itwave"]],
					[["vaporcan\'tpepsi", "vaporcan\'t_makepepsi", "vaporcan\'t_make_itpepsi"], ["vaporcan\'twave", "vaporcan\'t_makewave", "vaporcan\'t_make_itwave"]]
				],
				[
					[null, null],
					[null, null]
				],
				[
					[["saint0pepsi", "saint0_6pepsi", "saint0_6_4pepsi", "saint0_6_4_800pepsi", "saint0_6_4_800_0pepsi"], ["saint0wave", "saint0_6wave", "saint0_6_4wave", "saint0_6_4_800wave", "saint0_6_4_800_0wave"]],
					[["vapor0pepsi", "vapor0_6pepsi", "vapor0_6_4pepsi", "vapor0_6_4_800pepsi", "vapor0_6_4_800_0pepsi"], ["vapor0wave", "vapor0_6wave", "vapor0_6_4wave", "vapor0_6_4_800wave", "vapor0_6_4_800_0wave"]]
				]
			];

			for(var i = 0; i < additionalTestData.length; i++) {
				for(var j = 0; j < additionalPrefixes.length; j++) {
					for(var k = 0; k < additionalSuffixes.length; k++) {
						expect(utilities.generateVersions(additionalTestData[i], additionalPrefixes[j], additionalSuffixes[k])).to.deep.equal(results[i][j][k]);
					}
				}
			}
		});
	});

	describe("parseVersion", function() {
		var newTestData = testData.concat("420", "007", "2.0", "3.1.0.0", "04.2.00.0", "can't make it", "-3 -9", "00 6 04 00800 0");

		it("should be a function", function() {
			expect(utilities.parseVersion).to.be.a("function");
		});

		it("should produce the correct result for each test value", function() {
			var results = [
				null, null, null, null, null, null, ["0"], ["1"], ["3", "141592654"], null, null, null, null, ["test"], ["trim"], null, null, null, null, null, null, null, ["420"], ["7"], ["2", "0"], ["3", "1", "0", "0"], ["4", "2", "0", "0"], ["can't", "make", "it"], null, ["0", "6", "4", "800", "0"]
			];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.parseVersion(newTestData[i])).to.deep.equal(results[i]);
			}

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.parseVersion(newTestData[i], false)).to.deep.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value with trim trailing zeroes enabled", function() {
			var results = [
				null, null, null, null, null, null, ["0"], ["1"], ["3", "141592654"], null, null, null, null, ["test"], ["trim"], null, null, null, null, null, null, null, ["420"], ["7"], ["2"], ["3", "1"], ["4", "2"], ["can't", "make", "it"], null, ["0", "6", "4", "800"]
			];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.parseVersion(newTestData[i], true)).to.deep.equal(results[i]);
			}
		});
	});

	describe("compareVersions", function() {
		var newTestData = testData.concat("1 A", "\tTrim");

		var additionalTestData = [69, "69", "420", "007", "2.0", "2.0.0.0.0", 2.1, "2.1", "2.1 A", "2.1 B", "3.1.0.0", "04.2.00.0", "can't make it", "-3 -9", "00 6 04 00800 0", "1.3.3.6.9", "1.3.3.7.0", "1.3.3.7.0.0.1", "1.3.3.7.1", "a", "A", "b","B", "X", "y"];

		var newResults = {
			caseInsensitive: [
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, 0,    -1,   -1,   null, null, null, null, -1,   -1,   null, null, null, null, null, null, null, -1,   -1  ],
				[null, null, null, null, null, null, 1,     0,   -1,   null, null, null, null, -1,   -1,   null, null, null, null, null, null, null, -1,   -1  ],
				[null, null, null, null, null, null, 1,     1,    0,   null, null, null, null, -1,   -1,   null, null, null, null, null, null, null, 1,    -1  ],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, 1,    1,    1,    null, null, null, null, 0,    -1,   null, null, null, null, null, null, null, 1,    -1  ],
				[null, null, null, null, null, null, 1,    1,    1,    null, null, null, null, 1,    0,    null, null, null, null, null, null, null, 1,    0   ],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, 1,    1,    -1,   null, null, null, null, -1,   -1,   null, null, null, null, null, null, null, 0,    -1  ],
				[null, null, null, null, null, null, 1,    1,     1,   null, null, null, null,  1,    0,   null, null, null, null, null, null, null, 1,    0   ]
			],
			caseSensitive: [
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, 0,    -1,   -1,   null, null, null, null, -1,   -1,   null, null, null, null, null, null, null, -1,   -1  ],
				[null, null, null, null, null, null, 1,     0,   -1,   null, null, null, null, -1,   -1,   null, null, null, null, null, null, null, -1,   -1  ],
				[null, null, null, null, null, null, 1,     1,    0,   null, null, null, null, -1,   -1,   null, null, null, null, null, null, null, 1,    -1  ],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, 1,    1,    1,    null, null, null, null, 0,    -1,   null, null, null, null, null, null, null, 1,    1   ],
				[null, null, null, null, null, null, 1,    1,    1,    null, null, null, null, 1,    0,    null, null, null, null, null, null, null, 1,    1   ],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, 1,    1,    -1,   null, null, null, null, -1,   -1,   null, null, null, null, null, null, null, 0,    -1  ],
				[null, null, null, null, null, null, 1,    1,     1,   null, null, null, null, -1,   -1,   null, null, null, null, null, null, null, 1,    0   ]
			]
		};

		var additionalResults = {
			caseInsensitive: [
				[ 0,    0,   -1,    1,    1,    1,    1,    1,    1,    1,    1,    1,   -1,   null,  1,    1,    1,    1,    1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[ 0,    0,   -1,    1,    1,    1,    1,    1,    1,    1,    1,    1,   -1,   null,  1,    1,    1,    1,    1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[ 1,    1,    0,    1,    1,    1,    1,    1,    1,    1,    1,    1,   -1,   null,  1,    1,    1,    1,    1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[-1,   -1,   -1,    0,    1,    1,    1,    1,    1,    1,    1,    1,   -1,   null,  1,    1,    1,    1,    1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[-1,   -1,   -1,   -1,    0,    0,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   null,  1,    1,    1,    1,    1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[-1,   -1,   -1,   -1,    0,    0,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   null,  1,    1,    1,    1,    1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[-1,   -1,   -1,   -1,    1,    1,    0,    0,   -1,   -1,   -1,   -1,   -1,   null,  1,    1,    1,    1,    1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[-1,   -1,   -1,   -1,    1,    1,    0,    0,   -1,   -1,   -1,   -1,   -1,   null,  1,    1,    1,    1,    1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[-1,   -1,   -1,   -1,    1,    1,    1,    1,    0,   -1,   -1,   -1,   -1,   null,  1,    1,    1,    1,    1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[-1,   -1,   -1,   -1,    1,    1,    1,    1,    1,    0,   -1,   -1,   -1,   null,  1,    1,    1,    1,    1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[-1,   -1,   -1,   -1,    1,    1,    1,    1,    1,    1,    0,   -1,   -1,   null,  1,    1,    1,    1,    1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[-1,   -1,   -1,   -1,    1,    1,    1,    1,    1,    1,    1,    0,   -1,   null,  1,    1,    1,    1,    1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[ 1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    0,   null,  1,    1,    1,    1,    1,    1,    1,    1,    1,   -1,   -1  ],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[-1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   null,  0,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[-1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   null,  1,    0,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[-1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   null,  1,    1,    0,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[-1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   null,  1,    1,    1,    0,   -1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[-1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   null,  1,    1,    1,    1,    0,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[ 1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,   -1,   null,  1,    1,    1,    1,    1,    0,    0,   -1,   -1,   -1,   -1  ],
				[ 1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,   -1,   null,  1,    1,    1,    1,    1,    0,    0,   -1,   -1,   -1,   -1  ],
				[ 1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,   -1,   null,  1,    1,    1,    1,    1,    1,    1,    0,    0,   -1,   -1  ],
				[ 1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,   -1,   null,  1,    1,    1,    1,    1,    1,    1,    0,    0,   -1,   -1  ],
				[ 1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,   null,  1,    1,    1,    1,    1,    1,    1,    1,    1,    0,   -1  ],
				[ 1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,   null,  1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    0  ],
			],
			caseSensitive: [
				[ 0,    0,   -1,    1,    1,    1,    1,    1,    1,    1,    1,    1,   -1,   null,  1,    1,    1,    1,    1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[ 0,    0,   -1,    1,    1,    1,    1,    1,    1,    1,    1,    1,   -1,   null,  1,    1,    1,    1,    1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[ 1,    1,    0,    1,    1,    1,    1,    1,    1,    1,    1,    1,   -1,   null,  1,    1,    1,    1,    1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[-1,   -1,   -1,    0,    1,    1,    1,    1,    1,    1,    1,    1,   -1,   null,  1,    1,    1,    1,    1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[-1,   -1,   -1,   -1,    0,    0,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   null,  1,    1,    1,    1,    1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[-1,   -1,   -1,   -1,    0,    0,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   null,  1,    1,    1,    1,    1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[-1,   -1,   -1,   -1,    1,    1,    0,    0,   -1,   -1,   -1,   -1,   -1,   null,  1,    1,    1,    1,    1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[-1,   -1,   -1,   -1,    1,    1,    0,    0,   -1,   -1,   -1,   -1,   -1,   null,  1,    1,    1,    1,    1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[-1,   -1,   -1,   -1,    1,    1,    1,    1,    0,   -1,   -1,   -1,   -1,   null,  1,    1,    1,    1,    1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[-1,   -1,   -1,   -1,    1,    1,    1,    1,    1,    0,   -1,   -1,   -1,   null,  1,    1,    1,    1,    1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[-1,   -1,   -1,   -1,    1,    1,    1,    1,    1,    1,    0,   -1,   -1,   null,  1,    1,    1,    1,    1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[-1,   -1,   -1,   -1,    1,    1,    1,    1,    1,    1,    1,    0,   -1,   null,  1,    1,    1,    1,    1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[ 1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    0,   null,  1,    1,    1,    1,    1,    1,    1,    1,    1,    1,   -1  ],
				[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				[-1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   null,  0,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[-1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   null,  1,    0,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[-1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   null,  1,    1,    0,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[-1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   null,  1,    1,    1,    0,   -1,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[-1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   null,  1,    1,    1,    1,    0,   -1,   -1,   -1,   -1,   -1,   -1  ],
				[ 1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,   -1,   null,  1,    1,    1,    1,    1,    0,    1,   -1,    1,    1,   -1  ],
				[ 1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,   -1,   null,  1,    1,    1,    1,    1,   -1,    0,   -1,   -1,   -1,   -1  ],
				[ 1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,   -1,   null,  1,    1,    1,    1,    1,    1,    1,    0,    1,    1,   -1  ],
				[ 1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,   -1,   null,  1,    1,    1,    1,    1,   -1,    1,   -1,    0,   -1,   -1  ],
				[ 1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,   -1,   null,  1,    1,    1,    1,    1,   -1,    1,   -1,    1,    0,   -1  ],
				[ 1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,   null,  1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    0  ],
			]
		};

		it("should be a function", function() {
			expect(utilities.compareVersions).to.be.a("function");
		});

		it("should produce the correct result for each test value pair with case sensitivity disabled", function() {
			for(var i = 0; i < newTestData.length; i++) {
				for(var j = 0; j < newTestData.length; j++) {
					expect(utilities.compareVersions(newTestData[i], newTestData[j])).to.equal(newResults.caseInsensitive[i][j]);
					expect(utilities.compareVersions(newTestData[i], newTestData[j], false)).to.equal(newResults.caseInsensitive[i][j]);
					expect(utilities.compareVersions(newTestData[i], newTestData[j], false, false)).to.equal(newResults.caseInsensitive[i][j]);
				}
			}
		});

		it("should produce the correct result for each test value pair with case sensitivity enabled", function() {
			for(var i = 0; i < newTestData.length; i++) {
				for(var j = 0; j < newTestData.length; j++) {
					expect(utilities.compareVersions(newTestData[i], newTestData[j], true)).to.equal(newResults.caseSensitive[i][j]);
					expect(utilities.compareVersions(newTestData[i], newTestData[j], true, false)).to.equal(newResults.caseSensitive[i][j]);
				}
			}
		});

		it("should correctly throw errors when enabled for each test value pair with case sensitivity disabled", function() {
			var errorThrown = null;

			for(var i = 0; i < newTestData.length; i++) {
				for(var j = 0; j < newTestData.length; j++) {
					errorThrown = false;

					try {
						utilities.compareVersions(newTestData[i], newTestData[j], false, true);
					}
					catch(error) {
						errorThrown = true;
					}

					expect(errorThrown).to.equal(newResults.caseInsensitive[i][j] === null);
				}
			}
		});

		it("should correctly throw errors when enabled for each test value pair with case sensitivity enabled", function() {
			var errorThrown = null;

			for(var i = 0; i < newTestData.length; i++) {
				for(var j = 0; j < newTestData.length; j++) {
					errorThrown = false;

					try {
						utilities.compareVersions(newTestData[i], newTestData[j], true, true);
					}
					catch(error) {
						errorThrown = true;
					}

					expect(errorThrown).to.equal(newResults.caseSensitive[i][j] === null);
				}
			}
		});

		it("should produce the correct result for each additional test value pair with case sensitivity disabled", function() {
			for(var i = 0; i < additionalTestData.length; i++) {
				for(var j = 0; j < additionalTestData.length; j++) {
					expect(utilities.compareVersions(additionalTestData[i], additionalTestData[j])).to.equal(additionalResults.caseInsensitive[i][j]);
					expect(utilities.compareVersions(additionalTestData[i], additionalTestData[j], false)).to.equal(additionalResults.caseInsensitive[i][j]);
					expect(utilities.compareVersions(additionalTestData[i], additionalTestData[j], false, false)).to.equal(additionalResults.caseInsensitive[i][j]);
				}
			}
		});

		it("should produce the correct result for each additional test value pair with case sensitivity enabled", function() {
			for(var i = 0; i < additionalTestData.length; i++) {
				for(var j = 0; j < additionalTestData.length; j++) {
					expect(utilities.compareVersions(additionalTestData[i], additionalTestData[j], true)).to.equal(additionalResults.caseSensitive[i][j]);
					expect(utilities.compareVersions(additionalTestData[i], additionalTestData[j], true, false)).to.equal(additionalResults.caseSensitive[i][j]);
				}
			}
		});

		it("should correctly throw errors when enabled for each additional test value pair with case sensitivity disabled", function() {
			var errorThrown = null;

			for(var i = 0; i < additionalTestData.length; i++) {
				for(var j = 0; j < additionalTestData.length; j++) {
					errorThrown = false;

					try {
						utilities.compareVersions(additionalTestData[i], additionalTestData[j], false, true);
					}
					catch(error) {
						errorThrown = true;
					}

					expect(errorThrown).to.equal(additionalResults.caseInsensitive[i][j] === null);
				}
			}
		});

		it("should correctly throw errors when enabled for each additional test value pair with case sensitivity enabled", function() {
			var errorThrown = null;

			for(var i = 0; i < additionalTestData.length; i++) {
				for(var j = 0; j < additionalTestData.length; j++) {
					errorThrown = false;

					try {
						utilities.compareVersions(additionalTestData[i], additionalTestData[j], true, true);
					}
					catch(error) {
						errorThrown = true;
					}

					expect(errorThrown).to.equal(additionalResults.caseSensitive[i][j] === null);
				}
			}
		});
	});

	describe("hasPostalCodeValidator", function() {
		it("should be a function", function() {
			expect(utilities.hasPostalCodeValidator).to.be.a("function");
		});
	});

	describe("validatePostalCode", function() {
		it("should be a function", function() {
			expect(utilities.validatePostalCode).to.be.a("function");
		});
	});
});
