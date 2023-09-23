import { Router } from "express";
import { Request, Response } from "express";
import logger from "../../../libraries/logger";
import {
  getBusiness,
  getBusinesses,
  createBusiness,
} from "../domain/businesses.service";
import { loginBusiness, registerBusiness } from "../domain/businesses.auth";

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
businessesRouter.post("/register", registerBusiness, (req, res) => {});
businessesRouter.post("/login", loginBusiness, (req, res) => {});

export default businessesRouter;
