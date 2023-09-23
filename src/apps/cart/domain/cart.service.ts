import logger from "../../../libraries/logger";
import { Cart, Prisma, Product } from "@prisma/client";
import { JsonObject } from "@prisma/client/runtime/library";
import { Request, Response } from "express";

import {
  getCartByUserId,
  editProductInCart,
  deleteProductFromCart,
  createCart,
  updateCartById,
  updateProductQtyInCartById,
  appendProductToCart,
  appendProductsQuantitiesToCart,
} from "../data-access/cart.repository";

import {
  getProductById,
  updateProductQuantity,
} from "../../products/data-access/products.repository";

export const getCart = async (req: Request, res: Response) => {
  logger.info("getCart");
  const cart = await getCartByUserId(Number(req.params.userId));
  res.status(200).json(cart);
};

const productAvailableInCart = (cart: any, productId: number): boolean => {
  const index = cart.products
    .map((element: Product) => {
      return Number(element.id) === Number(productId);
    })
    .indexOf(true);

  return index !== -1;
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.body.productId);
    const quantity = Number(req.body.quantity);

    const cart: Cart = await getCartByUserId(Number(req.params.userId));
    const productById: Product = await getProductById(req.body.productId);

    const quantityOfProduct = productById.quantity;

    if (!cart) {
      // create cart with relevant product and its quantity
      if (productById && quantityOfProduct >= quantity) {
        const newCart = await createCart(
          Number(req.params.userId),
          productById.id
        );
        const newQuantity = quantityOfProduct - quantity;

        await updateProductQuantity(productId, newQuantity);
        const updatedCart = await updateCartById(
          newCart.id,
          productId,
          quantity
        );
        return res.status(201).json(updatedCart);
      }
    }

    if (productAvailableInCart(cart, productId)) {
      // if product is already in cart, update quantity, and update quantity of product in products table
      const newQuantity = quantityOfProduct - quantity;
      await updateProductQuantity(productId, newQuantity);

      const newQuantityOfProductInCart =
        cart.productsQuantities as Prisma.JsonArray;

      // get index of product in cart
      // const index = newQuantityOfProductInCart.findIndex(
      //   (element: JsonObject) => Number(element.productId) === Number(productId)
      // );

      const index = newQuantityOfProductInCart
        .map((element: JsonObject) => {
          return Number(element.productId) === Number(productId);
        })
        .indexOf(true);

      // update quantity of product in cart
      Object(newQuantityOfProductInCart[index].valueOf()).quantity += quantity;

      const updatedCart = await updateProductQtyInCartById(
        cart.id,
        newQuantityOfProductInCart
      );
      logger.info(updatedCart);
      return res.status(200).json(updatedCart);
    }

    // otherwise add product to cart, and update quantity of product in products table and cart
    const newQuantity = quantityOfProduct - quantity;
    await updateProductQuantity(productId, newQuantity);
    await appendProductToCart(cart.id, productId);
    const updatedCart = await appendProductsQuantitiesToCart(
      cart.id,
      productId,
      quantity
    );
    logger.info(updatedCart);
    return res.status(200).json(updatedCart);
  } catch (error) {
    logger.info(error);
    res.status(500).json({ error: error.message });
  }
};

export const editProduct = async (req, res) => {};

export const deleteProduct = async (req, res) => {};
