// PACKAGES
import React from "react";
import PropTypes from "prop-types";
// COMPONENTS
import Header from "./Header/Header";

export default function Layout({ children, isDarkTheme, toggleDarkTheme }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
  isDarkTheme: PropTypes.bool,
  toggleDarkTheme: PropTypes.func,
};
