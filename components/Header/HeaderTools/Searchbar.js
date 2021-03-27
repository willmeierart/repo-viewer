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
    data: { searchPhrase },
  } = useSelector((state) => state);

  const [phrase, setPhrase] = useState(searchPhrase);

  const handleSearch = ({ target: { value } }) => {
    setPhrase(value);
    dispatch(searchList(value));
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
      onChange={handleSearch}
      value={phrase}
      variant="outlined"
    />
  );
};

export default Searchbar;
