import $ from 'jquery';
import axios from 'axios';


/**
 *
 * @description handles user login
 *
 * @param {object} userData
 * @param {string} url
 *
 * @returns {object} server response
 */
export const postMethod = (userData, url) => {
  return axios.post(url, userData);
};


/**
 *
 * @description handles user login
 *
 * @param {string} url
 * @param {string} token
 *
 * @returns {object} server response
 */
export const getMethod = (url, token) => {
  return axios.get(url, { headers: { token } });
};

