import express from 'express';
import morgan from 'morgan';
import path from 'path';
// import winston from 'winston';
// import bodyParser from 'body-parser';
// import helmet from 'helmet';
import socket from 'socket.io';
// import routes from './routes';

require('dotenv').config();

const app = express();
app.use(morgan('dev'));
const port = process.env.PORT;

app.get('/bundle.js', (req, res) => {
  res.sendFile(path.join(path.dirname(__dirname), 'dist/bundle.js'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(path.dirname(__dirname), 'dist/index.html'));
});

const server = app.listen(4000, () => {
  console.log('app started');
});
const io = socket(server);
// io.on('connection', (socket) => {
//   console.log('user connected', socket.id);
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

io.on('connection', (socket) => {
  socket.on('chat', (message) => {
    io.emit('feedback', {
      message: message.message,
      handle: message.handle
    });
  });
});