import logger from "../../../libraries/logger";
import prisma from "../../../libraries/db";

export const getAllBusinesses = async (req, res) => {
  logger.info("getAllBusinesses() in businesses.repository.ts");
  const businesses = await prisma.business.findMany();
  return businesses;
};

export const getBusinessById = async (req, res) => {
  console.log("req.params.businessId: ", req.params.businessId);
  try {
    const business = await prisma.business.findUnique({
      where: {
        id: Number(req.params.businessId),
      },
    });
    return business;
  } catch (err) {
    res.status(500).json({ error: "Oops, server error" });
  }
};
