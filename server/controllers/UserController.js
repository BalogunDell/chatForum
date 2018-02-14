import models from '../models/';

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
      .then(() => {
        console.log(req.headers);
        res.status(200).json({ message: 'User created' });
      }).catch((error) => {
        console.log(req.headers);
        res.send(error);
      });
  }
}

export default UserController;
