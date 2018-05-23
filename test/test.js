global.validator = undefined;
global.changeCase = undefined;

var utilities = require("../dist/extra-utilities.js");
var chai = require("chai");
var expect = chai.expect;

var testDate = new Date();

var functionString = function() { }.toString();

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
	function() { },
	new RegExp(".+")
];

describe("Utilities", function() {
	describe("isValid", function() {
		it("should be a function", function() {
			expect(utilities.isValid instanceof Function).to.equal(true);
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
			expect(utilities.isInvalid instanceof Function).to.equal(true);
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
			expect(utilities.isBoolean instanceof Function).to.equal(true);
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
			expect(utilities.isValidNumber instanceof Function).to.equal(true);
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
			expect(utilities.isInvalidNumber instanceof Function).to.equal(true);
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
			expect(utilities.isEmptyString instanceof Function).to.equal(true);
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
			expect(utilities.isNonEmptyString instanceof Function).to.equal(true);
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
			expect(utilities.isObject instanceof Function).to.equal(true);
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
			expect(utilities.isObjectStrict instanceof Function).to.equal(true);
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
			expect(utilities.isEmptyObject instanceof Function).to.equal(true);
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
			expect(utilities.isNonEmptyObject instanceof Function).to.equal(true);
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
			expect(utilities.isEmptyArray instanceof Function).to.equal(true);
		});

		it("should produce the correct result for each test value", function() {
			var results = [true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false];

			for(var i = 0; i < testData.length; i++) {
				expect(utilities.isEmptyArray(testData[i])).to.equal(results[i]);
			}
		});
	});

	describe("isNonEmptyArray", function() {
		it("should be a function", function() {
			expect(utilities.isNonEmptyArray instanceof Function).to.equal(true);
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
			expect(utilities.isDate instanceof Function).to.equal(true);
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
			expect(utilities.isError instanceof Function).to.equal(true);
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
			expect(utilities.isRegularExpression instanceof Function).to.equal(true);
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
			expect(utilities.isFunction instanceof Function).to.equal(true);
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
			expect(utilities.isComment instanceof Function).to.equal(true);
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
			expect(utilities.isVisible instanceof Function).to.equal(true);
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
			expect(utilities.isHidden instanceof Function).to.equal(true);
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
			expect(utilities.isEnabled instanceof Function).to.equal(true);
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
			expect(utilities.isDisabled instanceof Function).to.equal(true);
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
			expect(utilities.parseBoolean instanceof Function).to.equal(true);
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
			expect(utilities.parseInteger instanceof Function).to.equal(true);
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
			expect(utilities.parseFloatingPointNumber instanceof Function).to.equal(true);
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
			expect(utilities.parseDate instanceof Function).to.equal(true);
		});

		it("should produce the correct result for each test value", function() {
			var results = [null, null, null, null, null, null, new Date(0), new Date(1), null, null, null, null, null, null, null, null, null, null, null, testDate, null, null, new Date("June 5, 2012"), new Date("June 18, 1987 3:30 PM"), new Date("2018-02-19T06:19:33Z"), testDate, testDate, testDate];

			for(var i = 0; i < newTestData.length; i++) {
				if(results[i] === null) {
					expect(utilities.parseDate(newTestData[i])).to.equal(null);
				}
				else {
					expect(utilities.parseDate(newTestData[i]).toString()).to.equal(results[i].toString());
				}
			}
		});

		it("should produce the correct result for each test value with a custom default", function() {
			var defaultDate = new Date("October 21, 2015 4:29 PM");
			var results = [defaultDate, defaultDate, defaultDate, defaultDate, defaultDate, defaultDate, new Date(0), new Date(1), defaultDate, defaultDate, defaultDate, defaultDate, defaultDate, defaultDate, defaultDate, defaultDate, defaultDate, defaultDate, defaultDate, testDate, defaultDate, defaultDate, new Date("June 5, 2012"), new Date("June 18, 1987 3:30 PM"), new Date("2018-02-19T06:19:33Z"), testDate, testDate, testDate];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.parseDate(newTestData[i], defaultDate).toString()).to.equal(results[i].toString());
			}
		});
	});

	describe("parseTime", function() {
		var newTestData = testData.concat("9:30 AM", "11:59 PM", "12:00 AM", "12:01 AM", "11:59 AM", "12:00 PM", "12:01 PM", "1632", "2359", "0000", "0001", "1159", "1200", "1201", "2400", "12:60 AM", "13:00 PM", "3:60 AM", "4:77 PM", "0161", "2401", "2188", "2520");

		it("should be a function", function() {
			expect(utilities.parseTime instanceof Function).to.equal(true);
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
					expect(utilities.toString(utilities.parseTime(newTestData[i]))).to.equal(utilities.toString(results[i]));
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
						expect(utilities.toString(utilities.parseTime(newTestData[i], true))).to.equal(utilities.toString(results[i]));
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
			expect(utilities.parsePostalCode instanceof Function).to.equal(true);
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
			expect(utilities.parseEmail instanceof Function).to.equal(true);
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
			expect(utilities.parseEmailDomain instanceof Function).to.equal(true);
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
			expect(utilities.parseStringList instanceof Function).to.equal(true);
		});

		it("should produce the correct result for each test value", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, [], ["test"], ["trim"], null, null, null, null, null, null, null, [], [], ["board"], ["room"], ["same"], ["tie"], ["e", "x", "e"]];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.toString(utilities.parseStringList(newTestData[i]))).to.equal(utilities.toString(results[i]));
			}
		});
	});

	describe("parseRegularExpression", function() {
		var newTestData = testData.concat("/pop[ ]*the[ ]kettle/gmi", "/corporate/m", "/spy/i", "/ayy/gm", "/lmao/g", "/muggachini/");
		var invalidTestData = ["/door/stuck", "/y/x"];

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
			expect(utilities.parseRegularExpression instanceof Function).to.equal(true);
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
				expect(utilities.toString(utilities.parseRegularExpression(newTestData[i]))).to.equal(utilities.toString(results[i]));
			}
		});

		it("should throw an error for each regular expression value with invalid flags", function() {
			var errorThrown = null;

			for(var i = 0; i < invalidTestData.length; i++) {
				errorThrown = false;

				try {
					utilities.parseRegularExpression(invalidTestData[i]);
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
			expect(utilities.parseYouTubeLink instanceof Function).to.equal(true);
		});

		it("should produce the correct result for each test value", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "NUnwFHplBg4", "VqB1uoDTdKM", "NgWn7zbgxZ4", "52eQJ5QpfEg", "AX5CtqKX_pU", "IOIGaIhF_wI", "4QZ2AbBuVB4", "VeAJ9U5nbVQ", "Ywsoxoc68Oc", "OEEEy1dMceI", "b4YC-4n0ap0", "EQiSgWGAc24", "Dkm8Hteeh6M", "87je-QAPZIU", "w-0CS-T1HUQ", "QrGrOK8oZG8", "ssr1PMSNvwk", "cd4-UnU8lWY", "x7ZrKehQ_xc", "z874bjpO9d8", "Op6kgayifzU", "U7Rn4KS3TCY", "8NArIVIQ4BI", "kOWEb9Lt98Y", "-BG9lhTg6xY", "UiVWItLdvAE"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.parseYouTubeLink(newTestData[i])).to.equal(results[i]);
			}
		});
	});

	describe("formatValue", function() {
		it("should be a function", function() {
			expect(utilities.formatValue instanceof Function).to.equal(true);
		});
	});

	describe("formatObject", function() {
		it("should be a function", function() {
			expect(utilities.formatObject instanceof Function).to.equal(true);
		});
	});

	describe("formatStringList", function() {
		var newTestData = testData.concat(",", ";", "board,", ",room", "same;", ";tie", " ;\te ,\tx ;\te ,\t \t");
		newTestData.push(["SURPRISE", "KETCHUP"]);
		newTestData.push([2, "pigeons", ".", "exe"]);
		newTestData.push(["", " ", "\t"]);
		newTestData.push(["cant", { make: "it" }]);

		it("should be a function", function() {
			expect(utilities.formatStringList instanceof Function).to.equal(true);
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

	describe("trimString", function() {
		var newTestData = testData.concat("   \t broden  kelly\t    \t");

		it("should be a function", function() {
			expect(utilities.trimString instanceof Function).to.equal(true);
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

	describe("trimWhitespace", function() {
		var newTestData = testData.concat(" white space \t", "new\r\nlines\t\n");

		it("should be a function", function() {
			expect(utilities.trimWhitespace instanceof Function).to.equal(true);
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
			expect(utilities.trimTrailingNewlines instanceof Function).to.equal(true);
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
			expect(utilities.replaceNonBreakingSpaces instanceof Function).to.equal(true);
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
			expect(utilities.indentText instanceof Function).to.equal(true);
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
			expect(utilities.trimLeadingZeroes instanceof Function).to.equal(true);
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
			expect(utilities.addLeadingZeroes instanceof Function).to.equal(true);
		});

		it("should produce the correct result for each test value", function() {
			var results = [null, null, "false", "true", "false", "true", "0", "1", "3.141592654", "NaN", "Infinity", "-Infinity", "", "test", " trim\t", "[object Object]", "[object Object]", "", "0", testDate.toString(), functionString, "/.+/", " ", "\t", "0", "007", "Corporate Spy"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.addLeadingZeroes(newTestData[i])).to.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value with an expected length of 5", function() {
			var results = [null, null, "false", "0true", "false", "0true", "00000", "00001", "3.141592654", "00NaN", "Infinity", "-Infinity", "00000", "0test", " trim\t", "[object Object]", "[object Object]", "00000", "00000", testDate.toString(), functionString, "0/.+/", "0000 ", "0000\t", "00000", "00007", "Corporate Spy"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.addLeadingZeroes(newTestData[i], 5)).to.equal(results[i]);
			}
		});

		it("should produce the correct result for each test value with an expected length of 20", function() {
			var functionStringPadded = functionString;

			for(var i = functionString.length; i < 20; i++) {
				functionStringPadded = "0" + functionStringPadded;
			}

			var results = [null, null, "000000000000000false", "0000000000000000true", "000000000000000false", "0000000000000000true", "00000000000000000000", "00000000000000000001", "0000000003.141592654", "00000000000000000NaN", "000000000000Infinity", "00000000000-Infinity", "00000000000000000000", "0000000000000000test", "00000000000000 trim\t", "00000[object Object]", "00000[object Object]", "00000000000000000000", "00000000000000000000", testDate.toString(), functionStringPadded, "0000000000000000/.+/", "0000000000000000000 ", "0000000000000000000\t", "00000000000000000000", "00000000000000000007", "0000000Corporate Spy"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.addLeadingZeroes(newTestData[i], 20)).to.equal(results[i]);
			}
		});
	});

	describe("toString", function() {
		var func = function() { console.log("All this talk of tea is getting me thirsty, shall I pop the kettle on?"); };

		var newTestData = testData.concat(new Error("There are tales of pots."), utilities.createError("A watched pot never boils.", 69), func);

		it("should be a function", function() {
			expect(utilities.toString instanceof Function).to.equal(true);
		});

		it("should produce the correct result for each test value", function() {
			var results = ["undefined", "null", "false", "true", "false", "true", "0", "1", "3.141592654", "NaN", "Infinity", "-Infinity", "", "test", " trim\t", "{}", "{\"nice\":\"meme\"}", "[]", "[0]", testDate.toString(), functionString, "/.+/", "{\"message\":\"There are tales of pots.\"}", "{\"message\":\"A watched pot never boils.\",\"status\":69}", func.toString()];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.toString(newTestData[i])).to.equal(results[i]);
			}
		});
	});

	describe("compareDates", function() {
		var newTestData = testData.concat("June 5, 2012", "June 18, 1987 3:30 PM", "2018-02-19T06:19:33Z", testDate.getTime(), testDate.toString(), testDate.getTime().toString());

		it("should be a function", function() {
			expect(utilities.compareDates instanceof Function).to.equal(true);
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
			expect(utilities.compareCasePercentage instanceof Function).to.equal(true);
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
			expect(utilities.reverseString instanceof Function).to.equal(true);
		});

		it("should produce the correct result for each test value", function() {
			var results = [null, null, null, null, null, null, null, null, null, null, null, null, "", "tset", "\tmirt ", null, null, null, null, null, null, null, ".elttil a kcab ti ekaT", "XotoX"];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.reverseString(newTestData[i])).to.equal(results[i]);
			}
		});
	});

	describe("createError", function() {
		it("should be a function", function() {
			expect(utilities.createError instanceof Function).to.equal(true);
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
			expect(utilities.clone instanceof Function).to.equal(true);
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

				expect(utilities.toString(testData[i])).to.equal(utilities.toString(clone));
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
			expect(utilities.toString(object)).to.equal(utilities.toString(clone));

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
			expect(utilities.toString(regExp)).to.equal(utilities.toString(clone));

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
			expect(utilities.toString(object)).to.equal(utilities.toString(clone));
		});
	});

	describe("merge", function() {
		it("should be a function", function() {
			expect(utilities.merge instanceof Function).to.equal(true);
		});
	});

	describe("calculateAge", function() {
		var newTestData = testData.concat(
			new Date().setFullYear(new Date().getFullYear() + 1),
			new Date().setFullYear(new Date().getFullYear() - 19)
		);

		it("should be a function", function() {
			expect(utilities.calculateAge instanceof Function).to.equal(true);
		});

		it("should produce the correct result for each test value", function() {
			var start = new Date().getFullYear() - 1970;
			var results = [-1, -1, -1, -1, -1, -1, start, start, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, 19];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.calculateAge(newTestData[i])).to.equal(results[i]);
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
			expect(utilities.prependSlash instanceof Function).to.equal(true);
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
			expect(utilities.appendSlash instanceof Function).to.equal(true);
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
			expect(utilities.joinPaths instanceof Function).to.equal(true);
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

		var results = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "nice=meme", "", "", "", "", "", "pickle=surprise!", "bargain=%3D%2FbOyz%3A%20%23%26ePi%24oDe%2C%20%2B1%3F", "%23you%2Frequire%2C%20%40dd%3A%2B!onal%26%3Dpylon%24%3F=420.69", "who=%7B%22dat%22%3A%22boy%22%7D", "nice=%5B%22meme%22%2C%22m\'lady%22%5D", "a=undefined&b=null&c=false&d=true&e=false&f=true&g=-1&h=0&i=1&j=3.141592654&k=Infinity&l=-Infinity&m=&n=test&o=%20trim%09&p=%7B%7D&q=%7B%22nice%22%3A%22meme%22%7D&r=%5B%5D&s=%5B0%5D&t=" + encodedTestDateString + "&u=" + encodeURIComponent(functionString) + "&v=%2F.%2B%2F"];

		it("should be a function", function() {
			expect(utilities.createQueryString instanceof Function).to.equal(true);
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
			expect(utilities.createRange instanceof Function).to.equal(true);
		});

		it("should produce the correct result for each test value", function() {
			var results = [[], [], [], [], [], [], [0], [0, 1], [0, 1, 2, 3], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [0, 1, 2, 3, 4], [0, 1, 2, 3, 4, 5, 6]];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.toString(utilities.createRange(newTestData[i]))).to.equal(utilities.toString(results[i]));
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
					expect(utilities.toString(utilities.createRange(newTestData[i], newTestData[j]))).to.equal(utilities.toString(results[i][j]));
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
			expect(utilities.futureMonths instanceof Function).to.equal(true);
		});

		it("should produce the correct result for each test value with no prepended zeroes", function() {
			var results = [null, null, null, null, null, null, allMonths, allMonths, null, null, null, null, null, null, null, null, null, null, null, allMonths.slice(testDate.getMonth(), 12), null, null, allMonths, allMonths];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.toString(utilities.futureMonths(newTestData[i], false))).to.equal(utilities.toString(results[i]));
			}
		});

		it("should produce the correct result for each test value with prepended zeroes", function() {
			var results = [null, null, null, null, null, null, allMonthsPadded, allMonthsPadded, null, null, null, null, null, null, null, null, null, null, null, allMonthsPadded.slice(testDate.getMonth(), 12), null, null, allMonthsPadded, allMonthsPadded];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.toString(utilities.futureMonths(newTestData[i], true))).to.equal(utilities.toString(results[i]));
			}
		});
	});

	describe("visibleElements", function() {
		var newTestData = testData.concat(
			{ visible: true },
			{ hidden: false }
		);

		newTestData.push(
			testData.concat(
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
			)
		);

		it("should be a function", function() {
			expect(utilities.visibleElements instanceof Function).to.equal(true);
		});

		it("should produce the correct result for each test value", function() {
			var results = [
				[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],
				[new Boolean(false), new Boolean(true), { }, { nice: "meme" }, [], [0], testDate, new RegExp(".+"), { visible: "nope" }, { visible: true }, { visible: function() { return true; } }, { hidden: "avi" }, { hidden: false }, { hidden: function() { return false; } }]
			];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.toString(utilities.visibleElements(newTestData[i]))).to.equal(utilities.toString(results[i]));
			}
		});
	});

	describe("hiddenElements", function() {
		var newTestData = testData.concat(
			{ visible: true },
			{ hidden: false }
		);

		newTestData.push(
			testData.concat(
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
			)
		);

		it("should be a function", function() {
			expect(utilities.hiddenElements instanceof Function).to.equal(true);
		});

		it("should produce the correct result for each test value", function() {
			var results = [
				[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [0], [], [], [], [], [],
				[undefined, null, false, true, 0, 1, 3.141592654, NaN, Infinity, -Infinity, "", "test", " trim\t", function() { }, { visible: false }, { visible: function() { return false; } }, { hidden: true }, { hidden: function() { return true; } }]
			];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.toString(utilities.hiddenElements(newTestData[i]))).to.equal(utilities.toString(results[i]));
			}
		});
	});

	describe("enabledElements", function() {
		var newTestData = testData.concat(
			{ enabled: true },
			{ disabled: false }
		);

		newTestData.push(
			testData.concat(
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
			)
		);

		it("should be a function", function() {
			expect(utilities.enabledElements instanceof Function).to.equal(true);
		});

		it("should produce the correct result for each test value", function() {
			var results = [
				[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],
				[new Boolean(false), new Boolean(true), { }, { nice: "meme" }, [], [0], testDate, new RegExp(".+"), { enabled: "door" }, { enabled: true }, { enabled: function() { return true; } }, { disabled: "stuck" }, { disabled: false }, { disabled: function() { return false; } }]
			];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.toString(utilities.enabledElements(newTestData[i]))).to.equal(utilities.toString(results[i]));
			}
		});
	});

	describe("disabledElements", function() {
		var newTestData = testData.concat(
			{ enabled: true },
			{ disabled: false }
		);

		newTestData.push(
			testData.concat(
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
			)
		);

		it("should be a function", function() {
			expect(utilities.disabledElements instanceof Function).to.equal(true);
		});

		it("should produce the correct result for each test value", function() {
			var results = [
				[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [0], [], [], [], [], [],
				[undefined, null, false, true, 0, 1, 3.141592654, NaN, Infinity, -Infinity, "", "test", " trim\t", function() { }, { enabled: false }, { enabled: function() { return false; } }, { disabled: true }, { disabled: function() { return true; } }]
			];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.toString(utilities.disabledElements(newTestData[i]))).to.equal(utilities.toString(results[i]));
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
			{ value: [{ function: function() { } }], attribute: "function" },
			{ value: [{ regExp: new RegExp(".+") }], attribute: "regExp" },
			{ value: [{ da: "wae", ugandan: "knuckles" }, { da: "meme", weed: 420 }, { vanilla: "Moonlight" }, 69], attribute: "da" }
		];

		it("should be a function", function() {
			expect(utilities.elementsWithAttribute instanceof Function).to.equal(true);
		});

		it("should correctly handle invalid arguments", function() {
			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.toString(utilities.elementsWithAttribute(newTestData[i]))).to.equal("[]");

				for(var j = 0; j < newTestData.length; j++) {
					expect(utilities.toString(utilities.elementsWithAttribute(newTestData[i], newTestData[j]))).to.equal("[]");

					for(var k = 0; k < newTestData.length; k++) {
						expect(utilities.toString(utilities.elementsWithAttribute(newTestData[i], newTestData[j], newTestData[k]))).to.equal("[]");
					}
				}
			}
		});

		it("should produce the correct result for each test value", function() {
			var results = [
				[], [], [], [], [{ false: false }], [{ true: true }], [{ falseBooleanObject: new Boolean(false) }], [{ trueBooleanObject: new Boolean(true) }], [{ NaN: NaN }], [{ Infinity: Infinity }], [{ NegativeInfinity: -Infinity }], [{ zero: 0 }], [{ one: 1 }], [{ pi: 3.141592654 }], [{ emptyString: "" }], [{ space: " " }], [{ tab: "\t" }], [{ emptyObject: { } }], [{ emptyArray: [] }], [{ zeroArray: [0] }], [{ date: testDate }], [{ function: function() { } }], [{ regExp: new RegExp(".+") }], [{ da: "wae", ugandan: "knuckles" }, { da: "meme", weed: 420 }]
			];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.toString(utilities.elementsWithAttribute(newTestData[i].value, newTestData[i].attribute))).to.equal(utilities.toString(results[i]));
			}

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.toString(utilities.elementsWithAttribute(newTestData[i].value, newTestData[i].attribute, true))).to.equal(utilities.toString(results[i]));
			}
		});

		it("should produce the correct result for each test value with has attribute set to false", function() {
			var results = [
				[], [{ }], [{ }], [{ null: null }], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [{ vanilla: "Moonlight" }]
			];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.toString(utilities.elementsWithAttribute(newTestData[i].value, newTestData[i].attribute, false))).to.equal(utilities.toString(results[i]));
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
			expect(utilities.elementsWithoutAttribute instanceof Function).to.equal(true);
		});

		it("should correctly handle invalid arguments", function() {
			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.toString(utilities.elementsWithoutAttribute(newTestData[i]))).to.equal("[]");

				for(var j = 0; j < newTestData.length; j++) {
					expect(utilities.toString(utilities.elementsWithoutAttribute(newTestData[i], newTestData[j]))).to.equal("[]");
				}
			}
		});

		it("should produce the correct result for each test value", function() {
			var results = [
				[], [{ }], [{ }], [{ null: null }], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [{ vanilla: "Moonlight" }]
			];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.toString(utilities.elementsWithoutAttribute(newTestData[i].value, newTestData[i].attribute))).to.equal(utilities.toString(results[i]));
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
			expect(utilities.matchAttribute instanceof Function).to.equal(true);
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
		it("should be a function", function() {
			expect(utilities.generateVersions instanceof Function).to.equal(true);
		});
	});

	describe("parseVersion", function() {
		var newTestData = testData.concat("420", "007", "2.0", "3.1.0.0", "04.2.00.0", "can't make it", "-3 -9", "00 6 04 00800 0");

		it("should be a function", function() {
			expect(utilities.parseVersion instanceof Function).to.equal(true);
		});

		it("should produce the correct result for each test value", function() {
			var results = [
				null, null, null, null, null, null, ["0"], ["1"], ["3", "141592654"], null, null, null, null, ["test"], ["trim"], null, null, null, null, null, null, null, ["420"], ["7"], ["2", "0"], ["3", "1", "0", "0"], ["4", "2", "0", "0"], ["can't", "make", "it"], null, ["0", "6", "4", "800", "0"]
			];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.toString(utilities.parseVersion(newTestData[i]))).to.equal(utilities.toString(results[i]));
			}

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.toString(utilities.parseVersion(newTestData[i], false))).to.equal(utilities.toString(results[i]));
			}
		});

		it("should produce the correct result for each test value with trim trailing zeroes enabled", function() {
			var results = [
				null, null, null, null, null, null, ["0"], ["1"], ["3", "141592654"], null, null, null, null, ["test"], ["trim"], null, null, null, null, null, null, null, ["420"], ["7"], ["2"], ["3", "1"], ["4", "2"], ["can't", "make", "it"], null, ["0", "6", "4", "800"]
			];

			for(var i = 0; i < newTestData.length; i++) {
				expect(utilities.toString(utilities.parseVersion(newTestData[i], true))).to.equal(utilities.toString(results[i]));
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
			expect(utilities.compareVersions instanceof Function).to.equal(true);
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
			expect(utilities.hasPostalCodeValidator instanceof Function).to.equal(true);
		});
	});

	describe("validatePostalCode", function() {
		it("should be a function", function() {
			expect(utilities.validatePostalCode instanceof Function).to.equal(true);
		});
	});
});