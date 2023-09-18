import { Router } from "express";
import logger from "../../../libraries/logger";
import {
  getBusiness,
  getBusinesses,
  createBusiness,
} from "../domain/businesses.service";

/**
 * This is the router for the businesses app.
 * It is mounted on /api/businesses
 *
 */
const businessesRouter = Router();

businessesRouter.get("/", getBusinesses, (req, res) => {});

businessesRouter.get("/:businessId", getBusiness, (req, res) => {
  logger.info("req.params.businessId: ", req.params.businessId);
});

businessesRouter.post("/create", createBusiness);

export default businessesRouter;
