// PACKAGES
import React from "react";
import PropTypes from "prop-types";
// UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
// COMPONENTS
import SafeLink from "../../components/SafeLink";
// UTILS
import { fetchDetail, prettyDate } from "../../lib/helpers";

const useStyles = makeStyles((theme) => ({
  image: {
    border: "1px solid black",
    borderRadius: "100vw",
  },
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
        <Grid container spacing={3}>
          <Grid item m={3} xs={12}>
            <img
              alt={data.ownerName}
              className={classes.image}
              src={data.ownerImg}
            />
          </Grid>
          <Grid item m={9} xs={12}>
            <Typography variant="h4">{data.ownerName}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h2">
              <SafeLink link url={data.url}>
                {data.name}
              </SafeLink>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Typography variant="h6">{data.description}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>
              <Typography>last updated: {prettyDate(data.updated)}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper>
              <Typography>language: {data.language}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>
              <Typography>stars: {data.stars}</Typography>
            </Paper>
          </Grid>
        </Grid>
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
