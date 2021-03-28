// DATA
export const BASE_URL = "https://api.github.com";

// CONFIG
export const HEAD_CELLS = [
  {
    apiKey: "full_name",
    display: "name",
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
  {
    apiKey: "created_at",
    display: "created",
  },
  {
    apiKey: "html_url",
    display: "link",
    link: true,
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
