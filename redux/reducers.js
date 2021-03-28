// REDUX
import { combineReducers } from "redux";
import * as types from "./types";
// CONSTANTS
import { THEME_DARK } from "../lib/constants";

export const initialDataState = {
  filters: {},
  loading: true,
  order: "",
  orderBy: "",
  repos: [],
  searchPhrase: "hotel engine",
  selectedRepo: {},
};

export const initialUiState = {
  theme: THEME_DARK,
};

export const dataReducer = (state = initialDataState, action) => {
  const newState = {
    ...state,
    ...action.payload,
  };
  switch (action.type) {
    case types.FETCH_DETAIL:
      break;
    case types.FETCH_LIST:
    case types.FILTER_LIST:
    case types.SEARCH_LIST:
    case types.SORT_LIST:
      return {
        ...newState,
        loading: false,
      };
    case types.SET_LOADING:
      return newState;
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
