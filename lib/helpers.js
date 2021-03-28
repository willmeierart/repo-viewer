// PACKAGES
import isEmpty from "lodash.isempty";
// INTEGRATIONS
import api, { routes } from "./api";
// CONSTANTS
import { BASE_URL, HEAD_CELLS, QUERY_KEY_MAP } from "./constants";

/**
 * Adds filters (i.e. language) by key to the `q` query param
 *
 */
export const addQFilters = (qParam, filters) =>
  Object.entries(filters).reduce((acc, [key, val]) => {
    acc += `+${key}:${val}`;
    return acc;
  }, qParam);

/**
 * Assembles a an object used to compile a query string based on active redux state
 *
 */
export const composeQueryParams = (state) => {
  const qs = {};
  // without a searchphrase, just skip applying any query params
  if (state.searchPhrase) {
    qs.q = `${state.searchPhrase}`;
    if (!isEmpty(state.filters)) {
      // a bit of a gotcha, filters like `language` are not their own
      // individual query params but rather concat'd to the `q` param
      qs.q = addQFilters(qs.q, state.filters);
    }
    Object.entries(QUERY_KEY_MAP).forEach(([key, val]) => {
      if (state[key]) {
        qs[val] = state[key];
      }
    });
  }

  return qs;
};

/**
 * Makes ISO string dates look nice
 *
 */
export const prettyDate = (datetime) => {
  const date = new Date(datetime);
  const dateStr = date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return dateStr;
};

/**
 * Formats data for presentation in `ResultsTable` cells
 *
 */
export const transformListData = (list) =>
  list.map((repo) =>
    HEAD_CELLS.reduce((obj, { apiKey, display }) => {
      obj[display] = apiKey.includes("_at") // such as `created_at` and `updated_at`
        ? prettyDate(repo[apiKey])
        : repo[apiKey];
      return obj;
    }, {})
  );

/**
 * Asynchronously fetches a list of repos with filter/search/sort query params applied
 *
 */
export const fetchListWithQPs = async (state) => {
  const queryParams = composeQueryParams(state);
  // since the github api search endpoint requires a searchphrase, prevent errors if one not provided
  if (!isEmpty(queryParams)) {
    // construct query string
    const url = Object.entries(queryParams).reduce(
      (urlWithParams, [key, val], i) => {
        urlWithParams += `${i ? "&" : "?"}${key}=${val}`;
        return urlWithParams;
      },
      BASE_URL + routes.list
    );

    const request = await api.fetch(url);
    const data = await request.json();
    return transformListData(data.items);
  }
  return [];
};

/**
 * Extracts relevant data from detail response for display on detail page
 *
 */
export const transformDetailData = (detail) => ({
  created: detail.created_at,
  description: detail.description,
  id: detail.id,
  issues: detail.open_issues_count,
  language: detail.language,
  name: detail.full_name,
  ownerImg: detail.owner.avatar_url,
  ownerName: detail.owner.login,
  stars: detail.stargazers_count,
  updated: detail.updated_at,
  url: detail.html_url,
});

/**
 * Asynchronously fetches data about a specific repo based on its slug
 *
 */
export const fetchDetail = async (repo) => {
  const url = BASE_URL + routes.detail + `/${repo}`;
  const request = await api.fetch(url);
  const data = await request.json();
  return transformDetailData(data);
};
