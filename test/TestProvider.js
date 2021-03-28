import React from "react";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { useStore } from "../redux/store";

export const mockStore = {
  data: {
    filters: {},
    loading: true,
    order: "",
    orderBy: "",
    repos: [],
    searchPhrase: "hotel engine",
    selectedRepo: {},
  },
  ui: {
    darkTheme: false,
  },
};

const TestProvider = ({ children, storeOverride }) => {
  const store = useStore(mockStore);
  return <Provider store={{ ...store, ...storeOverride }}>{children}</Provider>;
};

TestProvider.propTypes = {
  children: PropTypes.any,
  storeOverride: PropTypes.object,
};

export default TestProvider;
