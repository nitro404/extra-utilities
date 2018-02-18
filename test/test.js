global.validator = undefined;
global.changeCase = undefined;

var utilities = require("../dist/extra-utilities.js");
var chai = require("chai");
var expect = chai.expect;

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
	new Date(),
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

	describe("isRegularExpression", function() {
		it("should be a function", function() {
			expect(utilities.isRegularExpression instanceof Function).to.equal(true);
		});

		it("should produce the correct result for each test value", function() {
			var results = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true];

			for(var i = 0; i < testData.length; i++) {
				expect(utilities.isRegularExpression(testData[i])).to.equal(results[i]);
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
		it("should be a function", function() {
			expect(utilities.parseInteger instanceof Function).to.equal(true);
		});
	});

	describe("parseFloatingPointNumber", function() {
		it("should be a function", function() {
			expect(utilities.parseFloatingPointNumber instanceof Function).to.equal(true);
		});
	});

	describe("parseDate", function() {
		it("should be a function", function() {
			expect(utilities.parseDate instanceof Function).to.equal(true);
		});
	});

	describe("parseTime", function() {
		it("should be a function", function() {
			expect(utilities.parseTime instanceof Function).to.equal(true);
		});
	});

	describe("parsePostalCode", function() {
		it("should be a function", function() {
			expect(utilities.parsePostalCode instanceof Function).to.equal(true);
		});
	});

	describe("parseEmail", function() {
		it("should be a function", function() {
			expect(utilities.parseEmail instanceof Function).to.equal(true);
		});
	});

	describe("parseEmailDomain", function() {
		it("should be a function", function() {
			expect(utilities.parseEmailDomain instanceof Function).to.equal(true);
		});
	});

	describe("parseStringList", function() {
		it("should be a function", function() {
			expect(utilities.parseStringList instanceof Function).to.equal(true);
		});
	});

	describe("parseRegularExpression", function() {
		it("should be a function", function() {
			expect(utilities.parseRegularExpression instanceof Function).to.equal(true);
		});
	});

	describe("parseYouTubeLink", function() {
		it("should be a function", function() {
			expect(utilities.parseYouTubeLink instanceof Function).to.equal(true);
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
		it("should be a function", function() {
			expect(utilities.formatStringList instanceof Function).to.equal(true);
		});
	});

	describe("trimString", function() {
		it("should be a function", function() {
			expect(utilities.trimString instanceof Function).to.equal(true);
		});
	});

	describe("trimWhitespace", function() {
		it("should be a function", function() {
			expect(utilities.trimWhitespace instanceof Function).to.equal(true);
		});
	});

	describe("trimTrailingNewlines", function() {
		it("should be a function", function() {
			expect(utilities.trimTrailingNewlines instanceof Function).to.equal(true);
		});
	});

	describe("replaceNonBreakingSpaces", function() {
		it("should be a function", function() {
			expect(utilities.replaceNonBreakingSpaces instanceof Function).to.equal(true);
		});
	});

	describe("indentText", function() {
		it("should be a function", function() {
			expect(utilities.indentText instanceof Function).to.equal(true);
		});
	});

	describe("trimLeadingZeroes", function() {
		it("should be a function", function() {
			expect(utilities.trimLeadingZeroes instanceof Function).to.equal(true);
		});
	});

	describe("addLeadingZeroes", function() {
		it("should be a function", function() {
			expect(utilities.addLeadingZeroes instanceof Function).to.equal(true);
		});
	});

	describe("toString", function() {
		it("should be a function", function() {
			expect(utilities.toString instanceof Function).to.equal(true);
		});
	});

	describe("compareDates", function() {
		it("should be a function", function() {
			expect(utilities.compareDates instanceof Function).to.equal(true);
		});
	});

	describe("compareCasePercentage", function() {
		it("should be a function", function() {
			expect(utilities.compareCasePercentage instanceof Function).to.equal(true);
		});
	});

	describe("reverseString", function() {
		it("should be a function", function() {
			expect(utilities.reverseString instanceof Function).to.equal(true);
		});
	});

	describe("createError", function() {
		it("should be a function", function() {
			expect(utilities.createError instanceof Function).to.equal(true);
		});
	});

	describe("clone", function() {
		it("should be a function", function() {
			expect(utilities.clone instanceof Function).to.equal(true);
		});
	});

	describe("merge", function() {
		it("should be a function", function() {
			expect(utilities.merge instanceof Function).to.equal(true);
		});
	});

	describe("calculateAge", function() {
		it("should be a function", function() {
			expect(utilities.calculateAge instanceof Function).to.equal(true);
		});
	});

	describe("prependSlash", function() {
		it("should be a function", function() {
			expect(utilities.prependSlash instanceof Function).to.equal(true);
		});
	});

	describe("appendSlash", function() {
		it("should be a function", function() {
			expect(utilities.appendSlash instanceof Function).to.equal(true);
		});
	});

	describe("joinPaths", function() {
		it("should be a function", function() {
			expect(utilities.joinPaths instanceof Function).to.equal(true);
		});
	});

	describe("createQueryString", function() {
		it("should be a function", function() {
			expect(utilities.createQueryString instanceof Function).to.equal(true);
		});
	});

	describe("createRange", function() {
		it("should be a function", function() {
			expect(utilities.createRange instanceof Function).to.equal(true);
		});
	});

	describe("futureMonths", function() {
		it("should be a function", function() {
			expect(utilities.futureMonths instanceof Function).to.equal(true);
		});
	});

	describe("visibleElements", function() {
		it("should be a function", function() {
			expect(utilities.visibleElements instanceof Function).to.equal(true);
		});
	});

	describe("hiddenElements", function() {
		it("should be a function", function() {
			expect(utilities.hiddenElements instanceof Function).to.equal(true);
		});
	});

	describe("enabledElements", function() {
		it("should be a function", function() {
			expect(utilities.enabledElements instanceof Function).to.equal(true);
		});
	});

	describe("disabledElements", function() {
		it("should be a function", function() {
			expect(utilities.disabledElements instanceof Function).to.equal(true);
		});
	});

	describe("elementsWithAttribute", function() {
		it("should be a function", function() {
			expect(utilities.elementsWithAttribute instanceof Function).to.equal(true);
		});
	});

	describe("elementsWithoutAttribute", function() {
		it("should be a function", function() {
			expect(utilities.elementsWithoutAttribute instanceof Function).to.equal(true);
		});
	});

	describe("matchAttribute", function() {
		it("should be a function", function() {
			expect(utilities.matchAttribute instanceof Function).to.equal(true);
		});
	});

	describe("generateVersions", function() {
		it("should be a function", function() {
			expect(utilities.generateVersions instanceof Function).to.equal(true);
		});
	});

	describe("parseVersion", function() {
		it("should be a function", function() {
			expect(utilities.parseVersion instanceof Function).to.equal(true);
		});
	});

	describe("compareVersions", function() {
		it("should be a function", function() {
			expect(utilities.compareVersions instanceof Function).to.equal(true);
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