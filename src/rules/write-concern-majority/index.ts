import { TSESTree } from "@typescript-eslint/experimental-utils";
import { RuleContext } from "@typescript-eslint/experimental-utils/dist/ts-eslint";
import { createESLintRule } from "../utils";

export type Options = [];

export type MessageIds = "writeConcernMajorityFailure";

export default createESLintRule<Options, MessageIds>({
    name: "write-concern-majority",
    meta: {
        type: "suggestion",
        docs: {
            category: "Best Practices",
            description: "Setting the write concern option to 'majority' is recommended.",
            recommended: "warn",
        },
        messages: {
            writeConcernMajorityFailure:
                "Setting the write concern option to 'majority' is recommended. See https://docs.mongodb.com/manual/reference/write-concern/#write-concern-specification",
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
                const writeConcern = properties?.find(
                    (option: TSESTree.Property) => (option.key as TSESTree.Identifier).name === "w"
                ) as TSESTree.Property;

                const writeConcernValue = (writeConcern?.value as TSESTree.Literal)?.value;
                if (!writeConcernValue) {
                    reportFailure(context, callee);
                    return;
                }

                if (writeConcernValue !== "majority") {
                    reportFailure(context, writeConcern);
                    return;
                }
            },
        };
    },
});

function reportFailure(context: RuleContext<any, []>, node: TSESTree.Node) {
    context.report({ node, messageId: "writeConcernMajorityFailure" });
}
