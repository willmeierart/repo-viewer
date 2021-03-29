// PACKAGES
import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
// UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
// COMPONENTS
import SafeLink from "../../components/SafeLink";
import StarMagic from "../../components/StarMagic";
// UTILS
import { fetchDetail, prettyDate } from "../../lib/helpers";

const useStyles = makeStyles((theme) => ({
  image: {
    background: "white",
    border: `1px solid ${theme.palette.primary.light}`,
    borderRadius: "100vw",
    maxWidth: "100%",
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    display: "flex",
    minHeight: "33vh",
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
  const router = useRouter();

  // if for some reason the initialProps fetch fails,
  // (i.e. there is a malformed url slug),
  // reroute to homepage and safely return null
  if (!data?.name) {
    router.push("/");
    return null;
  }

  return (
    <section>
      <Paper className={classes.root}>
        <Grid container spacing={3}>
          <Grid item m={3} xs={12}>
            <img
              alt={data.ownerName}
              className={classes.image}
              src={data.ownerImg}
            />
          </Grid>
          <Grid item xs={12}>
            <SafeLink link url={data.url} variant="h4">
              {data.name}
            </SafeLink>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">{data.description}</Typography>
          </Grid>
          <Grid item s={6} xs={12}>
            <Typography>last updated: {prettyDate(data.updated)}</Typography>
          </Grid>
          <Grid item s={6} xs={12}>
            <SafeLink link url={data.url}>
              language: {data.language}
            </SafeLink>
          </Grid>
          <Grid item xs={6}>
            <Typography>stars: {data.stars}</Typography>
          </Grid>
        </Grid>
      </Paper>
      {data.stars && <StarMagic stars={data.stars} />}
    </section>
  );
}

Detail.getInitialProps = async (ctx) => {
  try {
    // fetch repo data based on url path slug
    const path = decodeURIComponent(ctx.query.slug);
    const data = await fetchDetail(path);
    return { data };
  } catch (e) {
    return {};
  }
};

Detail.propTypes = {
  data: PropTypes.object.isRequired,
};
