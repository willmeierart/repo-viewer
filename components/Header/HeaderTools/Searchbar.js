// PACKAGES
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// UI
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
// REDUX
import { searchList } from "../../../redux/actions";

/**
 * @Component
 * The Searchbar for dispatching queries
 * Only appears on list view of homepage
 *
 */
const Searchbar = () => {
  const dispatch = useDispatch();
  const {
    data: { filters, order, orderBy, searchPhrase },
  } = useSelector((state) => state);

  const [phrase, setPhrase] = useState(searchPhrase);

  const handleSearch = ({ keyCode }) => {
    // because of github api rate limiting it just isn't viable to
    // fire off a search in the onChange handler, even debounced,
    // so we'll just use the `ENTER` key to dispatch instead.
    if (keyCode === 13) {
      dispatch(searchList(phrase, { filters, order, orderBy, searchPhrase }));
    }
  };

  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      aria-label="searchbar"
      id="searchbar"
      onChange={({ target: { value } }) => {
        setPhrase(value);
      }}
      onKeyDown={handleSearch}
      value={phrase}
      variant="outlined"
    />
  );
};

export default Searchbar;
