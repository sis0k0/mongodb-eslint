import noFindOneWithoutQuery from "./no-find-one-without-query";

export const rules = {
    "no-find-one-without-query": noFindOneWithoutQuery,
};

export const recommendedRules = {
    "eslint-plugin-mongodb/no-find-one-without-query": "warn",
};
