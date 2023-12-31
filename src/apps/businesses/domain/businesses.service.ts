import logger from "../../../libraries/logger";
import {
  getAllBusinesses,
  getBusinessById,
  createOneBusiness,
} from "../data-access/businesses.repository";

export const getBusinesses = async (req, res) => {
  logger.info("getBusinesses() in businesses.service.ts");
  const businesses = await getAllBusinesses(req, res);
  res.json(businesses);
};

export const getBusiness = async (req, res) => {
  logger.info("getBusiness() in businesses.service.ts");
  const businessId: number = Number(req.params.businessId);

  logger.warn(businessId);
  logger.warn(typeof businessId);

  if (isNaN(businessId)) {
    return res.status(400).json({ error: "Invalid business ID" });
  }

  const businessById = await getBusinessById(businessId);
  if (!businessById) {
    return res.status(400).json({ error: "Business not found" });
  }
  res.json(businessById);
};

export const createBusiness = async (req, res, next) => {
  logger.info("createBusiness() in businesses.service.ts");
  const business = await createOneBusiness(req, res, next);
  if (!business) {
    return res.status(400).json({ error: "Business not created" });
  }
  res.json(business);
};
