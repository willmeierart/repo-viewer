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
