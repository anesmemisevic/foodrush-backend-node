import logger from "../../../libraries/logger";
import {
  addProductToCart,
  getCartByUserId,
  editProductInCart,
  deleteProductFromCart,
} from "../data-access/cart.repository";

export const getCart = async (req, res) => {
  logger.info("getCart");
  const cart = await getCartByUserId(req, res);
  res.status(200).json(cart);
};

export const addProduct = async (req, res) => {
  logger.info("addProduct");
  const cart = await addProductToCart(req, res);
  logger.info(cart);
  res.status(200).json(cart);
};
export const editProduct = async (req, res) => {};
export const deleteProduct = async (req, res) => {};
