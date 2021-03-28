// PACKAGES
import React from "react";
import { useRouter } from "next/router";
// UI
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
// COMPONENTS
import Filter from "./HeaderTools/FilterDrawer";
import Searchbar from "./HeaderTools/SearchBar";
import ThemeToggle from "../ThemeToggle";
import SafeLink from "../SafeLink";

const useToolbarStyles = makeStyles((theme) => ({
  drawer: {
    width: 250,
  },
  root: {
    // background: theme.palette.primary.light,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    color: theme.palette.light,
    flex: "1 1 100%",
  },
}));

/**
 * @Component
 * The Header component that contains the searchbar, theme toggle, and filter drawer
 *
 */
const Header = () => {
  const classes = useToolbarStyles();
  const router = useRouter();
  const isHome = router.pathname === "/";

  return (
    <header>
      <Toolbar className={classes.root}>
        <SafeLink className={classes.title} link url="/" variant="h4">
          Repo Search
        </SafeLink>
        {isHome ? (
          <>
            <Searchbar />
            <Filter />
          </>
        ) : (
          <ThemeToggle />
        )}
      </Toolbar>
    </header>
  );
};

export default Header;
