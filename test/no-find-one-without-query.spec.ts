import rule from "../src/rules/no-find-one-without-query";
import { getInvalidTestFactory, RuleTester } from "./test-helper";

const ruleTester = new RuleTester({
    parserOptions: {
        sourceType: "module",
    },
    parser: "@typescript-eslint/parser",
});

const getInvalidTest = getInvalidTestFactory("noFindOneWithoutQueryFailure");

ruleTester.run("no-find-one-without-query", rule, {
    invalid: [
        getInvalidTest({
            code: `movies.findOne()`,
            locations: [{ line: 1, column: 1 }],
        }),
    ],
    valid: [
        `findOne()`,
        `movies.findOne({})`,
        `movies.findOne`,
        `movies.findOne({ title: "The Room" })`,
        `movies.findOne({ title: "The Room" }, { projection: { title: 1, imdb: 1 }})`,
    ],
});
