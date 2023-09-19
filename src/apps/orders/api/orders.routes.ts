import logger from "../../../libraries/logger";
import {
  getOrders,
  getOrder,
  editOrder,
  deleteOrder,
  createOrder,
} from "../domain/orders.service";
import { Router } from "express";

const ordersRouter = Router();

ordersRouter.get("/", getOrders, (req, res) => {});

ordersRouter.get("/:orderId", getOrder, (req, res) => {});

ordersRouter.post("/create", createOrder, (req, res) => {});

ordersRouter.put("/", editOrder, (req, res) => {});

ordersRouter.delete("/", deleteOrder, (req, res) => {});

export default ordersRouter;
