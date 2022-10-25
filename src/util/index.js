export const debounce2 =
  (callback, delay, timeout = 0) =>
  (args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(args), delay);
  };

/**
 *
 * @param {Number} lenght Lenght of array
 * @param {Number} start Starting number of value in array
 * @param {Number} end Ending Number of value in array
 * @returns {Array} Returns an array of numbers starting form start's value and ending with end's value
 */
export const generateArray = (lenght, start, end) =>
  Array.from({ length: end < lenght ? end : lenght }, (_, i) => i + start);

/**
 *
 * @param {Array} array Provide only userData array
 * @param {number} id provide user ID
 * @param {Object} payload Provide data which to be updated
 * @returns {Array} An updated array
 */
export const updateArray = (array = [], id, payload) => {
  const tempArray = [...array];
  const arrayId = tempArray.findIndex((info) => info.id === id);
  if (arrayId !== -1) tempArray[arrayId] = {...payload, id};
  return [...tempArray];
};

/**
 *
 * @param {Array} array Provide only userData array
 * @param {number} id provide userId which need to be deleted
 * @returns {Array} An array with a remained users
 */
export const deleteArrayItem = (array = [], id) => {
  const tempArray = [...array];
  const arrayId = tempArray.findIndex((info) => info.id === id);
  if (arrayId !== -1) tempArray.splice(arrayId, 1);
  return [...tempArray];
};

/**
 * 
 * @param {Array} array Provide only userData array
 * @param {Array} ids provide userIds which are need to be deleted
 * @returns {Array} An array with a remained users
 */
export const deleteMultipleArrayItem = (array = [], ids = []) => {
  const tempArray = array.filter((info) => !ids.find((id) => id === info.id));
  return [...tempArray]
};


