import express from 'express';
import morgan from 'morgan';
import winston from 'winston';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import routes from './routes';

require('dotenv').config();

const app = express();
const port = process.env.PORT;
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1/chatforum/', routes);
app.listen(port, (error) => {
  if (error) console.log(error);
  winston.level = 'info';
  winston.info('app started');
});
