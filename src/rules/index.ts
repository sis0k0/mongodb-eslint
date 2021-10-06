import noFindOneWithoutQuery from "./no-find-one-without-query";
import writeConcernMajority from "./write-concern-majority";

export const rules = {
    "no-find-one-without-query": noFindOneWithoutQuery,
    "write-concern-majority": writeConcernMajority,
};

export const recommendedRules = {
    "mongodb-node/no-find-one-without-query": "warn",
    "mongodb-node/write-concern-majority": "warn",
};
