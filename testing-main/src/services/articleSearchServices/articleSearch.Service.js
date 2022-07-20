import { client, index } from "../../config/elasticSearchConnection.js";

const getCategory = () => {
  return client.search({
    index: index,
    body: {
      size: 0,
      aggs: {
        categories: {
          terms: {
            field: "category",
          },
        },

        languages: {
          terms: {
            field: "language",
          },
        },
      },
    },
  });
};

const getAllWithDateFacet = (offset) => {
  return client.search({
    index: index,
    body: {
      size: 20,
      from: offset,
      query: {
        bool: {
          filter: [
            {
              range: {
                date_download: {
                  gte: "2021-11-02",
                  lt: "2021-11-03",
                },
              },
            },
          ],
        },
      },
    },
  });
};

const searchBy_Language = (language, offset) => {
  if (language) {
    let body = {
      size: 20,
      from: offset,
      query: {
        bool: {
          filter: {
            term: {
              language: language,
            },
          },
        },
      },
    };
    return client.search({ index, body });
  }
};

const searchBy_Category = (category, offset) => {
  if (category) {
    let body = {
      size: 20,
      from: offset,
      query: {
        bool: {
          filter: {
            term: {
              category: category,
            },
          },
        },
      },
    };
    return client.search({ index, body });
  }
};

const searchBy_Category_Language = (category, language, offset) => {
  if (category) {
    let body = {
      size: 20,
      from: offset,
      query: {
        bool: {
          filter: [
            {
              term: {
                category: category,
              },
            },
            {
              term: {
                language: language,
              },
            },
          ],
        },
      },
    };
    return client.search({ index, body });
  }
};

const searchBy_Date = (startDate, endDate, offset) => {
  let dateRange = {
    date_download: {
      gte: startDate,
      lt: endDate,
    },
  };

  let filterObj = [{ range: dateRange }];

  let body = {
    size: 20,
    from: offset,
    query: {
      bool: {
        filter: filterObj,
      },
    },
  };
  return client.search({ index, body });
};

const searchBy_Date_language = (startDate, endDate, language, offset) => {
  let dateRange = {
    date_download: {
      gte: startDate,
      lt: endDate,
    },
  };

  let filterObj = [{ range: dateRange }];

  if (language) {
    filterObj.push({
      term: {
        language: language,
      },
    });
  }

  let body = {
    size: 20,
    from: offset,
    query: {
      bool: {
        filter: filterObj,
      },
    },
  };
  return client.search({ index, body });
};

const searchBy_Date_Category = (startDate, endDate, category, offset) => {
  let dateRange = {
    date_download: {
      gte: startDate,
      lt: endDate,
    },
  };

  let filterObj = [{ range: dateRange }];

  if (category) {
    filterObj.push({
      term: {
        category: category,
      },
    });
  }

  let body = {
    size: 20,
    from: offset,
    query: {
      bool: {
        filter: filterObj,
      },
    },
  };
  return client.search({ index, body });
};

const searchBy_Date_Category_language = (
  startDate,
  endDate,
  category,
  language,
  offset
) => {
  let dateRange = {
    date_download: {
      gte: startDate,
      lt: endDate,
    },
  };

  let filterObj = [{ range: dateRange }];

  if (category) {
    filterObj.push({
      term: {
        category: category,
      },
    });
  }

  if (language) {
    filterObj.push({
      term: {
        language: language,
      },
    });
  }

  let body = {
    size: 20,
    from: offset,
    query: {
      bool: {
        filter: filterObj,
      },
    },
  };
  return client.search({ index, body });
};

const searchBy_SearchTerm = (searchTerm, offset) => {
  let body = {
    size: 20,
    from: offset,
    query: {
      bool: {
        must: [
          {
            multi_match: {
              query: searchTerm,
              fields: ["title", "maintext"],
              fuzziness: "auto",
            },
          },
        ],
      },
    },
  };
  return client.search({ index, body });
};

const searchBy_searchTerm_Language = (searchTerm, language, offset) => {
  let body = {
    size: 20,
    from: offset,
    query: {
      bool: {
        must: [
          {
            multi_match: {
              query: searchTerm,
              fields: ["title", "maintext"],
              fuzziness: "auto",
            },
          },
        ],
        filter: {
          term: {
            language: language,
          },
        },
      },
    },
  };
  return client.search({ index, body });
};

