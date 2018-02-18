/**
 * @description Gets the current url
 *
 * @param {string} currentURL
 *
 * @returns {boolean} true or false
*/
export const checkUrl = (currentURL) => {
  if (currentURL === '/login') return true;
  return false;
};


/**
 * @description Gets the current url
 *
 * @param {string} token
 *
 * @returns {boolean} true or false
*/
export const setStorage = (token) => {
  localStorage.setItem('token', token);
  return true;
};

/**
 * @description Gets the current url
 *
 * @returns {boolean} true or false
*/
export const getStorage = () => {
  const token = localStorage.getItem('token');
  return token;
};
