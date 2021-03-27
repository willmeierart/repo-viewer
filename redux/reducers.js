// REDUX
import { combineReducers } from "redux";
import * as types from "./types";
// CONSTANTS
import { THEME_DARK } from "../lib/constants";

export const initialDataState = {
  activeFilters: {},
  loading: true,
  repositories: [],
  searchPhrase: "willmeierart",
  selectedRepository: {},
};

export const initialUiState = {
  theme: THEME_DARK,
};

export const dataReducer = (state = initialDataState, action) => {
  switch (action.type) {
    case types.FETCH_DETAIL:
      break;
    case types.FETCH_LIST:
      break;
    case types.FILTER_LIST:
      break;
    case types.SORT_LIST:
      break;
    case types.SET_LOADING:
      break;
    default:
      return state;
  }
};

export const uiReducer = (state = initialUiState, action) => {
  switch (action.type) {
    case types.SET_THEME:
      break;

    default:
      return state;
  }
};

const reducers = {
  data: dataReducer,
  ui: uiReducer,
};

export default combineReducers(reducers);
