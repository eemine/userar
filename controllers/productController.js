import AppError from '../errors/AppError';
import makeQuery from '../service/MysqlConnection';

const getProductFromDB = productId => {
  const sql = 'select * from product where id = ?';
  return makeQuery(sql, productId);
};

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
    const data = await getProductFromDB(productId);

    if (data.length === 0) {
      res.status(404).send('Product not found');
      return;
    }

    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export const modifyProduct = async (req, res, next) => {
  const { productId } = req.params;

  if (productId) {
    const data = await getProductFromDB(productId);

    if (data.length === 0) {
      res.status(404).send('Product not found');
      return;
    }
  }

  const { body } = req;

  const sql = `${!productId ? 'insert into' : 'update'} product set ? ${
    !productId ? '' : ' where id = ?'
  }`;

  try {
    const data = await makeQuery(sql, [{ ...body, createdAt: new Date() }, productId]);
    res.status(201).send(data);
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

export const deleteProduct = async (req, res, next) => {
  const { productId } = req.params;

  if (productId) {
    const data = await getProductFromDB(productId);

    if (data.length === 0) {
      res.status(404).send('Product not found');
      return;
    }
  }

  const sql = `delete from product where id = ?`;
  try {
    const data = await makeQuery(sql, productId);
    res.status(202).send(data);
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};
