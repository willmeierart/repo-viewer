// REDUX
import * as types from "./types";
// UTILS
import { fetchListWithQPs } from "../lib/helpers";

/**
 * @function
 * Imperatively dispatches loading action
 * @param {bool} loadingState
 *
 */
export const setLoading = (loading = true) => (dispatch) => {
  dispatch({
    payload: { loading },
    type: types.SET_LOADING,
  });
};

/**
 * @function
 * A sort of higher order action that is used by other actions
 * to set `loading` state during asynchronous fetching
 * @param {function} dispatch the redux dispatch callback
 * @param {object} newState the state to process for composing queries
 *
 */
const loadAndFetchData = async (dispatch, newState) => {
  // Immediately set loading state
  // Note that loading state set back to false in subsequent reducer code
  dispatch({
    payload: { loading: true },
    type: types.SET_LOADING,
  });

  return await fetchListWithQPs(newState);
};

/**
 * @function
 * Fetches initial list of repositories, fired on homepage render
 * @param initialState needed because `loadAndFetchData` relies on state arg
 *
 */
export const fetchList = (initialState = {}) => async (dispatch) => {
  const repos = await loadAndFetchData(dispatch, initialState);

  dispatch({ payload: { repos }, type: types.FETCH_LIST });
};

/**
 * @function
 * Filter for individual repo matches based on filter select fields
 * @param {object} filter formatted as `{FIELD: VALUE}`
 * @param {object} filters prev state of `filters`.
 *
 */
export const filterList = (filter, prevState = {}) => async (dispatch) => {
  const newFilters = { ...prevState.filters, ...filter };

  // Clear filter if value reset to placeholder value
  const [fKey, fVal] = Object.entries(filter)[0];
  if (fKey?.toLowerCase() === fVal?.toLowerCase()) {
    delete newFilters[fKey];
  }

  const repos = await loadAndFetchData(dispatch, {
    ...prevState,
    filters: newFilters,
  });

  dispatch({
    payload: { filters: newFilters, repos },
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
export const searchList = (searchPhrase, prevState = {}) => async (
  dispatch
) => {
  const repos = await loadAndFetchData(dispatch, {
    searchPhrase,
  });

  dispatch({
    payload: { repos, searchPhrase },
    type: types.SEARCH_LIST,
  });
};

/**
 * @function
 * Sort repos via the table column headers
 * @param {string} order either 'asc' or 'desc'
 * @param {string} orderBy the name of the property to apply order param to
 *
 */
export const sortList = (order, orderBy, prevState = {}) => async (
  dispatch
) => {
  const repos = await loadAndFetchData(dispatch, {
    ...prevState,
    order,
    orderBy,
  });

  dispatch({
    payload: { order, orderBy, repos },
    type: types.SORT_LIST,
  });
};

/**
 * @function
 * Toggle between light and dark theme
 *
 */
export const toggleTheme = () => (dispatch) => {
  dispatch({ type: types.TOGGLE_THEME });
};
