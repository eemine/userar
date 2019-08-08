import AppError from '../errors/AppError';
import makeQuery from '../service/MysqlConnection';

export const indexAction = async (req, res, next) => {
  try {
    const sql = 'select * from product';
    const data = await makeQuery(sql);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export const getProductById = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const sql = 'select * from product where id = ?';
    const data = await makeQuery(sql, productId);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export const addNewProduct = async (req, res, next) => {
  const { body } = req;
  const {
    title,
    image,
    description,
    price,
    amount,
    categoryId,
    rate,
    vote,
    discount,
    manufactureId,
  } = body;

  const sql = `insert into product set ?`;
  try {
    const data = await makeQuery(sql, {
      title,
      image,
      description,
      price,
      amount,
      categoryId,
      rate,
      vote,
      discount,
      manufactureId,
      createdAt: new Date(),
    });

    res.status(201).send(data);
  } catch (error) {
    console.log(error);
    next(new AppError(error.mesage));
  }
};
