import logger from "../../../libraries/logger";
import {
  getAllBusinesses,
  getBusinessById,
} from "../data-access/businesses.repository";

export const getBusinesses = async (req, res) => {
  logger.info("getBusinesses() in businesses.service.ts");
  const businesses = await getAllBusinesses(req, res);
  res.json(businesses);
};

export const getBusiness = async (req, res) => {
  logger.info("getBusiness() in businesses.service.ts");
  const businessById = await getBusinessById(req, res);
  if (!businessById) {
    return res.status(400).json({ error: "Business not found" });
  }
  res.json(businessById);
};