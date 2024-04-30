const {describe, it} = require("node:test");
const assert = require("node:assert");
const validator = require("../util/validate.js");

function createString(len, s = "x", joinC = " "){
	return (new Array(len))
		.fill(s)
		.join(joinC);
}

describe("Validator for the User name", ()=>{
	it("should not allow empty input", async (t)=>{
		await t.test("including null", ()=>{
			assert.throws(()=>validator.validateUserName(null));
		});
		
		await t.test("including undefined", ()=>{
			assert.throws(()=>validator.validateUserName(undefined));
		});

		await t.test("including empty strings", ()=>{
			assert.throws(()=>validator.validateUserName(""));
		});

		await t.test("including empty strings with whitespaces", ()=>{
			assert.throws(()=>validator.validateUserName("  		    		   "));
		});
	});

	it("should not be too long", async (t)=>{
		const MAX_LEN = 30;
		const expectedErr = new Error("User name is unrealistically long");
		await t.test("testing just over the limit", ()=>{
			const testName = createString(MAX_LEN + 1, "x", " ");
			assert.throws(()=>validator.validateUserName(testName), expectedErr);
		});

		await t.test("testing just under the limit", ()=>{
			const testName = createString(5, "Maxin", " ");
			assert.ok(()=>validator.validateUserName(testName));
		});

	});

	describe("Validator for the Email", ()=>{
		it("should not allow empty input", async (t)=>{
			await t.test("including null", ()=>{
				assert.throws(()=>validator.validateEmail(null));
			});
			
			await t.test("including undefined", ()=>{
				assert.throws(()=>validator.validateEmail(undefined));
			});
	
			await t.test("including empty strings", ()=>{
				assert.throws(()=>validator.validateEmail(""));
			});
	
			await t.test("including empty strings with whitespaces", ()=>{
				assert.throws(()=>validator.validateEmail("  		    		   "));
			});
		});
	
		it("should validate correct email format", async (t)=>{
			await t.test("valid email", ()=>{
				assert.doesNotThrow(()=>validator.validateEmail("example@example.com"));
			});
	
			await t.test("invalid email format", ()=>{
				assert.throws(()=>validator.validateEmail("example@example"), /Invalid email format/);
			});
		});
	});
});