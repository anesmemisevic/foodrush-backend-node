import logger from "../../../libraries/logger";

import {
  getOneOrder,
  getAllOrders,
  editOneOrder,
  createOneOrder,
  deleteOneOrder,
} from "../data-access/orders.repository";

export const getOrders = async (req, res) => {
  try {
    const orders = await getAllOrders(req, res);
    return res.status(200).json({ orders });
  } catch (err) {
    logger.info(err);
    return res.status(500).json({ error: "Oops, server error" });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await getOneOrder(req, res);
    return res.status(200).json({ order });
  } catch (err) {
    logger.info(err);
    return res.status(500).json({ error: "Oops, server error" });
  }
};

export const createOrder = async (req, res) => {
  try {
    const order = await createOneOrder(req, res);
    return res.status(200).json({ order });
  } catch (err) {
    logger.info(err);
    return res.status(500).json({ error: "Oops, server error" });
  }
};

export const editOrder = async (req, res) => {
  try {
    const order = await editOneOrder(req, res);
    return res.status(200).json({ order });
  } catch (err) {
    logger.info(err);
    return res.status(500).json({ error: "Oops, server error" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await deleteOneOrder(req, res);
    return res.status(200).json({ order });
  } catch (err) {
    logger.info(err);
    return res.status(500).json({ error: "Oops, server error" });
  }
};
