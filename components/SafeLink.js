import React from "react";
import Link from "next/link";

const SafeLink = ({ url, link }) => {
  if (!url) {
    return null;
  } else if (!link) {
    return url;
  } else if (url.indexOf("http") === 0) {
    return (
      <a href="url" target="_blank">
        {url}
      </a>
    );
  } else {
    return <Link href={`/detail/${encodeURIComponent(url)}`}>{url}</Link>;
  }
};

export default SafeLink;
