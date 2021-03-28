import fetch from "isomorphic-unfetch";
import {
  addQFilters,
  composeQueryParams,
  fetchListWithQPs,
  prettyDate,
  transformListData,
} from "./helpers";

// reduce test noise for last test in suite throwing purposeful console error in api.js
global.console.error = jest.fn();

const mockData = [
  {
    bs_prop: "bsprop",
    created_at: "2020-09-03T14:04:35Z",
    full_name: "testname",
    html_url: "testurl",
    stargazers_count: 4,
    updated_at: "2020-09-03T14:04:35Z",
  },
];

const mockTransformedData = [
  {
    created: "September 3, 2020",
    link: "testurl",
    name: "testname",
    stars: 4,
    updated: "September 3, 2020",
  },
];

const mockFilterData = {
  filters: { key: "val" },
  order: "asc",
  orderBy: "stars",
  searchPhrase: "test",
};

jest.mock("isomorphic-unfetch");

describe("addQFilters", () => {
  it("adds filters to query param", () => {
    const q = "test";
    const filters = { key: "val" };
    expect(addQFilters(q, filters)).toBe("test+key:val");
  });
});

describe("composeQueryParams", () => {
  it("does nothing if no searchphrase provided", () => {
    const queries = composeQueryParams({});
    expect(queries).toEqual({});
  });
  it("adds filters and order params to query obj when meaningful vals provided", () => {
    const queries = composeQueryParams(mockFilterData);
    expect(queries).toEqual({
      order: "asc",
      q: "test+key:val",
      sort: "stars",
    });
  });
});

describe("prettyDate", () => {
  it("handles an invalid date", () => {
    expect(prettyDate("test")).toBe("test");
  });
  it("makes a valid date pretty", () => {
    expect(prettyDate("2020-09-03T14:04:35Z")).toBe("September 3, 2020");
  });
});

describe("transformListData", () => {
  it("transforms data correctly", () => {
    expect(transformListData(mockData)).toEqual(mockTransformedData);
  });
});

describe("fetchListWithQPs", () => {
  it("fetches and transforms data successfully", async () => {
    fetch.mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ items: mockData }),
      })
    );
    const data = await fetchListWithQPs(mockFilterData);
    expect(data).toEqual(mockTransformedData);
  });
  it("handles errors fetching data", async () => {
    fetch.mockImplementation(() => Promise.reject(new Error()));
    const data = await fetchListWithQPs(mockFilterData);
    expect(data).toEqual([]);
  });
});
