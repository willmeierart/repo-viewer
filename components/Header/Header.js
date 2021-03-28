// PACKAGES
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// UI
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
// COMPONENTS
import Filter from "./HeaderTools/FilterDrawer";
import Searchbar from "./HeaderTools/SearchBar";
import ThemeToggle from "../ThemeToggle";

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
        <Typography
          aria-label="title"
          className={classes.title}
          component="div"
          id="tableTitle"
          variant="h6"
        >
          <Link href="/">Repo Reaper</Link>
        </Typography>

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
