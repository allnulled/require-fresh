const { assert, expect } = require("chai");
const fs = require("fs");

function changeContent(n, newNumber) {
	require("fs").writeFileSync(`${__dirname}/sample/module-${n}.js`, `module.exports = ${newNumber};`, `utf8`);
};

describe("Require-fresh API", function() {

	var requireFresh = undefined;

	const resetFiles = function(done) {
		changeContent(2, 200);
		changeContent(3, 400);
		done();
	}

	// before(resetFiles);
	beforeEach(resetFiles);
	after(resetFiles);

	it("is a function", function(done) {
		this.timeout(6000);
		expect(typeof requireFresh).to.equal("undefined");
		requireFresh = require(__dirname + "/../src/require-fresh.js");
		expect(typeof requireFresh).to.equal("function");
		done();
	});

	it("has 'search' and 'purge' methods", function(done) {
		this.timeout(6000);
		expect("search" in requireFresh).to.equal(true);
		expect(typeof requireFresh.search).to.equal("function");
		expect("purge" in requireFresh).to.equal(true);
		expect(typeof requireFresh.purge).to.equal("function");
		done();
	});

	it("clears the cache of the module imported", function(done) {
		this.timeout(6000);
		const v1 = requireFresh(`${__dirname}/sample/module-2.js`);
		const v2 = requireFresh(`${__dirname}/sample/module-3.js`);
		expect(v1).to.equal(200);
		expect(v2).to.equal(400);
		changeContent(2, 300);
		changeContent(3, 500);
		const v3 = require(`${__dirname}/sample/module-2.js`);
		const v4 = require(`${__dirname}/sample/module-3.js`);
		const v5 = fs.readFileSync(`${__dirname}/sample/module-2.js`).toString().replace("module.exports = ", "");
		const v6 = fs.readFileSync(`${__dirname}/sample/module-3.js`).toString().replace("module.exports = ", "");
		const v7 = requireFresh(`${__dirname}/sample/module-2.js`);
		const v8 = requireFresh(`${__dirname}/sample/module-3.js`);
		expect(v3).to.equal(200);
		expect(v4).to.equal(400);
		expect(v3).to.equal(200);
		expect(v4).to.equal(400);
		expect(v5).to.equal("300;");
		expect(v6).to.equal("500;");
		expect(v7).to.equal(300);
		expect(v8).to.equal(500);
		done();
	});

});
