import AppError from '../errors/AppError';
import makeQuery from '../service/MysqlConnection';

export const indexAction = async (req, res, next) => {
  try {
    const sql = 'SELECT * FROM manufacture';
    const data = await makeQuery(sql);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export const getManufactureById = async (req, res, next) => {
  const { manufactureId } = req.params;
  try {
    const sql = 'select * from manufacture where id = ?';
    const data = await makeQuery(sql, manufactureId);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export const addNewManufacture = async (req, res, next) => {
  try {
    const { body } = req;
    const {
      title,
      description,
      picture,
    } = body;

    const sql = `insert into manufacture set ?`;
    const data = await makeQuery(sql, {
      title,
      description,
      picture,
    });

    res.status(201).send(data);
  } catch (error) {
    next(new AppError(error.mesage));
  }
};

