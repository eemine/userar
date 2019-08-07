import AppError from '../errors/AppError';

const logger = require('../utils/logger')('homeController');

const indexAction = async (req, res, next) => {
  logger.log('info', `home: ${JSON.stringify(req.params)}`);
  try {
    res.json({ text: 'Welcome to home' });
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export default indexAction;
