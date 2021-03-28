// PACKAGES
import isEmpty from "lodash.isempty";
// INTEGRATIONS
import api, { routes } from "./api";
// CONSTANTS
import { BASE_URL, HEAD_CELLS, QUERY_KEY_MAP } from "./constants";

export const addQFilters = (qParam, filters) =>
  Object.entries(filters).reduce((acc, [key, val]) => {
    acc += `+${key}:${val}`;
    return acc;
  }, qParam);

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

export const transformListData = (list) =>
  list.map((repo) =>
    HEAD_CELLS.reduce((obj, { apiKey, display }) => {
      obj[display] = repo[apiKey];
      return obj;
    }, {})
  );

export const fetchListWithQueries = async (state) => {
  const queryParams = composeQueryParams(state);
  if (!isEmpty(queryParams)) {
    const url = Object.entries(queryParams).reduce(
      (urlWithParams, [key, val], i) => {
        const encodedVal = val.replace(" ", "+");
        urlWithParams += `${i ? "&" : "?"}${key}=${encodedVal}`;
        return urlWithParams;
      },
      BASE_URL + routes.list
    );

    const request = await api.fetch(url);
    const data = await request.json();
    return transformListData(data.items);
  }
};

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

export const fetchDetail = async (repo) => {
  const url = BASE_URL + routes.detail + `/${repo}`;
  const request = await api.fetch(url);
  const data = await request.json();
  return transformDetailData(data);
};
