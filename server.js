import express from 'express';
import bodyParser from 'body-parser';
import './utils/dotenv';
import routes from './routes';
import defaultErrorHandler from './middlewares/defaultErrorHandler';

const logger = require('./utils/logger')(process.env.APP_NAME);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes.healthCheck);
app.use('/api/home', routes.home);
app.use('/api/user', routes.user);
app.use('/api/manufacture', routes.manufacture);
app.use('/api/product', routes.product);
app.use('/api/category', routes.category);
app.use('/api/order', routes.order);
app.use(`/api/v${process.env.API_VERSION}`, routes.healthCheck);

app.use(defaultErrorHandler);

app.listen(process.env.APP_PORT, 'localhost', () => {
  logger.log('info', `App is running at http://localhost:${process.env.APP_PORT} in DEV mod mode.`);
});

module.exports = app;
