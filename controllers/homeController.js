import AppError from '../errors/AppError';

const indexAction = async (req, res, next) => {
  try {
    res.json({ text: 'Welcome to home' });
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export default indexAction;
