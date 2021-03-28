// PACKAGES
import fetch from "isomorphic-unfetch";

export const routes = {
  detail: "/repos",
  list: "/search/repositories",
};

// environment variable sourced from `.env.local`
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN;

const api = {
  /**
   * @function
   * API integration using isomorphic unfetch for both server and clientside requests
   * @param {object} url
   *
   */
  fetch: async (url) => {
    // we want to use an access token to avoid strict rate limiting, but still allow app usage without one
    const params = ACCESS_TOKEN
      ? {
          headers: {
            Authorization: `token ${ACCESS_TOKEN}`,
          },
        }
      : {};
    try {
      const data = await fetch(url, params);
      return data;
    } catch (e) {
      console.error(`Failed to fetch ${url}: \n ${e}`);
      return null;
    }
  },
};

export default api;
