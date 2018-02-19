import JWT from 'jsonwebtoken';
import models from '../models'
;
const { user } = models;

require('dotenv').config();

const { SECRET } = process.env;

/**
 * @description This method generates token
 *
 * @param { object } userDetails  - user details
 *
 * @return { string } - token
 */
export const generateToken = (userDetails) => JWT.sign(
    userDetails,
    SECRET,
    { expiresIn: '24h' }
  );


/**
 * @description This method decodes token
 *
 * @param { object } token  - authorization token
 *
 * @return { string } - token
 */
export const decodeToken = (token) => new Promise((resolve, reject) => {
    JWT.verify(token, SECRET, (error, decoded) => {
      if (error) {
        reject(error);
      } else {
        resolve(decoded);
      }
    });
  });

/**
 * @description This method returns error messages from sequelize
 *
 * @param { object } error  - sequelize generated errors
 *
 * @return { object } - error message and type
 */
export const errorMessages = (error) => {
  if (error.name === 'SequelizeUniqueConstraintError') {
    return {
      error: error.errors[0].message,
      type: 'uniqueError'
    };
  } else if (error.name === 'SequelizeValidationError') {
    return {
      error: error.errors[0].message,
      type: 'validationError'
    };
  }
  return error.name;
};


/**
 * @static
 *
 * @param {object} model Model to inssert into
 * @param {object} payload payload to insert
 *
 *
 * @returns {object} response from server
 */
export const saveForumMessage = (model, payload) => model.create(payload);

/**
 * @static
 *
 * @param {object} model Model to inssert into
 *
 *
 * @returns {object} response from server
 */
export const getForumMessage = (model => model.findAll({
  include: {
    model: user
  }
}));

/**
 * @static
 *
 * @param {object} model Model to fetch from
 *
 * @param {object} id user id
 *
 * @returns {object} response from server
 */
export const getUser = ((model, id) => model.findById(id));

/**
 * @static
 *
 * @param {object} model Model to inssert into
 * @param {object} whatToUpdate field to update
 * @param {object} newData payload to update with
 *
 * @returns {object} response from server
 */
export const updateForumMessage = (model, whatToUpdate, newData) => model.update({
  where: {
    whatToUpdate: newData
  }
});
