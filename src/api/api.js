import { API_BASE_URL, MENU_ITEMS_API, SEARCH_API } from './api-constants';

// fetch drop down items
export const getDropDownItems = () => {
  return fetch(API_BASE_URL + MENU_ITEMS_API);
};

// search api call
export const getSearchResults = searchText =>
  fetch(`${API_BASE_URL}${SEARCH_API}?searchText=${searchText}`);
