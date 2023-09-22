import logger from "../../../libraries/logger";
import prisma from "../../../libraries/db";
import { Prisma } from "@prisma/client";
import { JsonObject } from "@prisma/client/runtime/library";

export const getCartByUserId = async (req, res) => {
  logger.info("getCartByUserId");
  const cart = await prisma.cart.findFirst({
    where: {
      userId: Number(req.params.userId),
    },
  });
  return cart;
};

/**
 *
 * @param req
 * @param res
 * body: {
 * productId: number,
 * quantity: number
 * }
 */
export const addProductToCart = async (req, res) => {
  // check if cart exists for user

  // if not create cart and add product, update quantity

  // if cart exists, check if product exists in cart

  // if product exists, update quantity

  // if product does not exist, add product

  // return cart

  logger.info("addProductToCart");

  const productId = Number(req.body.productId);
  const quantity = Number(req.body.quantity);

  const cart = await prisma.cart.findFirst({
    where: {
      userId: Number(req.params.userId),
    },
  });

  const productById = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  const quantityOfProduct = productById.quantity;

  if (!cart) {
    if (productById && quantityOfProduct >= quantity) {
      const newCart = await prisma.cart.create({
        data: {
          userId: Number(req.params.userId),
          products: {
            connect: {
              id: productById.id,
            },
          },
        },
      });

      // update quantity of product
      const newQuantity = quantityOfProduct - quantity;
      await prisma.product.update({
        where: {
          id: productId,
        },
        data: {
          quantity: newQuantity,
        },
      });

      await prisma.cart.update({
        where: {
          id: newCart.id,
        },
        data: {
          // total: productById.price * quantity,
          productsQuantities: [{ productId: productId, quantity: quantity }],
        },
      });
      return newCart;
    }
    return res.status(400).json({
      message: "Product does not exist or quantity is not enough",
    });
  }

  // cart exists

  // check if product exists in cart
  const cartWithProducts = await prisma.cart.findFirst({
    where: {
      userId: Number(req.params.userId),
      products: {
        some: {
          id: productId,
        },
      },
    },
  });

  if (cartWithProducts) {
    // product exists in cart
    // update quantity of product
    const newQuantity = quantityOfProduct - quantity;
    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        quantity: newQuantity,
      },
    });

    // update quantity of product in cart

    // get quantity of product in cart
    const productInCartById = await prisma.cart.findFirst({
      where: {
        userId: Number(req.params.userId),
      },
    });

    // update quantity of product in cart
    const newQuantityOfProductInCart =
      productInCartById.productsQuantities as Prisma.JsonArray;

    // get index of product in cart
    const index = newQuantityOfProductInCart.findIndex(
      (element: JsonObject) => element.productId === productId
    );

    Object(newQuantityOfProductInCart[index].valueOf()).quantity += quantity;

    const newCart = await prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        // total: productById.price * quantity,
        productsQuantities: newQuantityOfProductInCart,
      },
    });

    return newCart;
  }

  // product does not exist in cart
  // add product to cart

  await prisma.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      products: {
        connect: {
          id: productId,
        },
      },
    },
  });

  // update quantity of product

  const newQuantity = quantityOfProduct - quantity;
  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      quantity: newQuantity,
    },
  });

  const newCart = await prisma.cart.updateMany({
    where: {
      id: cart.id,
    },
    data: {
      productsQuantities: [{ productId: productId, quantity: quantity }],
    },
  });

  return newCart;
};

export const editProductInCart = async (req, res) => {};
export const deleteProductFromCart = async (req, res) => {};
