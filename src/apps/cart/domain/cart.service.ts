import logger from "../../../libraries/logger";
import { getCartByUserId } from "../data-access/cart.repository";

export const getCart = async (req, res) => {
  logger.info("getCart");
  const cart = await getCartByUserId(req, res);
  res.status(200).json(cart);
};
