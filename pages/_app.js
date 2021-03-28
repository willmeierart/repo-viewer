// PACKAGES
import React, { useEffect, useState } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
// UI
import CssBaseline from "@material-ui/core/CssBaseline";
// REDUX
import { useStore } from "../redux/store";
// COMPONENTS
import Layout from "../components/Layout";

/**
 * @Component
 * The base app override for next applications
 * Allows for global wrappers that persist across route changes
 * @param {object: { Component }} Component standard next.js pattern (Page Component)
 * @param {object: { object }} pageProps standard next.js pattern (Page props)
 *
 */
export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  useEffect(() => {
    // remove serverside css, prevent FOUC
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  const description = "Will's super cool code challenge";

  return (
    <>
      <Head>
        <title>{description}</title>
        <meta content={description} name="description" />
        <meta content={description} name="keywords" />
        <meta content={description} key="og:title" property="og:title" />
        <meta
          content={description}
          key="og:description"
          property="og:description"
        />
        <meta
          content={description}
          key="twitter:description"
          name="twitter:description"
        />
        <meta content={description} key="twitter:title" name="twitter:title" />
        <meta content="website" property="og:type" />
        <meta content={description} property="og:site_name" />
        <meta content="en_US" property="og:locale" />
        <meta content="summary" name="twitter:card" />
        <meta content="index,follow" name="robots" />
      </Head>
      <Provider store={store}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};
