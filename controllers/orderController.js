import mysql from 'mysql';
import AppError from '../errors/AppError';

const logger = require('../utils/logger')('orderController');

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

const getAll = async (req, res, next) => {
  logger.log('info', `order/getAll: ${JSON.stringify(req.params)}`);
  try {
    const connection = mysql.createConnection(config);
    connection.connect();
    connection.query('SELECT * FROM `order`', null, (error, results) => {
      if (error) {
        console.error(error);
      }
      if (results) {
        res.json(results);
      }
    });
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const getOrderById = async (req, res, next) => {
  logger.log('info', `getOrderById: ${JSON.stringify(req.params)}`);
  try {
    const connection = mysql.createConnection(config);
    connection.connect();
    connection.query(
      `SELECT * FROM \`order\` WHERE id = ${req.params.orderId}`,
      null,
      (error, results) => {
        if (error) {
          console.error(error);
        }
        if (results) {
          res.json(results);
        }
      },
    );
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export default {
  getAll,
  getOrderById,
};
