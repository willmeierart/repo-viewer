// PACKAGES
import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
// UI
import Typography from "@material-ui/core/Typography";

/**
 * @Component
 * Child of `SafeLink` that renders either a non-link, internal next `Link`, or external anchor link
 * @param {any} children optional content passed to component (probably a string). will render instead of link if passed
 * @param {link} boolean whether to render a link to another page or not
 * @param {string} url href destination of link
 *
 */
const LinkContent = ({ children, link, url }) => {
  const innerHtml = children || url;
  if (!link) {
    // just regular text content
    return innerHtml;
  } else if (url.indexOf("http") === 0) {
    // external link in new tab
    return (
      <a href={url} rel="noreferrer" target="_blank">
        {innerHtml}
      </a>
    );
  } else {
    // Internal app link
    // I acknowledge this is brittle currently...
    return <Link href={`/detail/${encodeURIComponent(url)}`}>{innerHtml}</Link>;
  }
};

LinkContent.propTypes = {
  children: PropTypes.any,
  link: PropTypes.bool,
  url: PropTypes.string,
};

/**
 * @Component
 * Styled wrapper for `LinkContent`
 * @param {object} props same as above
 *
 */
const SafeLink = (props) => (
  <Typography color="primary">
    <LinkContent {...props} />
    <style global jsx>
      {`
        a {
          color: inherit;
          text-decoration: none;
        }
      `}
    </style>
  </Typography>
);

export default SafeLink;
