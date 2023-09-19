import logger from "../../../libraries/logger";
import {
  getProducts,
  getProduct,
  createProduct,
  editProduct,
} from "../domain/products.service";
import { Router } from "express";

/**
 * This is the service for the products app.
 * It is mounted on /api/products
 */
const productsRouter = Router();

productsRouter.get("/", getProducts, (req, res) => {
  logger.info("getProducts() in products.service.ts");
});

productsRouter.get("/:productId", getProduct, (req, res) => {
  logger.info("getProduct() in products.service.ts");
});

productsRouter.put("/:productId", editProduct, (req, res) => {
  logger.info("editProduct() in products.service.ts");
});

productsRouter.post("/create", createProduct, (req, res, next) => {});

export default productsRouter;