const searchBy_SearchTerm_Category = (searchTerm, category, offset) => {
  
  let body = {
    size: 20,
    from: offset,
    query: {
      bool: {
        must: [
          {
            multi_match: {
              query: searchTerm,
              fields: ["title", "maintext"],
              fuzziness: "auto",
            },
          },
        ],
        filter: {
          term: {
            category: category,
          },
        },
      },
    },
  };
  return client.search({ index, body });
};

const searchBy_SearchTerm_Category_language = (
  searchTerm,
  category,
  language,
  offset
) => {
  let body = {
    size: 20,
    from: offset,
    query: {
      bool: {
        must: [
          {
            multi_match: {
              query: searchTerm,
              fields: ["title", "maintext"],
              fuzziness: "auto",
            },
          },
        ],
        filter: [
          {
            term: {
              category: category,
            },
          },
          {
            term: {
              language: language,
            },
          },
        ],
      },
    },
  };
  return client.search({ index, body });
};

const searchBy_SearchTerm_Date = (searchTerm, startDate, endDate, offset) => {
  let dateRange = {
    date_download: {
      gte: startDate,
      lt: endDate,
    },
  };

  let filterObj = { range: dateRange };

  let body = {
    size: 20,
    from: offset,
    query: {
      bool: {
        must: [
          {
            multi_match: {
              query: searchTerm,
              fields: ["title", "maintext"],
              fuzziness: "auto",
            },
          },
        ],
        filter: filterObj,
      },
    },
  };
  return client.search({ index, body });
};

const searchBy_searchTerm_Date_Language = (
  searchTerm,
  startDate,
  endDate,
  language,
  offset
) => {
  let dateRange = {
    date_download: {
      gte: startDate,
      lt: endDate,
    },
  };

  let filterObj = [{ range: dateRange }];

  if (language) {
    filterObj.push({
      term: {
        language: language,
      },
    });
  }

  let body = {
    size: 20,
    from: offset,
    query: {
      bool: {
        must: [
          {
            multi_match: {
              query: searchTerm,
              fields: ["title", "maintext"],
              fuzziness: "auto",
            },
          },
        ],
        filter: filterObj,
      },
    },
  };
  return client.search({ index, body });
};

const searchBy_searchTerm_Date_Category = (
  searchTerm,
  endDate,
  startDate,
  category,
  offset
) => {
  let dateRange = {
    date_download: {
      gte: startDate,
      lt: endDate,
    },
  };

  let filterObj = [{ range: dateRange }];

  if (category) {
    filterObj.push({
      term: {
        category: category,
      },
    });
  }

  let body = {
    size: 20,
    from: offset,
    query: {
      bool: {
        must: [
          {
            multi_match: {
              query: searchTerm,
              fields: ["title", "maintext"],
              fuzziness: "auto",
            },
          },
        ],
        filter: filterObj,
      },
    },
  };
  return client.search({ index, body });
};

const searchBy_searchTerm_Date_Category_Language = (
  searchTerm,
  category,
  language,
  endDate,
  startDate,
  offset
) => {
  let dateRange = {
    date_download: {
      gte: startDate,
      lt: endDate,
    },
  };

  let filterObj = [{ range: dateRange }];

  if (category) {
    filterObj.push({
      term: {
        category: category,
      },
    });
  }

  if (language) {
    filterObj.push({
      term: {
        language: language,
      },
    });
  }

  let body = {
    size: 20,
    from: offset,
    query: {
      bool: {
        must: [
          {
            multi_match: {
              query: searchTerm,
              fields: ["title", "maintext"],
              fuzziness: "auto",
            },
          },
        ],
        filter: filterObj,
      },
    },
  };
  return client.search({ index, body });
};

export {
  getCategory,
  getAllWithDateFacet,
  searchBy_Language,
  searchBy_Category,
  searchBy_Category_Language,
  searchBy_Date,
  searchBy_Date_language,
  searchBy_Date_Category,
  searchBy_Date_Category_language,
  searchBy_SearchTerm,
  searchBy_searchTerm_Language,
  searchBy_SearchTerm_Category,
  searchBy_SearchTerm_Category_language,
  searchBy_SearchTerm_Date,
  searchBy_searchTerm_Date_Language,
  searchBy_searchTerm_Date_Category,
  searchBy_searchTerm_Date_Category_Language,
};
