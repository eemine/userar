import AppError from '../errors/AppError';
import makeQuery from '../service/MysqlConnection';

export const indexAction = async (req, res, next) => {
  try {
    const sql = 'SELECT * FROM user';
    const data = await makeQuery(sql);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export const getUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const sql = 'select * from user where id = ?';
    const data = await makeQuery(sql, userId);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export const addNewUser = async (req, res, next) => {
  try {
    const { body } = req;
    const { image, firstName, lastName, password, email, isActive } = body;

    const sql = `insert into user set ?`;
    const data = await makeQuery(sql, {
      image,
      firstName,
      lastName,
      password,
      email,
      isActive,
      createdAt: new Date(),
    });

    res.status(201).send(data);
  } catch (error) {
    next(new AppError(error.mesage));
  }
};
