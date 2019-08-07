import express from 'express';
import bodyParser from 'body-parser';
import './utils/dotenv';
import mysql from 'mysql';
import healthCheck from './routes/healthCheck';
import defaultErrorHandler from './middlewares/defaultErrorHandler';

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect();

const result = connection.query('SELECT*from user', null, ( results, error) => {
  if (error) {
    console.log(error);
}
if (results) {
  console.log('RESULT', results);
}
});


const logger = require('./utils/logger')(process.env.APP_NAME);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(`/api/v${process.env.API_VERSION}`, healthCheck);
app.use('/', healthCheck);

app.use(defaultErrorHandler);

app.listen(process.env.APP_PORT, 'localhost', () => {
  logger.log('info', `App is running at http://localhost:env.APPP_PORT} in DEV mod} mode.`);
});

module.exports = app;
