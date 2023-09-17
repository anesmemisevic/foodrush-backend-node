import logger from "../../../libraries/logger";
import prisma from "../../../libraries/db";

export const getAllUsers = async (req, res) => {
  logger.info("getUsers() in users.repository.ts");
  const users = await prisma.user.findMany();
  return users;
};

export const getUserById = async (req, res) => {
  console.log("req.params.userId: ", req.params.userId);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.userId),
      },
    });
    return user;
  } catch (err) {
    res.status(500).json({ error: "Oops, server error" });
  }
};
