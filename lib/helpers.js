// PACKAGES
import isEmpty from "lodash.isempty";
// INTEGRATIONS
import api, { routes } from "./api";
// CONSTANTS
import { BASE_URL, HEAD_CELLS, QUERY_KEY_MAP } from "./constants";

export const returnNonEmptyVals = (obj) => {
  return Object.entries(obj).reduce((vals, [key, val]) => {
    if (!isEmpty(val)) {
      vals[key] = val;
    }
    return vals;
  }, {});
};

export const transformListData = (list) =>
  list.map((repo) =>
    HEAD_CELLS.reduce((obj, { apiKey, display }) => {
      obj[display] = repo[apiKey];
      return obj;
    }, {})
  );

export const fetchListWithQueries = async (state, config = {}) => {
  const queryParams = returnNonEmptyVals(state);
  if (!isEmpty(queryParams)) {
    const url = Object.entries(queryParams).reduce(
      (urlWithParams, [key, val], i) => {
        const encodedVal = val.replace(" ", "+");
        const qKey = QUERY_KEY_MAP[key];
        urlWithParams += `${i ? "&" : "?"}${qKey}=${encodedVal}`;
        return urlWithParams;
      },
      BASE_URL + routes.list
    );

    const request = await api.fetch(url, config);
    const data = await request.json();
    return transformListData(data.items);
  }
};
