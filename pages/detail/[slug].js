// PACKAGES
import React from "react";
import PropTypes from "prop-types";
// UI
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
// UTILS
import { fetchDetail } from "../../lib/helpers";

const useStyles = makeStyles((theme) => ({
  large: {
    height: theme.spacing(7),
    width: theme.spacing(7),
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    display: "flex",
  },
  small: {
    height: theme.spacing(3),
    width: theme.spacing(3),
  },
}));

/**
 * @Component
 * Repository detail page wrapper
 * @param {object} props.data data about the repository fetched and transformed in getInitialProps
 *
 */
export default function Detail({ data }) {
  const classes = useStyles();

  return (
    <section>
      <Paper>
        <Typography variant="h1">{data.name}</Typography>
        <Avatar
          alt={data.ownerName}
          className={classes.large}
          src={data.ownerImg}
        />
      </Paper>
    </section>
  );
}

Detail.getInitialProps = async (ctx) => {
  // url decode
  try {
    const path = decodeURIComponent(ctx.query.slug);
    const data = await fetchDetail(path);
    console.log("aaa", data);
    return { data };
  } catch (e) {
    return {};
  }
};

Detail.propTypes = {
  data: PropTypes.object,
};
