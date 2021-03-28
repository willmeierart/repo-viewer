// PACKAGES
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
// UI
import Container from "@material-ui/core/Container";
import { ThemeProvider } from "@material-ui/core/styles";
// COMPONENTS
import Header from "./Header/Header";
// UTILS
import { themeDark, themeLight } from "../lib/theme";

/**
 * @Component
 * Layout component, as per next.js convention.
 * Persists route changes and allows for theming from within redux context provider
 *
 */
export default function Layout({ children }) {
  const {
    ui: { darkTheme },
  } = useSelector((state) => state);

  return (
    <ThemeProvider theme={darkTheme ? themeDark : themeLight}>
      <Container>
        <Header />
        <main>{children}</main>
      </Container>
    </ThemeProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
};
