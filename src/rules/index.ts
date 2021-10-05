import noFindOneWithoutQuery from "./no-find-one-without-query";

export const rules = {
    "no-find-one-without-query": noFindOneWithoutQuery,
};

export const recommendedRules = {
    "mongodb-node/no-find-one-without-query": "warn",
};
