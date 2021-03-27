// PACKAGES
import fetch from "isomorphic-unfetch";
// CONSTANTS
import { BASE_URL } from "../lib/constants";

export const routes = [
  {
    endpoint: "/search/repositories",
    name: "detail",
  },
  {
    endpoint: "/search/repositories",
    name: "list",
  },
];

const routeNames = routes
  .map(({ endpoint, name }) => `${name} (${endpoint})`)
  .join(", ");

/**
 * @function
 * Constructs error message for invalid route provided to API integration
 * @param {object} route one of the above routes
 *
 */
export const bsRouteWarning = (route) =>
  `Invalid route key provided (${route}). Please try one of the following: ${routeNames}`;

/**
 * @function
 * Constructs path for http request to github API
 * @param {object} route one of the above routes
 *
 */
export const compileFullPath = (routeName) => {
  const { endpoint } = routes.find((r) => r.name === routeName) || {};
  return endpoint ? `${BASE_URL}${endpoint}` : null;
};

const api = {
  /**
   * @function
   * API integration using isomorphic unfetch for both server and clientside requests
   * @param {object} routeName one of the above routes
   * @param {params} params query params for http request
   *
   */
  fetch: async (routeName) => {
    const path = compileFullPath(routeName);

    if (path) {
      try {
        const data = await fetch(path);
        return data;
      } catch (e) {
        console.warn(`Failed to fetch ${path}.`);
        return null;
      }
    } else {
      console.warn(bsRouteWarning(routeName));
      return null;
    }
  },
};

export default api;
