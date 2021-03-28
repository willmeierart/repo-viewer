// PACKAGES
import React from "react";
import Link from "next/link";
// UI
import Typography from "@material-ui/core/Typography";

const LinkContent = ({ children, link, url }) => {
  const innerHtml = children || url;
  if (!link) {
    return innerHtml;
  } else if (url.indexOf("http") === 0) {
    return (
      <a href="url" target="_blank">
        {innerHtml}
      </a>
    );
  } else {
    return <Link href={`/detail/${encodeURIComponent(url)}`}>{innerHtml}</Link>;
  }
};

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
