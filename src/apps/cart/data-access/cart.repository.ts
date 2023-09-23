import logger from "../../../libraries/logger";
import prisma from "../../../libraries/db";
import { Product } from "@prisma/client";

export const getCartByUserId = async (userId: number) => {
  logger.info("getCartByUserId");
  const cart = await prisma.cart.findFirst({
    where: {
      userId: userId,
    },
    include: {
      products: true,
    },
  });
  return cart;
};

export const updateProductQtyInCartById = async (
  cartId: number,
  newQuantityOfProductInCart: any
) => {
  const newCart = await prisma.cart.update({
    where: {
      id: Number(cartId),
    },
    data: {
      // total: productById.price * quantity,
      productsQuantities: newQuantityOfProductInCart,
    },
    include: {
      products: true,
    },
  });

  return newCart;
};

export const createCart = async (userId: number, productById: Product) => {
  const newCart = await prisma.cart.create({
    data: {
      userId: userId,
      products: {
        connect: {
          id: productById.id,
        },
      },
    },
  });
  return newCart;
};

export const appendProductsQuantitiesToCart = async (
  cartId: number,
  productId: number,
  quantity: number
) => {
  await prisma.cart.update({
    where: {
      id: cartId,
    },
    data: {
      // productsQuantities: [{ productId: productId, quantity: quantity }],
      productsQuantities: {
        push: { productId: productId, quantity: quantity },
      },
    },
    include: {
      products: true,
    },
  });

  const newCart = await prisma.cart.findFirst({
    where: {
      id: cartId,
    },
    include: {
      products: true,
    },
  });

  return newCart;
};

export const updateCartById = async (
  cartId: number,
  productId: number,
  quantity: number
) => {
  const updatedCart = await prisma.cart.update({
    where: {
      id: cartId,
    },
    data: {
      // total: productById.price * quantity,
      productsQuantities: [{ productId: productId, quantity: quantity }],
    },
    include: {
      products: true,
    },
  });
  return updatedCart;
};

export const appendProductToCart = async (
  cartId: number,
  productId: number
) => {
  await prisma.cart.update({
    where: {
      id: cartId,
    },
    data: {
      products: {
        connect: {
          id: productId,
        },
      },
    },
  });
};

export const editProductInCart = async (req, res) => {};
export const deleteProductFromCart = async (req, res) => {};
