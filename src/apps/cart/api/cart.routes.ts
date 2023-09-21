import logger from "../../../libraries/logger";
import { Router } from "express";
import { getCart } from "../domain/cart.service";

const cartRouter = Router();

cartRouter.get("/:userId", getCart, (req, res) => {});

export default cartRouter;
