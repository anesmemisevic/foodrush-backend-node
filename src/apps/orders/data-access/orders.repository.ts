import logger from "../../../libraries/logger";
import prisma from "../../../libraries/db";

export const getOneOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: Number(orderId),
      },
    });
    return order;
  } catch (err) {
    logger.info(err);
    return res.status(500).json({ error: "Oops, server error" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    return orders;
  } catch (err) {
    logger.info(err);
    return res.status(500).json({ error: "Oops, server error" });
  }
};

export const createOneOrder = async (req, res) => {
  try {
    // first get products from req.body
    // const products = req.body.products;
    // const productsId = products.map((product) => product.id);
    const productsIds = req.body.products.map((product) => product.id);

    // then create order details
    const orderDetail = await prisma.orderDetail.create({
      data: {
        products: {
          connect: req.body.products,
        },
        price: Number(req.body.price),
      },
    });

    // then create order

    const order = await prisma.order.create({
      data: {
        user: {
          connect: {
            id: Number(req.body.userId),
          },
        },
        order_detail: {
          connect: {
            id: orderDetail.id,
          },
        },
      },
    });

    // then return order
    logger.info("print products from order - order details");
    const products_from_order_detail = await prisma.orderDetail
      .findUnique({
        where: {
          id: orderDetail.id,
        },
      })
      .products();
    logger.info(products_from_order_detail);
    return order;
  } catch (err) {
    logger.info(err);
    return res.status(500).json({ error: "Oops, server error" });
  }
};

export const deleteOneOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await prisma.order.delete({
      where: {
        id: orderId,
      },
    });
    return order;
  } catch (err) {
    logger.info(err);
    return res.status(500).json({ error: "Oops, server error" });
  }
};

export const editOneOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        user_id: Number(req.body.userId),
        order_detail_id: Number(req.body.orderDetailId),
      },
    });
    return order;
  } catch (err) {
    logger.info(err);
    return res.status(500).json({ error: "Oops, server error" });
  }
};
