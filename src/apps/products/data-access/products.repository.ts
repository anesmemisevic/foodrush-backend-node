import logger from "../../../libraries/logger";
import prisma from "../../../libraries/db";

export const getAllProducts = async (req, res) => {
  logger.info("getAllProducts() in products.service.ts");
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (err) {
    res.status(500).json({ error: "Oops, server error" });
  }
};

export const getProductById = async (req, res) => {
  console.log("req.params.productId: ", req.params.productId);
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(req.params.productId),
      },
    });
    return product;
  } catch (err) {
    res.status(500).json({ error: "Oops, server error" });
  }
};

export const createOneProduct = async (req, res, next) => {
  console.log("req.body: ", req.body);

  try {
    const product = await prisma.product.create({
      data: {
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_price: Number(req.body.product_price),
        business_id: Number(req.body.business_id),
      },
    });
    return product;
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Oops, server error" });
  }
};
