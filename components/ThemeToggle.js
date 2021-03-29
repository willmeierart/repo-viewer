// PACKAGES
import React from "react";
import { useDispatch, useSelector } from "react-redux";
// UI
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness5Icon from "@material-ui/icons/Brightness5";
// REDUX
import { toggleTheme } from "../redux/actions";

export const useStyles = makeStyles((theme) => ({
  toggle: {
    cursor: "pointer",
  },
}));

/**
 * @Component
 * Toggle for theme. Appears in toolbar of home page and header of detail page.
 *
 */
const ThemeToggle = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    ui: { darkTheme },
  } = useSelector((state) => state);

  const handleClick = () => {
    dispatch(toggleTheme());
  };

  return (
    <Tooltip
      className={classes.toggle}
      onClick={handleClick}
      title="toggle theme"
    >
      {darkTheme ? <Brightness4Icon /> : <Brightness5Icon />}
    </Tooltip>
  );
};

export default ThemeToggle;
