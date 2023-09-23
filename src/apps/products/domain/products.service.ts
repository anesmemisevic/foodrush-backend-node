import {
  createOneProduct,
  deleteOneProduct,
  editOneProduct,
  getAllProducts,
  getProductById,
} from "../data-access/products.repository";
import logger from "../../../libraries/logger";

export const getProducts = async (req, res) => {
  const products = await getAllProducts(req, res);
  if (!products) {
    return res.status(400).json({ error: "No products found" });
  }
  res.json(products);
};

export const getProduct = async (req, res) => {
  const product = await getProductById(req.params.productId);
  if (!product) {
    return res.status(400).json({ error: "Product not found" });
  }
  res.json(product);
};

export const createProduct = async (req, res, next) => {
  const product = await createOneProduct(req, res, next);
  if (!product) {
    return res.status(400).json({ error: "Product not created" });
  }
  res.status(201).json(product);
};

export const editProduct = async (req, res, next) => {
  const editedProduct = await editOneProduct(req, res, next);
  logger.info(editedProduct);
  res.status(200).json(editedProduct);
};

export const deleteProduct = async (req, res, next) => {
  const deletedProduct = await deleteOneProduct(req, res, next);
  res.status(204).send();
};
