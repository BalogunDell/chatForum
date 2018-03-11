import bcrypt from 'bcrypt';
import models from '../models/';
import { decodeToken } from '../utils/helpers';

const { user } = models;
/**
 * @description validates user paylaod
 *
 * @class PayloadValidator
 */
class PayloadValidator {
  /**
   *@description validates user login payload
   *
   * @param {object} req
   * @param {object} res
   * @param {method} next
   *
   * @memberof PayloadValidator
   *
   * @returns {object} validation response
   */
  static signupPayload(req, res, next) {
    const {
      username,
      password
    } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: 'username and password required'
      });
    }
    const reg = /[!@#$%^&*()\?"":;',\+=]/gi;
    if (username.length < 3 || password.length < 5 || reg.test(username)) {
      return res.status(400).json({
        message: 'Invalid username or password'
      });
    }
    const userData = {
      username: username.toLowerCase(),
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    };
    req.body = userData;
    next();
  }

  /**
   *@description validates user login payload
   *
   * @param {object} req
   * @param {object} res
   * @param {method} next
   *
   * @memberof PayloadValidator
   * 
   * @returns {object} validation response
   */
  static loginPayload(req, res, next) {
    const {
      username,
      password
    } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: 'username and password required'
      });
    }
    const reg = /[!@#$%^&*()\?"":;',\+=]/gi;
    if (username.length < 3 || password.length < 5 || reg.test(username)) {
      return res.status(400).json({
        message: 'Invalid username or password'
      });
    }
    const checkPassword = (userPassword, DBpassword) => {
      return bcrypt.compareSync(userPassword, DBpassword);
    };

    req.body = {
      username: username.toLowerCase(),
      password,
      checkPassword
    };
    next();
  }


  /**
   *@description validates user login payload
   *
   * @param {object} req
   * @param {object} res
   * @param {method} next
   *
   * @memberof PayloadValidator
   * 
   * @returns {object} validation response
   */
  static tokenVerifier(req, res, next) {
    const { token } = req.headers;
    
    if (!token) {
      return res.status(401).json({
        message: 'You cannot access this page'
      });
    }
    decodeToken(token)
      .then((decoded) => {
        user.findOne({ where: { id: decoded.id } })
          .then(() => {
            req.body = decoded.id;
            next();
          })
          .catch(() => {
            return res.status(401).json({
              message: 'You are not permitted to view this page'
            });
          });
      })
      .catch((err) => {
        const { name } = err;
        if (name === 'JsonWebTokenError') {
          res.status(401).json({
            message: 'Invalid/Expired token!'
          });
        }
      });
  }
}

export default PayloadValidator;
