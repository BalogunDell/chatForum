import express from 'express';
import morgan from 'morgan';
import path from 'path';
import winston from 'winston';
import bodyParser from 'body-parser';
import socket from 'socket.io';

import routes from './routes';

require('dotenv').config();

const app = express();
const port = process.env.PORT;
winston.level = 'info';

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);
app.get('/bundle.js', (req, res) => {
  res.sendFile(path.join(path.dirname(__dirname), 'dist/bundle.js'));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(path.dirname(__dirname), 'dist/index.html'));
});

const server = app.listen(4000, () => {
  winston.level = 'info';
  winston.info('app started');
});
const io = socket(server);
io.on('connection', (client) => {
  client.on('chat', (message) => {
    io.emit('feedback', {
      message: message.message,
      handle: message.handle
    });
  });

  client.on('Login', (loginData) => {
    winston.info(loginData);
  });
});

export default app;
