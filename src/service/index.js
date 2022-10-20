import { LOCALSTORAGE_USER_DATA, COUNT_PER_PAGE } from "../constants";
import { deleteArrayItem, deleteMultipleArrayItem, updateArray } from "../util";

/**
 *
 * @param {Array} data Provide user data to store in localstorage
 */
export const storeUsersData = (data) => {
  localStorage.setItem(LOCALSTORAGE_USER_DATA, JSON.stringify(data));
};

const getAllUserData = () => {
  const data = localStorage.getItem(LOCALSTORAGE_USER_DATA);
  const userDta = JSON.parse(data);
  return userDta?.sort((a, b) => a.id - b.id);
};

const getMatchingInfo = (info, key) => {
  let isMatched = false;

  const email = info?.email?.toLowerCase();
  const role = info?.role?.toLowerCase();
  const name = info?.name?.toLowerCase();

  if (name?.includes(key) || role.includes(key) || email.includes(key))
    isMatched = true;
  return isMatched;
};

const getFilteredData = (filterKey) => {
  const data = getAllUserData();
  const filteredArray = data?.filter((info) =>
    getMatchingInfo(info, filterKey)
  );
  return filteredArray;
};

const getLastPage = (length) => {
  return Math.ceil(length / COUNT_PER_PAGE);
};

/**
 *
 * @param {Number} page Page number
 * @param {String} filterKey Key to search: Name, Email or role (Can be ingonred if don't want filter)
 * @returns {Object} An with info of page, userData, and number of pages
 */
export const getPaginatedData = (page, filterKey = false) => {
  let data = getAllUserData();
  if (filterKey) data = getFilteredData(filterKey);
  const lastPage = getLastPage(data?.length);
  const start = (page - 1) * COUNT_PER_PAGE;
  const end = (page - 1) * COUNT_PER_PAGE + COUNT_PER_PAGE;
  const paginatedData = data?.slice(start, end);
  return {
    userInfo: paginatedData,
    page,
    lastPage,
  };
};

export const editUserData = (id, payload) => {
  const data = getAllUserData();
  const updatedArray = updateArray(data, id, payload);
  storeUsersData(updatedArray);
  return updatedArray;
};

export const deleteUser = (id) => {
  const data = getAllUserData();
  const updatedArray = deleteArrayItem(data, id);
  storeUsersData(updatedArray);
  return updateArray;
};

export const deleteMultipleUser = (ids) => {
  const data = getAllUserData();
  const updatedArray = deleteMultipleArrayItem(data, ids);
  storeUsersData(updatedArray);
  return updatedArray;
};
