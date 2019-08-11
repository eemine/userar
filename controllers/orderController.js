import AppError from '../errors/AppError';
import makeQuery from '../service/MysqlConnection';

export const indexAction = async (req, res, next) => {
  try {
    const sql = 'SELECT * FROM `order`';
    const data = await makeQuery(sql);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export const getOrderById = async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const sql = 'select * from `order` where id = ?';
    const data = await makeQuery(sql, orderId);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export const addNewOrder = async (req, res, next) => {
  try {
    const { body } = req;
    const { sum, userId, createdAt } = body;

    const sql = `insert into \`order\` set ?`;
    const data = await makeQuery(sql, {
      sum,
      userId,
      createdAt,
    });

    res.status(201).send(data);
  } catch (error) {
    next(new AppError(error.mesage));
  }
};
