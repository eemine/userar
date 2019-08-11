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

    // 1. Need to get all product details in order to calculate order sum
    const selectProducts = 'select * from product where id in (?)';
    const products = await makeQuery(selectProducts, [productIds]);

    // 2. Calculate order sum
    const orderSum = products.reduce((sum, product) => sum += product.price, 0);

    // 3. Insert into table order and get order ID after insert
    const insertOrder = `insert into \`order\` set ?`;
    const orderData = await makeQuery(insertOrder, {
      sum: orderSum,
      userId,
      createdAt: new Date(),
    });

    // 4. Insert into product_in_order table productId and orderId in order to save which
    // products was in order
    const insertOrderProducts = 'insert into product_in_order(productid, orderid) values ?';
    const values = productIds.map(id => [id, orderData.insertId]);

    await makeQuery(insertOrderProducts, [values]);

    res.status(201).send(orderData);
  } catch (error) {
    next(new AppError(error.mesage));
  }
};
