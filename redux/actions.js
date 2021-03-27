// PACKAGES
import debounce from "lodash.debounce";
// REDUX
import * as types from "./types";
// UTILS
import { fetchListWithQueries } from "../lib/helpers";

/**
 * @function
 * Imperatively dispatches loading action
 * @param {bool} loadingState
 *
 */
export const setLoading = (loadingState = true) => (dispatch) => {
  dispatch({
    payload: loadingState,
    type: types.SET_LOADING,
  });
};

/**
 * @function
 * Fetches initial list of repositories, fired on homepage render
 *
 */
export const fetchList = () => (dispatch) => {
  // Immediately set loading state
  // Note that loading state set back to false in reducer code
  setLoading();
  dispatch({ payload: {}, type: types.FETCH_LIST });
};

/**
 * @function
 * Filter for individual repo matches based on filter select fields
 * @param {object} filter formatted as `{FIELD: VALUE}`
 * @param {object} filters prev state of `activeFilters`.
 *
 */
export const filterList = (filter, prevFilters, prevState) => async (
  dispatch
) => {
  // Immediately set loading state
  // Note that loading state set back to false in reducer code
  setLoading();

  const newFilters = { ...prevFilters, ...filter };

  // Clear filter if value reset to placeholder value
  const [fKey, fVal] = Object.entries(filter)[0];
  if (fKey?.toLowerCase() === fVal?.toLowerCase()) {
    delete newFilters[fKey];
  }

  const repos = await fetchListWithQueries({
    ...prevState,
    filters: newFilters,
  });

  dispatch({
    payload: { activeFilters: newFilters },
    repos,
    type: types.FILTER_LIST,
  });
};

/**
 * @function
 * Provide a search query string
 * Will accept any native github search syntax
 * @param {string} searchPhrase the string to search for matches against
 *
 */
export const searchList = (searchPhrase, prevState) => async (dispatch) => {
  // Immediately set loading state
  // Note that loading state set back to false in reducer code
  setLoading();
  const repos = await fetchListWithQueries({ ...prevState, searchPhrase });
  // ...but debounce the actual searching a bit since `doSearch` is a heavy func
  const debounceableSearch = () => {
    dispatch({
      payload: { repos, searchPhrase },
      type: types.SEARCH_LIST,
    });
  };

  debounce(debounceableSearch, 500)();
};

/**
 * @function
 * Sort repos via the table column headers
 * @param {string} order either 'asc' or 'desc'
 * @param {string} orderBy the name of the property to apply order param to
 *
 */
export const sortList = (order, orderBy, prevState) => async (dispatch) => {
  const repos = await fetchListWithQueries({ ...prevState, order, orderBy });
  dispatch({
    payload: { order, orderBy, repos },
    type: types.SORT_LIST,
  });
};
