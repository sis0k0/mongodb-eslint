import { TSESTree } from "@typescript-eslint/experimental-utils";
import { createESLintRule } from "../utils";

export type Options = [];

export type MessageIds = "noFindOneWithoutQueryFailure";

export default createESLintRule<Options, MessageIds>({
    name: "no-find-one-without-query",
    meta: {
        type: "suggestion",
        docs: {
            category: "Best Practices",
            description: "Discourage the use of findOne() without a query document.",
            recommended: "warn",
        },
        messages: {
            noFindOneWithoutQueryFailure: "Using findOne() without a query document is discouraged."
        },
        schema: [{}],
        fixable: "code", 
    },
    defaultOptions: [],
    create(context) {
        return {
            "CallExpression[callee.property.name = findOne]": (node: TSESTree.CallExpression) => {
                if (!node.arguments.length) {
                    context.report({
                        node,
                        messageId: "noFindOneWithoutQueryFailure"
                    });
                }
            }
        }
    }
});
