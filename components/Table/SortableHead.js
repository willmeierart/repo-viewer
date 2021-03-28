// PACKAGES
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
// UI
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
// REDUX
import { sortList } from "../../redux/actions";
// CONSTANTS
import { HEAD_CELLS } from "../../lib/constants";

/**
 * @Component
 * The <th /> of the `DataTable` that allows for custom sorting (via Material UI)
 * @param {object: { object }} classes Material UI css classes passed from parent
 *
 */
const SortableHead = ({ classes }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);
  const { order, orderBy } = data;

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    const newOrder = isAsc ? "desc" : "asc";
    dispatch(sortList(newOrder, property, data));
  };

  const onSort = (prop) => (e) => handleSort(prop);

  const isOrderer = (id) => orderBy === id;

  return (
    <TableHead>
      <TableRow>
        {HEAD_CELLS.map(({ apiKey, display, sortKey }) => (
          <TableCell
            align="left"
            aria-label={`table column ${orderBy} sorted by ${order}`}
            key={`th-${apiKey}`}
            padding="default"
            sortDirection={isOrderer(apiKey) ? order : false}
          >
            {sortKey ? (
              <TableSortLabel
                active={isOrderer(sortKey)}
                direction={isOrderer(sortKey) ? order : "asc"}
                onClick={onSort(sortKey)}
              >
                {display}
              </TableSortLabel>
            ) : (
              display
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

SortableHead.propTypes = {
  classes: PropTypes.object,
};

export default SortableHead;
