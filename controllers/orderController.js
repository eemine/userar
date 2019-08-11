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
    const { productIds, userId } = body;

    // Why this query returns only 1 value, when 'sql where in' should return all matching?
    const selectProducts = 'select * from product where id in (?)';
    const products = await makeQuery(selectProducts, productIds);

    const orderSum = products.reduce((sum, product) => sum += product.price, 0);

    const insertOrder = `insert into \`order\` set ?`;
    const orderData = await makeQuery(insertOrder, {
      sum: orderSum,
      userId,
      createdAt: new Date(),
    });

    // Why this query inserts only 1 row, when values are multiple?
    const insertOrderProducts = 'insert into product_in_order(productid, orderid) values (?)';
    const values = productIds.map(id => [id, orderData.insertId]);

    await makeQuery(insertOrderProducts, values);

    res.status(201).send(orderData);
  } catch (error) {
    next(new AppError(error.mesage));
  }
};
