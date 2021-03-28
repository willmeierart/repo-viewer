// PACKAGES
import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
// UI
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  type: {
    "&:hover": {
      fontWeight: "bold",
    },
    color: theme.palette.primary.contrastText,
    textDecoration: "none",
  },
}));

/**
 * @Component
 * Child of `SafeLink` that renders either a non-link, internal next `Link`, or external anchor link
 * @param {any} children optional content passed to component (probably a string). will render instead of link if passed
 * @param {link} boolean whether to render a link to another page or not
 * @param {string} url href destination of link
 *
 */
const LinkContent = ({ children, link, url }) => {
  const classes = useStyles();
  const innerHtml = children || url;
  if (!link) {
    // just regular text content
    return <span>{innerHtml}</span>;
  } else if (url.indexOf("http") === 0) {
    // external link in new tab
    return (
      <a className={classes.type} href={url} rel="noreferrer" target="_blank">
        {innerHtml}
      </a>
    );
  } else {
    // Internal app link
    // I acknowledge this is brittle currently...
    return (
      <Link href={`/detail/${encodeURIComponent(url)}`} passHref>
        <a className={classes.type}>{innerHtml}</a>
      </Link>
    );
  }
};

LinkContent.propTypes = {
  children: PropTypes.any,
  link: PropTypes.bool,
  url: PropTypes.string,
};

/**
 * @Component
 * Wrapper for `LinkContent`
 * @param {object} props same as above
 *
 */
const SafeLink = (props) => (
  <Typography {...props}>
    <LinkContent {...props} />
  </Typography>
);

export default SafeLink;
