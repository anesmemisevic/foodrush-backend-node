import logger from "../../../libraries/logger";
import { getAllUsers, getUserById } from "../data-access/users.repository";

/**
 * This is the service for the users app.
 * It is mounted on /api/users
 *
 * @param req
 * @param res
 */
export const getUsers = async (req, res) => {
  logger.info("getUsers() in users.service.ts");
  const users = await getAllUsers();
  res.status(200).json(users);
};

export const getUser = async (req, res) => {
  logger.info("getUser() in users.service.ts");

  const userId = Number(req.params.userId);
  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid business ID" });
  }

  const userById = await getUserById(req.params.userId);
  if (!userById) {
    return res.status(400).json({ error: "User not found" });
  }
  res.status(200).json(userById);
};
