// PACKAGES
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
// UI
import grey from "@material-ui/core/colors/grey";
import Container from "@material-ui/core/Container";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
// COMPONENTS
import Header from "./Header/Header";
// UTILS
import { themeDark, themeLight } from "../lib/theme";

const useStyles = makeStyles((theme) => ({
  container: {
    background: grey[500],
    minHeight: "100vh",
  },
}));

/**
 * @Component
 * Layout component, as per next.js convention.
 * Persists route changes and allows for theming from within redux context provider
 *
 */
export default function Layout({ children }) {
  const classes = useStyles();

  const {
    ui: { darkTheme },
  } = useSelector((state) => state);

  return (
    <ThemeProvider theme={darkTheme ? themeDark : themeLight}>
      <Container className={classes.container}>
        <Header />
        <main>{children}</main>
      </Container>
    </ThemeProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
};
