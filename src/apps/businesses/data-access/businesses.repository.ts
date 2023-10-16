import logger from "../../../libraries/logger";
import prisma from "../../../libraries/db";
import bcrypt from "bcrypt";

export const getAllBusinesses = async (req, res) => {
  logger.info("getAllBusinesses() in businesses.repository.ts");
  const businesses = await prisma.business.findMany();
  return businesses;
};

export const getBusinessById = async (businessId: number) => {
  console.log("req.params.businessId: ", businessId);
  try {
    const business = await prisma.business.findUnique({
      where: {
        id: Number(businessId),
      },
    });
    return business;
  } catch (error) {
    logger.info(error);
    throw new Error("Oops, server error");
  }
};

export const createOneBusiness = async (req, res, next) => {
  logger.info("createBusiness() in businesses.repository.ts");
  const {
    business_name,
    description,
    address,
    city,
    state,
    zip,
    phone,
    email,
    category,
    image,
    latitude,
    longitude,
  } = req.body;
  logger.info("req.body: ", req.body);
  logger.info(req.body);
  try {
    const business = await prisma.business.create({
      data: {
        business_name,
        description,
        address,
        city,
        state,
        zip,
        phone,
        email,
        category,
        image,
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
    });
    return business;
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Oops, server error from DB" });
  }
};

export const register = async (
  business_name: string,
  email: string,
  password: string
) => {
  try {
    const business = await prisma.business.create({
      data: {
        business_name: business_name,
        email: email,
        password: await bcrypt.hash(password, 10),
      },
    });
    return business;
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("Email already exists");
    }
    throw new Error("Oops, server error");
  }
};
