import models from '../models/';
import {
  generateToken,
  errorMessages } from '../utils/helpers';


const { user } = models;

/**
 * @description This defines all user methods
 *
 * @class UserController
 */
class UserController {
  /**
   * @static
   *
   * @param {object} req request object
   * @param {object} res response object
   *
   * @memberof UserController
   *
   * @returns {object} response from server
   */
  static saveUser(req, res) {
    user.create(req.body)
      .then((response) => {
        const {
          id,
          username,
          image,
          createdAt
        } = response.dataValues;
        const token = generateToken({ id });

        res.status(201).json({
          message: 'User created',
          token,
          user: {
            id,
            username,
            image,
            createdAt
          }
        });
      }).catch((error) => {
        const messageObject = errorMessages(error);

        switch (messageObject.type) {
          case 'uniqueError':
            res.status(409).json({ message: messageObject.error });
            break;
          default:
            res.status(500).json({
              message: 'Internal server error'
            });
        }
      });
  }

  /**
   * @static
   *
   * @param {object} req request object
   * @param {object} res response object
   *
   * @memberof UserController
   *
   * @returns {object} response from server
   */
  static userLogin(req, res) {
    const {
      username,
      password,
      checkPassword
    } = req.body;

    user.findOne({
      where: { username }
    })
      .then((response) => {
        if (response !== null
          &&
          checkPassword(password, response.dataValues.password)) {
          const token = generateToken({ id: response.dataValues.id });
  
          return res.status(201).json({
            message: 'Signed in',
            token,
            user: {
              id: response.dataValues.id,
              username: response.dataValues.username,
              image: response.dataValues.image,
              createdAt: response.dataValues.createdAt
            }
          });
        }
        return res.status(401).json({
          message: 'This user does not exist in our database'
        });
      })
      .catch(() => {
        res.status(500).json({
          message: 'Something happened, we dont know what'
        });
      });
  }

  /**
   * @static
   *
   * @param {object} req request object
   * @param {object} res response object
   *
   * @memberof UserController
   *
   * @returns {object} response from server
   */
  static chatAccess(req, res) {
    user.findOne({
      where: { id: req.body }
    })
      .then((response) => {
        const {
          username,
          image,
          createdAt
        } = response.dataValues;
        const userObject = {
          username,
          image,
          createdAt
        };
        res.status(200).json({
          user: userObject
        });
      })
      .catch(() => {
        res.status(500).json({
          message: 'Something unusual happened, try again'
        });
      });
  }
}

export default UserController;
