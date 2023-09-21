import logger from "../../../libraries/logger";
import prisma from "../../../libraries/db";

export const getCartByUserId = async (req, res) => {
  logger.info("getCartByUserId");
  const cart = await prisma.cart.findFirst({
    where: {
      userId: Number(req.params.userId),
    },
  });
  return cart;
};
