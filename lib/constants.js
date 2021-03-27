// UI
export const THEME_DARK = "THEME_DARK";
export const THEME_LIGHT = "THEME_LIGHT";

// DATA
export const BASE_URL = "https://api.github.com";

// CONFIG
export const HEAD_CELLS = [
  {
    apiKey: "created_at",
    display: "created",
  },
  {
    apiKey: "description",
    display: "description",
  },
  {
    apiKey: "id",
    display: "id",
  },
  {
    apiKey: "html_url",
    display: "link",
  },
  {
    apiKey: "full_name",
    display: "name",
  },
  {
    apiKey: "stargazers_count",
    display: "stars",
  },
  {
    apiKey: "updated_at",
    display: "updated",
  },
  {
    apiKey: "url",
    display: "url",
  },
];

export const FILTERS = [{ display: "", id: "", options: [] }];

export const QUERY_KEY_MAP = {
  activeFilters: {},
  order: "sort",
  orderBy: "order",
  searchPhrase: "q",
};
