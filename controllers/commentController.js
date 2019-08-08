import AppError from '../errors/AppError';
import makeQuery from '../service/MysqlConnection';

export const indexAction = async (req, res, next) => {
  try {
    const sql = 'SELECT * FROM comment';
    const data = await makeQuery(sql);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export const getCommentById = async (req, res, next) => {
  const { commentId } = req.params;
  try {
    const sql = 'select * from comment where id = ?';
    const data = await makeQuery(sql, commentId);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export const addNewComment = async (req, res, next) => {
  try {
    const { body } = req;
    const {
      title,
      text,
      productId,
      userId,
    } = body;

    const sql = `insert into comment set ?`;
    const data = await makeQuery(sql, {
      title,
      text,
      createdAt: new Date(),
      productId,
      userId,
    });

    res.status(201).send(data);
  } catch (error) {
    next(new AppError(error.mesage));
  }
};