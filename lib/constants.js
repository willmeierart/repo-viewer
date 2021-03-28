// UI
export const THEME_DARK = "THEME_DARK";
export const THEME_LIGHT = "THEME_LIGHT";

// DATA
export const BASE_URL = "https://api.github.com";

// CONFIG
export const HEAD_CELLS = [
  {
    apiKey: "full_name",
    display: "name",
    link: true,
    sortKey: "best-match",
  },
  {
    apiKey: "description",
    display: "description",
  },
  {
    apiKey: "created_at",
    display: "created",
  },
  {
    apiKey: "id",
    display: "id",
  },
  {
    apiKey: "html_url",
    display: "link",
    link: true,
  },
  {
    apiKey: "stargazers_count",
    display: "stars",
    sortKey: "stars",
  },
  {
    apiKey: "updated_at",
    display: "updated",
    sortKey: "updated",
  },
];

export const FILTERS = [
  {
    display: "language",
    id: "language",
    options: [
      "c",
      "c#",
      "c++",
      "go",
      "java",
      "javascript",
      "php",
      "python",
      "ruby",
      "sql",
      "swift",
    ],
  },
];

export const QUERY_KEY_MAP = {
  order: "order",
  orderBy: "sort",
};
