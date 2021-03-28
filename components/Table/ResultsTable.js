// PACKAGES
import React from "react";
import { useSelector } from "react-redux";
// UI
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
// COMPONENTS
import SafeLink from "../SafeLink";
import SortableHead from "./SortableHead";
// UTILS
import { HEAD_CELLS } from "../../lib/constants";

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

/**
 * @Component
 * Main display table for repository search list view
 *
 */
const ResultsTable = () => {
  const classes = useStyles();

  const {
    data: { repos },
  } = useSelector((state) => state);

  if (!repos?.length)
    return "No respositories found. Try to search for something else.";

  return (
    <Paper className={classes.paper}>
      <TableContainer>
        <Table
          aria-label="data table"
          className={classes.table}
          size="small"
          stickyHeader
        >
          <SortableHead classes={classes} />
          <TableBody>
            {repos.map((row, i) => (
              <TableRow
                hover
                key={`row-${i}`} // eslint-disable-line react/no-array-index-key
              >
                {HEAD_CELLS.map(({ display, link }, j) => {
                  const value = row[display];
                  return (
                    <TableCell component="td" key={`cell${display + i + j}`}>
                      <SafeLink link={link} url={value}>
                        {value}
                      </SafeLink>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ResultsTable;
