import AppError from '../errors/AppError';
import makeQuery from '../service/MysqlConnection';

export const indexAction = async (req, res, next) => {
  try {
    const sql = 'SELECT * FROM category';
    const data = await makeQuery(sql);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export const getCategoryById = async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    const sql = 'select * from category where id = ?';
    const data = await makeQuery(sql, categoryId);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export const addNewCategory = async (req, res, next) => {
  try {
    const { body } = req;
    const { title, description, categoryId } = body;

    const sql = `insert into category set ?`;
    const data = await makeQuery(sql, {
      title,
      description,
      categoryId,
    });

    res.status(201).send(data);
  } catch (error) {
    next(new AppError(error.mesage));
  }
};
