import mysql from 'mysql';
import AppError from '../errors/AppError';

const logger = require('../utils/logger')('HomeController');

const indexAction = async (req, res, next) => {
    logger.log('info', `healthCheck: ${JSON.stringify(req.params)}`);
    try {
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
        connection.connect();
        connection.query('SELECT * from user', null, (error, results) => {
            if(error) {
                console.log(error);
            }
            if(results) {
                res.json(results);
            }
        });
    } catch (err) {
        next(new AppError(err.message, 400));
    }
};
