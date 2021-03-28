// PACKAGES
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
// COMPONENTS
import ThemeToggle from "../../ThemeToggle";
// REDUX
import { filterList } from "../../../redux/actions";
// CONSTANTS
import { FILTERS } from "../../../lib/constants";

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
 * The drawer that contains filter options and theme toggle at desktop size
 * Only accessible via the homepage
 *
 */
const FilterDrawer = () => {
  const classes = useToolbarStyles();

  const dispatch = useDispatch();
  const {
    data: { filters, order, orderBy, searchPhrase },
  } = useSelector((state) => state);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (e) => {
    setDrawerOpen(open);
  };

  const handleFilter = (filterKey) => ({ target: { value } }) => {
    dispatch(
      filterList(
        { [filterKey]: value },
        { filters, order, orderBy, searchPhrase }
      )
    );
  };

  return (
    <>
      <Tooltip title="Filter transactions">
        <IconButton aria-label="filter toggle" onClick={toggleDrawer(true)}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <Drawer anchor="right" onClose={toggleDrawer(false)} open={drawerOpen}>
        <div className={classes.drawer} role="presentation">
          <List>
            <ListItem>
              <ThemeToggle />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>Filter</ListItemText>
            </ListItem>
            <Divider />
            {FILTERS.map(({ display, id, options }) => {
              const val = options.find((option) => option === filters[id]);
              return (
                <ListItem key={id}>
                  <Select
                    aria-label={`filter dropdown ${id}`}
                    displayEmpty
                    onChange={handleFilter(id)}
                    placeholder={display}
                    renderValue={(rVal) => rVal || display}
                    value={val || display}
                  >
                    <MenuItem key="delete-option" value={display}>
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </MenuItem>
                    {options.map((option) => (
                      <MenuItem
                        aria-label={`filter ${id} option ${option}`}
                        key={`${id}-${option}`}
                        value={option}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </ListItem>
              );
            })}
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default FilterDrawer;
