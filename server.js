import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import './utils/dotenv';
import routes from './routes';
import defaultErrorHandler from './middlewares/defaultErrorHandler';

const logger = require('./utils/logger')(process.env.APP_NAME);

const app = express();

app.use(cors());
app.use(
  fileUpload({
    createParentPath: true,
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.use('/', routes.healthCheck);
app.use('/home', routes.home);
app.use('/file', routes.file);
app.use('/users', routes.user);
app.use('/manufacturers', routes.manufacture);
app.use('/products', routes.product);
app.use('/categories', routes.category);
app.use('/orders', routes.order);
app.use('/comments', routes.comment);
app.use(`/v${process.env.API_VERSION}`, routes.healthCheck);
app.use('/public', express.static(`${__dirname}/public`));

app.use(defaultErrorHandler);

app.listen(process.env.APP_PORT, 'localhost', () => {
  logger.log('info', `App is running at http://localhost:${process.env.APP_PORT} in DEV mod mode.`);
});

module.exports = app;
