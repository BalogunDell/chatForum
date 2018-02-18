import express from 'express';
import morgan from 'morgan';
import path from 'path';
import winston from 'winston';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import socket from 'socket.io';


import routes from './routes';
import SocketController from './controllers/SocketController';

require('dotenv').config();

const app = express();
const port = process.env.PORT;

winston.level = 'info';

app.use(helmet());
app.disable('x-powered-by');
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

SocketController.onConnet(socket(server));

export default app;
