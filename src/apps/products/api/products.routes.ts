import logger from "../../../libraries/logger";
import { getProducts, getProduct } from "../domain/products.service";
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
export default productsRouter;
