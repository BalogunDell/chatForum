import JWT from 'jsonwebtoken';

require('dotenv').config();

const { SECRET } = process.env;

/**
 * @description This method generates token
 *
 * @param { object } userDetails  - user details
 *
 * @return { string } - token
 */
export const generateToken = (userDetails) => {
  return JWT.sign(
    userDetails,
    SECRET,
    { expiresIn: '24h' }
  );
};


/**
 * @description This method decodes token
 *
 * @param { object } token  - authorization token
 *
 * @return { string } - token
 */
export const decodeToken = (token) => {
  return new Promise((resolve, reject) => {
    JWT.verify(token, SECRET, (error, decoded) => {
      if (error) {
        reject(error);
      } else {
        resolve(decoded);
      }
    });
  });
};

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

