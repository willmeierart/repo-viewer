// PACKAGES
import React from "react";
import PropTypes from "prop-types";
// COMPONENTS

export default function Layout({ children, isDarkTheme, toggleDarkTheme }) {
  return (
    <>
      <header>
        <nav />
      </header>
      <main>{children}</main>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
  isDarkTheme: PropTypes.bool,
  toggleDarkTheme: PropTypes.func,
};
