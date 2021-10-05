import { rules, recommendedRules } from "./rules";

module.exports = {
    rules,
    configs: {
        recommended: {
            plugins: ["mongodb-node"],
            rules: recommendedRules,
        },
    },
};
