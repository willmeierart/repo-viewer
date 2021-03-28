// PACKAGES
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
// UI
import Switch from "@material-ui/core/Switch";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
// COMPONENTS
import Filter from "./HeaderTools/Filter";
import Searchbar from "./HeaderTools/SearchBar";

const useToolbarStyles = makeStyles((theme) => ({
  drawer: {
    width: 250,
  },
  root: {
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
      <Toolbar className={clsx(classes.root)}>
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
          <Tooltip title="toggle theme">
            <Switch />
          </Tooltip>
        )}
      </Toolbar>
    </header>
  );
};

export default Header;
