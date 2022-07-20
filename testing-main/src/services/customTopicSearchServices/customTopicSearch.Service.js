import { client, index } from "../../config/elasticSearchConnection.js";
import util from "util";

function searchCustomTopicInTitleAndMaintext(topic, offset) {
    let dateRange = {
        date_download: {
            gte: topic.filters.startdate,
            lte: topic.filters.enddate,
        },
    };

    let filterObj = [{ range: dateRange }];

    if (topic.filters.language && topic.filters.language !== "none") {
        filterObj.push({
            term: {
                language: topic.filters.language,
            },
        });
    }

    if (
        topic.selection.limit_domains_results &&
        topic.selection.limit_domains_results.length > 0 &&
        topic.selection.limit_domains_results !== undefined
    ) {
        // console.log(topic.selection?.limit_domains_results.length);
        filterObj.push({
            terms: {
                source_domain: topic.selection.limit_domains_results,
            },
        });
    }

    let should = [];

    if (
        topic.selection.must_also_keywords &&
        topic.selection.must_also_keywords.length > 0 &&
        topic.selection.must_also_keywords !== undefined
    ) {
        for (let i = 0; i <= topic.selection.must_also_keywords.length; i++) {
            if (topic.selection.must_also_keywords[i] !== undefined) {
                should.push({
                    multi_match: {
                        query: topic.selection.must_also_keywords[i],
                        fields: ["title", "maintext"],
                    },
                });
            }
        }
    }

    if (
        topic.selection.any_keywords &&
        topic.selection.any_keywords.length > 0 &&
        topic.selection.any_keywords !== undefined
    ) {
        for (let i = 0; i <= topic.selection.any_keywords.length; i++) {
            if (topic.selection.any_keywords[i] !== undefined) {
                should.push({
                    multi_match: {
                        query: topic.selection.any_keywords[i],
                        fields: ["title", "maintext"],
                    },
                });
            }
        }
    }

    let must_not = undefined;

    if (
        topic.selection.must_not_contains_keywords &&
        topic.selection.must_not_contains_keywords.length > 0 &&
        topic.selection.must_not_contains_keywords !== undefined
    ) {
        must_not = [];
        for (
            let i = 0;
            i <= topic.selection.must_not_contains_keywords.length;
            i++
        ) {
            if (topic.selection.must_not_contains_keywords[i] !== undefined) {
                must_not.push({
                    match: {
                        title: topic.selection.must_not_contains_keywords[i],
                    },
                });
            }
        }
    }

    if (
        topic.selection.exclude_domains &&
        topic.selection.exclude_domains.length > 0 &&
        topic.selection.exclude_domains !== undefined
    ) {
        for (let i = 0; i <= topic.selection.exclude_domains.length; i++) {
            if (topic.selection.exclude_domains[i] !== undefined) {
                must_not.push({
                    term: {
                        title: topic.selection.exclude_domains[i],
                    },
                });
            }
        }
    }

    let body = {
        size: 8,
        from: offset,
        query: {
            bool: {
                should,
                must_not,
                filter: filterObj,
            },
        },
    };
    console.log(util.inspect(body, { showHidden: false, depth: null })); // body ends
    // console.log(client.search({ index, body }))
    return body;
}

function searchCustomTopicInTitle(topic, offset) {
    let dateRange = {
        date_download: {
            gte: topic.filters.startdate,
            lte: topic.filters.enddate,
        },
    };

    let filterObj = [{ range: dateRange }];

    if (topic.filters.language && topic.filters.language !== "none") {
        filterObj.push({
            term: {
                language: topic.filters.language,
            },
        });
    }

    if (
        topic.selection.limit_domains_results &&
        topic.selection.limit_domains_results.length > 0 &&
        topic.selection.limit_domains_results !== undefined
    ) {
        console.log(topic.selection.limit_domains_results.length);
        filterObj.push({
            terms: {
                source_domain: topic.selection.limit_domains_results,
            },
        });
    }

    let must = undefined;

    if (
        topic.selection.any_keywords &&
        topic.selection.any_keywords.length > 0 &&
        topic.selection.any_keywords !== undefined
    ) {
        must = [];
        must.push({
            terms: {
                title: topic.selection.any_keywords,
            },
        });
    }

    let should = undefined;

    if (
        topic.selection.must_also_keywords &&
        topic.selection.must_also_keywords.length > 0 &&
        topic.selection.must_also_keywords !== undefined
    ) {
        should = [];
        for (let i = 0; i <= topic.selection.must_also_keywords.length; i++) {
            if (topic.selection.must_also_keywords[i] !== undefined) {
                should.push({
                    match: {
                        title: topic.selection.must_also_keywords[i],
                    },
                });
            }
        }
    }

    let must_not = undefined;

    if (
        topic.selection.must_not_contains_keywords &&
        topic.selection.must_not_contains_keywords.length > 0 &&
        topic.selection.must_not_contains_keywords !== undefined
    ) {
        must_not = [];
        for (
            let i = 0;
            i <= topic.selection.must_not_contains_keywords.length;
            i++
        ) {
            if (topic.selection.must_not_contains_keywords[i] !== undefined) {
                must_not.push({
                    match: {
                        title: topic.selection.must_not_contains_keywords[i],
                    },
                });
            }
        }
    }

    if (
        topic.selection.exclude_domains &&
        topic.selection.exclude_domains.length > 0 &&
        topic.selection.exclude_domains !== undefined
    ) {
        for (let i = 0; i <= topic.selection.exclude_domains.length; i++) {
            if (topic.selection.exclude_domains[i] !== undefined) {
                must_not.push({
                    term: {
                        title: topic.selection.exclude_domains[i],
                    },
                });
            }
        }
    }

    let body = {
        size: 8,
        from: offset,
        query: {
            bool: {
                must,
                should,
                must_not,
                filter: filterObj,
            },
        },
    };
    console.log(util.inspect(body, { showHidden: false, depth: null })); // body ends
    // console.log(client.search({ index, body }))
    return body;
}


const getByCustomTopics = (topic, offset)=> {
    try {
        if (
            topic.selection.match_type !== undefined &&
            topic.selection.match_type === "title"
        ) {
            let body = searchCustomTopicInTitle(topic, offset);
            // console.log(body)
            // console.log(util.inspect(body, { showHidden: false, depth: null })); // body ends

            return client.search({ index, body });
        } else {
            let body = searchCustomTopicInTitleAndMaintext(topic, offset);
            // console.log(body)
            // console.log(util.inspect(body, { showHidden: false, depth: null })); // body ends

            return client.search({ index, body });
        }
    } catch (err) {
        console.log(err);
    }
};

export {
    getByCustomTopics,
};