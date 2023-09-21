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
  console.log("req.body:");
  console.log(req.body);

  try {
    const product = await prisma.product.create({
      data: {
        product_name: req.body.product_name,
        productDescription: req.body.product_description,
        productPrice: Number(req.body.product_price),
        business_id: Number(req.body.business_id),
      },
    });
    return product;
  } catch (err) {
    console.log(err);
    console.log("this is error");
    return res.status(500).json({ error: "Oops, server error" });
  }
};

export const editOneProduct = async (req, res, next) => {
  try {
    // first check if product exists

    const productExists = await prisma.product.findUnique({
      where: {
        id: Number(req.params.productId),
        business_id: Number(req.body.business_id),
      },
    });

    if (!productExists) {
      return res.status(400).json({
        error:
          "Product does not exist or is not associated with the specified business",
      });
    }

    // if product exists, update it

    try {
      // take from body or leave the same
      const product_name = req.body.product_name || productExists.product_name;
      const product_description =
        req.body.product_description || productExists.productDescription;
      const product_price =
        req.body.product_price || productExists.productPrice;
      const business_id = req.body.business_id || productExists.business_id;

      const product = await prisma.product.update({
        where: {
          id: Number(req.params.productId),
        },
        data: {
          product_name: product_name,
          productDescription: product_description,
          productPrice: Number(product_price),
          business_id: Number(business_id),
        },
      });
      logger.debug(product);
      return product;
    } catch (err) {
      logger.info(err);
      res.status(500).json({ error: "Invalid payload from updating product" });
    }
  } catch (err) {
    logger.info(err);
    return res.status(500).json({ error: "Oops, server error" });
  }
};

export const deleteOneProduct = async (req, res, next) => {
  try {
    // first check if product exists

    const productExists = await prisma.product.findUnique({
      where: {
        id: Number(req.params.productId),
      },
    });

    if (!productExists) {
      return res.status(400).json({
        error:
          "Product does not exist or is not associated with the specified business",
      });
    }

    // if product exists, delete it

    try {
      const product = await prisma.product.delete({
        where: {
          id: Number(req.params.productId),
        },
      });
      // logger.debug(product);
      return product;
    } catch (err) {
      logger.info(err);
      res.status(500).json({ error: "Could not delete product" });
    }
  } catch (err) {
    logger.info(err);
    return res.status(500).json({ error: "Oops, server error" });
  }
};
