import logger from "../../../libraries/logger";
import prisma from "../../../libraries/db";

/**
 * This is the service for the users app.
 * It is mounted on /api/users
 *
 * @param req
 * @param res
 */
export const getAllUsers = async (req, res) => {
  logger.info("getUsers() in users.repository.ts");
  const users = await prisma.user.findMany();
  return users;
};

export const getUserById = async (req, res) => {
  console.log("req.params.userId: ", req.params.userId);
  const user = await prisma.user.findUnique({
    where: {
      id: Number(req.params.userId),
    },
  });
  return user;
};
