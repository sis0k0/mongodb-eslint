import rule from "../src/rules/versioned-api";
import { getInvalidTestFactory, RuleTester } from "./test-helper";

const ruleTester = new RuleTester({
    parserOptions: {
        sourceType: "module",
    },
    parser: "@typescript-eslint/parser",
});

const getInvalidTest = getInvalidTestFactory("versionedApiFailure");

ruleTester.run("versioned-api-failure", rule, {
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
    w: 1,
    otherOptions: {}
})
`,
            locations: [{ line: 2, column: 5 }],
        }),
    ],
    valid: [
        `new MongoClient(uri, {
            serverApi: {
                version: '1'
            }
        })`,
        `new MongoClient(uri, {
            serverApi: options
        })`,
        `new MongoClient(uri, options)`,
    ],
});
