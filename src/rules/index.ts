import noFindOneWithoutQuery from "./no-find-one-without-query";
import versionedApi from "./versioned-api";
import writeConcernMajority from "./write-concern-majority";

export const rules = {
    "no-find-one-without-query": noFindOneWithoutQuery,
    "write-concern-majority": writeConcernMajority,
    "versioned-api": versionedApi,
};

export const recommendedRules = {
    "mongodb-node/no-find-one-without-query": "warn",
    "mongodb-node/write-concern-majority": "warn",
    "mongodb-node/versioned-api": "warn",
};
