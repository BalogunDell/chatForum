import express from 'express';
import Usercontroller from '../controllers/UserController';
import PayloadValidator from '../middlewares/PayloadValidator';

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
 * @description route for new users to be added
 *
 * @param {object} req
 * @param {object} res
 */
app.post('/register',
  PayloadValidator.signupPayload,
  Usercontroller.saveUser
);

/**
 * @description route for registered users to login
 *
 * @param {object} req
 * @param {object} res
 */
app.post('/login',
  PayloadValidator.loginPayload,
  Usercontroller.userLogin
);

/**
 * @description route for registered users to login
 *
 * @param {object} req
 * @param {object} res
 */
app.get('/user',
  PayloadValidator.tokenVerifier,
  Usercontroller.getUser
);

/**
 * @description Invalid routes
 *
 * @param {object} req
 * @param {object} res
 */
// app.route('/*')
//   .post((req, res) => {
//     res.status(404).json({
//       message: 'This page does not exist'
//     });
//   })
//   // .get((req, res) => {
//   //   res.status(404).json({
//   //     message: 'This page does not exist'
//   //   });
//   // })
//   .put((req, res) => {
//     res.status(404).json({
//       message: 'This page does not exist'
//     });
//   })
//   .delete((req, res) => {
//     res.status(404).json({
//       message: 'This page does not exist'
//     });
  // });
export default app;
