import {
  createOneProduct,
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
  const product = await getProductById(req, res);
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
  res.json(product);
};
