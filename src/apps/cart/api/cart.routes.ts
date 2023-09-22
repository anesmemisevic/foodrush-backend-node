import logger from "../../../libraries/logger";
import { Router } from "express";
import {
  getCart,
  editProduct,
  addProduct,
  deleteProduct,
} from "../domain/cart.service";

const cartRouter = Router();

cartRouter.get("/:userId", getCart, (req, res) => {});

cartRouter.post("/:userId/products", addProduct, (req, res) => {});

cartRouter.put("/:userId/products/:productId", editProduct, (req, res) => {});

cartRouter.delete(
  "/:userId/products/:productId",
  deleteProduct,
  (req, res) => {}
);

export default cartRouter;
