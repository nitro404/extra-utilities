global.validator = undefined;
global.changeCase = undefined;

var utilities = require("../dist/extra-utilities.js");
var chai = require("chai");
var expect = chai.expect;

describe("Utilities", function() {
	describe("isValid", function() {
		it("should be a function", function() {
			expect(utilities.isValid instanceof Function).to.equal(true);
		});
	});

	describe("isInvalid", function() {
		it("should be a function", function() {
			expect(utilities.isInvalid instanceof Function).to.equal(true);
		});
	});

	describe("isBoolean", function() {
		it("should be a function", function() {
			expect(utilities.isBoolean instanceof Function).to.equal(true);
		});
	});

	describe("isValidNumber", function() {
		it("should be a function", function() {
			expect(utilities.isValidNumber instanceof Function).to.equal(true);
		});
	});

	describe("isInvalidNumber", function() {
		it("should be a function", function() {
			expect(utilities.isInvalidNumber instanceof Function).to.equal(true);
		});
	});

	describe("isEmptyString", function() {
		it("should be a function", function() {
			expect(utilities.isEmptyString instanceof Function).to.equal(true);
		});
	});

	describe("isNonEmptyString", function() {
		it("should be a function", function() {
			expect(utilities.isNonEmptyString instanceof Function).to.equal(true);
		});
	});

	describe("isObject", function() {
		it("should be a function", function() {
			expect(utilities.isObject instanceof Function).to.equal(true);
		});
	});

	describe("isObjectStrict", function() {
		it("should be a function", function() {
			expect(utilities.isObjectStrict instanceof Function).to.equal(true);
		});
	});

	describe("isEmptyObject", function() {
		it("should be a function", function() {
			expect(utilities.isEmptyObject instanceof Function).to.equal(true);
		});
	});

	describe("isNonEmptyObject", function() {
		it("should be a function", function() {
			expect(utilities.isNonEmptyObject instanceof Function).to.equal(true);
		});
	});

	describe("isEmptyArray", function() {
		it("should be a function", function() {
			expect(utilities.isEmptyArray instanceof Function).to.equal(true);
		});
	});

	describe("isNonEmptyArray", function() {
		it("should be a function", function() {
			expect(utilities.isNonEmptyArray instanceof Function).to.equal(true);
		});
	});

	describe("isDate", function() {
		it("should be a function", function() {
			expect(utilities.isDate instanceof Function).to.equal(true);
		});
	});

	describe("isRegularExpression", function() {
		it("should be a function", function() {
			expect(utilities.isRegularExpression instanceof Function).to.equal(true);
		});
	});

	describe("isFunction", function() {
		it("should be a function", function() {
			expect(utilities.isFunction instanceof Function).to.equal(true);
		});
	});

	describe("isComment", function() {
		it("should be a function", function() {
			expect(utilities.isComment instanceof Function).to.equal(true);
		});
	});

	describe("isVisible", function() {
		it("should be a function", function() {
			expect(utilities.isVisible instanceof Function).to.equal(true);
		});
	});

	describe("isHidden", function() {
		it("should be a function", function() {
			expect(utilities.isHidden instanceof Function).to.equal(true);
		});
	});

	describe("isEnabled", function() {
		it("should be a function", function() {
			expect(utilities.isEnabled instanceof Function).to.equal(true);
		});
	});

	describe("isDisabled", function() {
		it("should be a function", function() {
			expect(utilities.isDisabled instanceof Function).to.equal(true);
		});
	});

	describe("parseBoolean", function() {
		it("should be a function", function() {
			expect(utilities.parseBoolean instanceof Function).to.equal(true);
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