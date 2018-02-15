/**
 * @description Gets the current url
 *
 * @param {string} currentURL
 *
 * @returns {boolean} true or false
*/
const checkUrl = (currentURL) => {
  if (currentURL === '/login') return true;
  return false;
};

export default checkUrl;

