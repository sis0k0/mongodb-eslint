import { TSESTree } from "@typescript-eslint/experimental-utils";
import { RuleContext } from "@typescript-eslint/experimental-utils/dist/ts-eslint";
import { createESLintRule } from "../utils";

export type Options = [];

export type MessageIds = "versionedApiFailure";

export default createESLintRule<Options, MessageIds>({
    name: "versioned-api",
    meta: {
        type: "suggestion",
        docs: {
            category: "Best Practices",
            description: "Using the MongoDB Versioned API is recommended.",
            recommended: "warn",
        },
        messages: {
            versionedApiFailure:
                "Using the MongoDB Versioned API is recommended. See https://docs.mongodb.com/manual/reference/versioned-api/",
        },
        schema: [{}],
        fixable: "code",
    },
    defaultOptions: [],
    create(context) {
        return {
            "NewExpression[callee.name = MongoClient]": (node: TSESTree.NewExpression) => {
                const { arguments: args } = node;
                const { callee } = node;

                if (args.length < 2) {
                    reportFailure(context, callee);
                    return;
                }

                const mongoOptions = args[1];
                if (mongoOptions.type !== "ObjectExpression") {
                    return;
                }

                const properties = (args[1] as TSESTree.ObjectExpression)?.properties;
                const serverApi = properties?.find(
                    (option: TSESTree.Property) => (option.key as TSESTree.Identifier).name === "serverApi"
                ) as TSESTree.Property;

                if (!serverApi) {
                    reportFailure(context, callee);
                    return;
                }
            },
        };
    },
});

function reportFailure(context: RuleContext<any, []>, node: TSESTree.Node) {
    context.report({ node, messageId: "versionedApiFailure" });
}
