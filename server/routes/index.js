import express from 'express';
import Usercontroller from '../controllers/UserController';

const app = express.Router();
/**
 * @description route for home page of api
 *
 * @param {object} req
 * @param {object} res
 */
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to chat Forum'
  });
});

/**
 * @description route for users, new and old
 *
 * @param {object} req
 * @param {object} res
 */
app.post('/users', Usercontroller.saveUser);

/**
 * @description Invalid routes
 *
 * @param {object} req
 * @param {object} res
 */
app.route('*')
  .get((req, res) => {
    res.status(404).json({
      message: 'This page does not exist'
    });
  })
  .post((req, res) => {
    res.status(404).json({
      message: 'This page does not exist'
    });
  })
  .put((req, res) => {
    res.status(404).json({
      message: 'This page does not exist'
    });
  })
  .delete((req, res) => {
    res.status(404).json({
      message: 'This page does not exist'
    });
  });
export default app;
