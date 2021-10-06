import rule from "../src/rules/write-concern-majority";
import { getInvalidTestFactory, RuleTester } from "./test-helper";

const ruleTester = new RuleTester({
    parserOptions: {
        sourceType: "module",
    },
    parser: "@typescript-eslint/parser",
});

const getInvalidTest = getInvalidTestFactory("writeConcernMajorityFailure");

ruleTester.run("write-concern-majority", rule, {
    invalid: [
        getInvalidTest({
            code: `
new MongoClient(uri)
`,
            locations: [{ line: 2, column: 5 }],
        }),
        getInvalidTest({
            code: `
new MongoClient(uri, {})
`,
            locations: [{ line: 2, column: 5 }],
        }),
        getInvalidTest({
            code: `
new MongoClient(uri, {
    w: 1
})
            `,
            locations: [{ line: 3, column: 5 }],
        }),
    ],
    valid: [
        `new MongoClient(uri, {
            w: "majority"
        })`,
        `new MongoClient(uri, options)`,
    ],
});
